%w(rubygems wordnik).each {|lib| require lib}

class WordnikController < ApplicationController
  def get
    if params[:type] == 'related'
      words = Wordnik.word.get_related_words( params[:title])
      return @data = words.map{ |t| t['words'] }.flatten.sample(20)
    end
    @data = Wordnik.word.get_related( params[:title] , :type => params[:type] )[0]
  end
end