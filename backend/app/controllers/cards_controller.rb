# frozen_string_literal: true

# Represents the cards controller
class CardsController < ApplicationController
  include CardHelper
  before_action :set_card, only: %i[show update destroy]

  def index
    @cards = fetching_cards
    Rails.logger.info("Cards found count: #{@cards.size}")
    render json: @cards
  end

  def index_by_user_and_status
    if params[:user_id].blank? || params[:remembered].nil?
      Rails.logger.error('Missing user_id or remembered parameter')
      render json: { error: 'Missing user_id or remembered parameter' }, status: :bad_request
    else
      remembered = ActiveModel::Type::Boolean.new.cast(params[:remembered])
      @cards = fetching_cards_by_user_and_status(params[:user_id], remembered)
      Rails.logger.info("Cards by user and status found count: #{@cards.size}")
      render json: @cards
    end
  end

  def show
    render json: @card
  end

  def create
    @card = Card.new(card_params.merge(user_id: @current_user.id, remembered: false))
    if @card.save
      Rails.logger.info("Card created: #{@card.inspect}")
      render json: @card, status: :created
    else
      Rails.logger.error("Card not created: #{@card.errors.full_messages}")
      render json: { errors: @card.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @card.update(card_params)
      Rails.logger.info("Card updated: #{@card.inspect}")
      render json: @card
    else
      Rails.logger.error("Card not updated: #{@card.errors.full_messages}")
      render json: { errors: @card.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @card.destroy
    Rails.logger.info("Card deleted: #{@card.inspect}")
    head :no_content
  end

  private

  def set_card
    @card = Card.find(params[:id])
  rescue Mongoid::Errors::DocumentNotFound
    Rails.logger.error("Card not found: #{params[:id]}")
    render json: { error: 'Card not found' }, status: :not_found
  end

  def card_params
    params.require(:card).permit(:word, :description, :remembered, :image)
  end
end
