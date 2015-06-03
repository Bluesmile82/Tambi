class LinksController < ApplicationController

  def index
    title = params[:title]
    @links_b = Link.all.select{ |link| link.idea_a.concept.title == title }
    @links_a = Link.all.select{ |link| link.idea_b.concept.title == title }
  end

  def matches
    title = params[:title]
    @links_b = Link.all.select{ |link| link.idea_a.concept.title == title }.reject{ |link| link.idea_a.graph.user == current_user }
    @links_a = Link.all.select{ |link| link.idea_b.concept.title == title }.reject{ |link| link.idea_b.graph.user == current_user }
  end

  def create
    @idea_a = Idea.find(params[:link][:idea_a_id])
    @idea_b = Idea.find(params[:link][:idea_b_id])
    @link = @idea_a.link!(@idea_b)
    # @idea_a.concept.match!(@idea_b.concept, @idea_a.graph.user)
  end

  def destroy
    Link.find(params[:id]).destroy
    head 200
  end

end