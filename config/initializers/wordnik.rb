Wordnik.configure do |config|
  config.api_key = '7fd4dd7771da71026f90e04336b0bab260ebc6afb92f9dc20'               # required
  config.username = 'Bluesmile'                    # optional, but needed for user-related functions
  config.password = 'chuchu82'               # optional, but needed for user-related functions
  config.response_format = 'json'             # defaults to json, but xml is also supported
  config.logger = Logger.new('/dev/null')     # defaults to Rails.logger or Logger.new(STDOUT). Set to Logger.new('/dev/null') to disable logging.
end