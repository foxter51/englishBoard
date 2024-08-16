# frozen_string_literal: true

require 'jwt'

# JWT Token
module JwtToken
  extend ActiveSupport::Concern
  SECRET_KEY = ENV['JWT_SECRET_KEY']

  def jwt_encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end
end
