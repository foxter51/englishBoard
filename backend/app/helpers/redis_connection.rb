# frozen_string_literal: true

# Represents the redis connection
module RedisConnection

  private

  def redis_connected?
    $redis.ping == 'PONG'
  rescue StandardError
    Rails.logger.error('Redis not connected')
    false
  end

  protected

  def fetch_or_cache(key)
    data = redis_connected? ? $redis.get(key) : nil
    if data.nil?
      data = yield
      if redis_connected?
        $redis.set(key, data)
        $redis.expire(key, 15.seconds.to_i)
      end
    end
    JSON.parse(data)
  end
end
