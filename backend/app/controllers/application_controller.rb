# frozen_string_literal: true

# Represents the base controller
class ApplicationController < ActionController::API
  include JwtToken
  before_action :authenticate_user

  private

  def authenticate_user
    header = request.headers['Authorization']
    if header
      token = header.split(' ').last
      begin
        @decoded = jwt_decode(token)
        user_id = @decoded[:user_id]
        if user_id
          @current_user = User.find(user_id)
          Rails.logger.info("Authenticated user: #{@current_user.email}")
        else
          render json: { error: 'Invalid token: user_id not found' }, status: :unauthorized
        end
      rescue JWT::DecodeError, JWT::ExpiredSignature
        render json: { error: 'Invalid or expired token' }, status: :unauthorized
      rescue Mongoid::Errors::InvalidFind, Mongoid::Errors::DocumentNotFound
        render json: { error: 'User not found' }, status: :unauthorized
      end
    else
      render json: { error: 'Authorization header missing' }, status: :unauthorized
    end
  end
end
