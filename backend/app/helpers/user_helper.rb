# frozen_string_literal: true

# Represents the user helper
module UserHelper
  def fetching_users
    users = $redis.get('all_users') rescue StandardError
    if users.nil?
      puts('gg')
      users = User.all.to_json
      $redis.set('all_users', users)
      $redis.expire('all_users', 15.seconds.to_i)
    end
    JSON.parse(users)
  end
end
