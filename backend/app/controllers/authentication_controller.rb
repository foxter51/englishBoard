# frozen_string_literal: true

# Represents the authentication controller
class AuthenticationController < ApplicationController
  skip_before_action :authenticate_user

  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      token = jwt_encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      Rails.logger.info("Authenticated user: #{@user.email}")
      render json: { token:, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  rescue Mongoid::Errors::InvalidFind, Mongoid::Errors::DocumentNotFound
    render json: { error: 'User not found' }, status: :unauthorized
  end

  def register
    @user = User.new(user_params)
    if @user.save
      token = jwt_encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      Rails.logger.info("Registered user: #{@user.email}")
      render json: { token:, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def google_oauth2_callback
    credentials = Google::Auth::UserRefreshCredentials.new(
      client_id: ENV['GOOGLE_CLIENT_ID'],
      client_secret: ENV['GOOGLE_CLIENT_SECRET'],
      scope: %w[email profile],
      access_token: params[:token].to_s
    )

    oauth2 = Google::Apis::Oauth2V2::Oauth2Service.new
    oauth2.authorization = credentials
    user_info = oauth2.get_userinfo_v2

    @user = User.from_googleauth(
      provider: 'google_oauth2',
      uid: user_info.id,
      info: {
        email: user_info.email,
        name: user_info.name,
        image: user_info.picture
      }
    )

    if @user.persisted?
      token = jwt_encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      Rails.logger.info("Authenticated user: #{@user.email}")
      render json: { token:, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  rescue Google::Apis::AuthorizationError => e
    Rails.logger.error("Google Authorization Error: #{e.message}")
    render json: { error: e.message }, status: :unauthorized
  rescue StandardError => e
    Rails.logger.error("Unexpected error: #{e.message}")
    render json: { error: e.message }, status: :unauthorized
  end

  def logout
    Rails.logger.info("Logged out user: #{@current_user.email}") if @current_user
    @current_user = nil
    render json: { message: 'Logged out successfully' }, status: :ok
  end

  private

  def user_params
    params.require(:authentication).permit(:email, :password, :name, :token)
  end
end
