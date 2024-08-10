# frozen_string_literal: true

# Represents the Card model
class Card
  include Mongoid::Document
  include Mongoid::Timestamps
  field :word, type: String
  field :description, type: String
  field :remembered, type: Boolean
  belongs_to :user

  validates :word, length: { minimum: 1, maximum: 32 }, presence: true
  validates :description, length: { minimum: 1, maximum: 512 }, presence: true
  validates :remembered, inclusion: { in: [true, false] }, presence: true
end
