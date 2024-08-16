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
      render json: { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
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
      render json: { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def google_oauth2_callback
    token = params[:token].to_s
    validator = GoogleIDToken::Validator.new
    aud = ENV['GOOGLE_CLIENT_ID']
    payload = validator.check(token, aud)

    if payload['sub'].present?
      @user = User.from_omniauth({
                                   provider: 'google_oauth2',
                                   uid: payload['sub'],
                                   info: {
                                     email: payload['email'],
                                     name: payload['name'],
                                     image: payload['picture']
                                   }
                                 })

      if @user.persisted?
        token = jwt_encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        Rails.logger.info("Authenticated user: #{@user.email}")
        render json: { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid Google ID token' }, status: :unauthorized
    end
  rescue GoogleIDToken::ValidationError => e
    render json: { error: e.message }, status: :unauthorized
  end

  def logout
    Rails.logger.info("Logged out user: #{@current_user.email}")
    @current_user = nil
    render json: { message: 'Logged out successfully' }, status: :ok
  end

  private

  def user_params
    params.require(:authentication).permit(:email, :password, :name, :token)
  end
end
