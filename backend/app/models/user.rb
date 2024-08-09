# frozen_string_literal: true

# Represents the User model
class User
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :string, type: String
  field :email, type: String
  field :password_diggest, type: String

  attr_accessor :password

  before_save :encrypt_password

  def authenticate(password)
    BCrypt::Password.new(password_diggest) == password
  end

  private

  def encrypt_password
    if password.present?
      self.password_diggest = BCrypt::Password.create(password)
    end
  end
end
