# frozen_string_literal: true

# Represents the Card model
class Card
  include Mongoid::Document
  include Mongoid::Timestamps
  field :word, type: String
  field :description, type: String
  field :transcription, type: String
  field :remembered, type: Boolean, default: false
  field :image, type: String
  belongs_to :user

  validates :word, length: { minimum: 1, maximum: 32 }, presence: true
  validates :description, length: { minimum: 1, maximum: 512 }, presence: true
  validates :transcription, length: { minimum: 1, maximum: 32 }, presence: true
  validates :remembered, inclusion: { in: [true, false] }, presence: true
  validates :image, presence: true

  after_update :update_user_card_counts, if: :saved_change_to_remembered?
  after_create :increment_to_learn_count
  after_destroy :decrement_to_learn_count

  private

  def update_user_card_counts
    user = self.user
    if remembered
      user.learnt_cards_count += 1
      user.to_learn_cards_count -= 1
    else
      user.learnt_cards_count -= 1
      user.to_learn_cards_count += 1
    end
    user.save
  end

  def increment_to_learn_count
    user = self.user
    user.to_learn_cards_count += 1 unless remembered
    user.save
  end

  def decrement_to_learn_count
    user = self.user
    user.to_learn_cards_count -= 1 unless remembered
    user.save
  end
end
