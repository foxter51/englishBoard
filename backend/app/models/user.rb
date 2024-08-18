# frozen_string_literal: true

# Represents the User model
class User
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :email, type: String
  field :password_diggest, type: String
  field :avatar, type: String
  field :provider, type: String, default: 'email'
  field :uid, type: String
  has_many :cards

  field :learnt_cards_count, type: Integer, default: 0
  field :to_learn_cards_count, type: Integer, default: 0

  validates :name, length: { minimum: 3, maximum: 64 }, presence: true
  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 6, maximum: 64 }, presence: true, if: :password_required?

  attr_accessor :password

  before_save :encrypt_password, if: :provider == 'email'

  def authenticate(password)
    BCrypt::Password.new(password_diggest) == password
  end

  def self.from_googleauth(auth)
    user = find_by(email: auth[:info][:email]) if exists?(email: auth[:info][:email])

    if user
      user.update(uid: auth[:uid]) unless user.uid.present?
    else
      user = new(
        provider: auth[:provider],
        uid: auth[:uid],
        email: auth[:info][:email],
        name: auth[:info][:name],
        avatar: auth[:info][:image]
      )
      user.save
    end

    user
  end

  private

  def password_required?
    (new_record? && provider == 'email') || password.present?
  end

  def encrypt_password
    self.password_diggest = BCrypt::Password.create(password) if password.present?
  end
end
