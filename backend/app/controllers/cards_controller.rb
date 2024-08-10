# frozen_string_literal: true

# Represents the cards controller
class CardsController < ApplicationController
  before_action :set_card, only: %i[show update destroy]

  def index
    @cards = Card.all
    render json: @cards
  end

  def index_by_user_and_status
    if params[:user_id].blank? || params[:remembered].nil?
      render json: { error: 'Missing user_id or remembered parameter' }, status: :bad_request
    else
      remembered = ActiveModel::Type::Boolean.new.cast(params[:remembered])
      @cards = Card.where(user_id: params[:user_id], remembered: remembered)
      render json: @cards
    end
  end

  def show
    render json: @card
  end

  def create
    @card = Card.new(card_params.merge(user_id: @current_user.id, remembered: false))
    if @card.save
      render json: @card, status: :created
    else
      render json: { errors: @card.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @card.destroy
    head :no_content
  end

  private

  def set_card
    @card = Card.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: 'Card not found' }, status: :not_found
  end

  def card_params
    params.require(:card).permit(:word, :description, :remembered)
  end
end
