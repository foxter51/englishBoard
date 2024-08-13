# frozen_string_literal: true

# Represents the card helper
module CardHelper
  def fetching_cards
    cards = $redis.get('all_cards') rescue StandardError
    if cards.nil?
      cards = Card.all.to_json
      $redis.set('all_cards', cards)
      $redis.expire('all_cards', 15.seconds.to_i)
    end
    JSON.parse(cards)
  end

  def fetching_cards_by_user_and_status(user_id, remembered)
    cards = $redis.get("cards_user_#{user_id}_remembered_#{remembered}") rescue StandardError
    if cards.nil?
      cards = Card.where(user_id:, remembered:).to_json
      $redis.set("cards_user_#{user_id}_remembered_#{remembered}", cards)
      $redis.expire("cards_user_#{user_id}_remembered_#{remembered}", 15.seconds.to_i)
    end
    JSON.parse(cards)
  end
end
