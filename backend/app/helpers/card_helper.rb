# frozen_string_literal: true

# Represents the card helper
module CardHelper
  include RedisConnection

  protected

  def fetching_cards
    fetch_or_cache('all_cards') do
      Card.all.to_json
    end
  end

  def fetching_cards_by_user_and_status(user_id, remembered)
    fetch_or_cache("cards_user_#{user_id}_remembered_#{remembered}") do
      Card.where(user_id: user_id, remembered: remembered).to_json
    end
  end
end
