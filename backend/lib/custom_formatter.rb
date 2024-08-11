# frozen_string_literal: true

require 'rainbow/refinement'
using Rainbow

# Custom logger formatter
class CustomFormatter < ActiveSupport::Logger::SimpleFormatter
  def call(severity, timestamp, _progname, message)
    case severity
    when 'INFO'
      "#{timestamp.to_formatted_s(:db)} [#{severity}] #{message}\n".blue
    when 'ERROR', 'FATAL'
      "#{timestamp.to_formatted_s(:db)} [#{severity}] #{message}\n".red
    when 'WARN'
      "#{timestamp.to_formatted_s(:db)} [#{severity}] #{message}\n".yellow
    end
  end
end
