require 'swagger_helper'

RSpec.describe 'Cards API', type: :request do

  path '/cards/user/{user_id}' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'

    get('List all user cards by status') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      parameter name: 'remembered', in: :query, type: :boolean, required: true, description: 'Filter cards by remembered status'
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:remembered) { false }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/cards' do

    get('List all cards') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    post('Create a card') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      response(200, 'successful') do
        consumes 'application/json'
        parameter name: :card, in: :body, schema: {
          type: :object,
          properties: {
            word: { type: :string },
            description: { type: :string },
            remembered: { type: :boolean },
            image: { type: :string }
          },
          required: %w[word description image]
        }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/cards/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('Get a card') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    patch('Partial update a card') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      response(200, 'successful') do
        consumes 'application/json'
        parameter name: :card, in: :body, schema: {
          type: :object,
          properties: {
            word: { type: :string },
            description: { type: :string },
            remembered: { type: :boolean },
            image: { type: :string }
          }
        }

        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    put('Full update a card') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      response(200, 'successful') do
        consumes 'application/json'
        parameter name: :card, in: :body, schema: {
          type: :object,
          properties: {
            word: { type: :string },
            description: { type: :string },
            remembered: { type: :boolean },
            image: { type: :string }
          },
          required: %w[word description remembered image]
        }

        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    delete('Delete a card') do
      tags 'Cards'
      security [{ BearerAuth: [] }]
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
