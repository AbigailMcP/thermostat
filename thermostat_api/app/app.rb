ENV['RACK_ENV'] ||= 'development'

require 'sinatra/base'
require './data_mapper_setup'
require 'json'
require_relative 'models/thermostat'

class App < Sinatra::Base

  set :public_folder, File.dirname(__FILE__) + '/public'
  set :views, File.dirname(__FILE__) + '/views'

  get '/' do
    erb :layout
  end

  get '/temperature' do
    thermostat = Thermostat.last
    {temp2: thermostat.temp, powermode2: thermostat.powermode}.to_json
  end

  post '/temperature' do
    thermostat = Thermostat.create(temp: params[:temp], powermode: params[:powermode])
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
