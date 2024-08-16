# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/auth/login', to: 'authentication#login'
  post '/auth/register', to: 'authentication#register'
  post '/auth/google_oauth2/callback', to: 'authentication#google_oauth2_callback'
  get '/auth/logout', to: 'authentication#logout'
  resources :users
  resources :cards do
    collection do
      get '/user/:user_id', to: 'cards#index_by_user_and_status'
    end
  end
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ('/')
  # root 'posts#index'
end
