# frozen_string_literal: true

# Represents the User model
class User
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :email, type: String
  field :password_diggest, type: String
  field :avatar, type: String
  has_many :cards

  field :learnt_cards_count, type: Integer, default: 0
  field :to_learn_cards_count, type: Integer, default: 0

  validates :name, length: { minimum: 3, maximum: 64 }, presence: true
  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, maximum: 64 }, presence: true, if: :password_required?

  attr_accessor :password

  before_save :encrypt_password

  def authenticate(password)
    BCrypt::Password.new(password_diggest) == password
  end

  private

  def password_required?
    new_record? || password.present?
  end

  def encrypt_password
    self.password_diggest = BCrypt::Password.create(password) if password.present?
  end
end
