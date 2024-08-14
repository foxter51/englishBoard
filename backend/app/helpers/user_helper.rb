# frozen_string_literal: true

# Represents the user helper
module UserHelper
  include RedisConnection

  protected

  def fetching_users
    fetch_or_cache('all_users') do
      User.all.to_json
    end
  end
end
