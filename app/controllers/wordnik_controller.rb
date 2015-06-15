%w(rubygems wordnik).each {|lib| require lib}

class WordnikController < ApplicationController
  def get
    @data = Wordnik.word.get_related( params.first[0] , :type => 'synonym')[0]
  end
end