# frozen_string_literal: true

# Represents the authentication controller
class AuthenticationController < ApplicationController
  skip_before_action :authenticate_user

  def login
    @user = User.find_by(email: params[:email])
    if @user&.authenticate(params[:password])
      token = jwt_encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def register
    if User.exists?(email: params[:email])
      render json: { error: 'User already exists' }, status: :conflict
    else
      @user = User.new(user_params)
      if @user.save
        token = jwt_encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        render json: { token: token, exp: time.strftime('%m-%d-%Y %H:%M'), user_id: @user.id }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def user_params
    params.require(:authentication).permit(:email, :password, :name)
  end
end