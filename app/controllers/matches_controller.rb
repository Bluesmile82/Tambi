class MatchesController < ApplicationController

  def index
    title = params[:title]
    @matches_b = Match.all.select{ |match| match.concept_a.title == title }
    @matches_a = Match.all.select{ |match| match.concept_b.title == title }
  end
end