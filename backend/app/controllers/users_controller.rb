# frozen_string_literal: true

# Represents the users controller
class UsersController < ApplicationController
  include UserHelper
  before_action :set_user, only: %i[show update destroy]

  def index
    @users = fetching_users
    Rails.logger.info("Users found count: #{@users.size}")
    render json: @users
  end

  def show
    Rails.logger.info("User found: #{@user.inspect}")
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      Rails.logger.info("User created: #{@user.inspect}")
      render json: @user, status: :created
    else
      Rails.logger.error("User not created: #{@user.errors.full_messages}")
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      Rails.logger.info("User updated: #{@user.inspect}")
      render json: @user
    else
      Rails.logger.error("User not updated: #{@user.errors.full_messages}")
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    Rails.logger.info("User deleted: #{@user.inspect}")
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    Rails.logger.error("User not found: #{params[:id]}")
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:email, :password, :name, :avatar)
  end
end
