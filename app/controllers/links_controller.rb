class LinksController < ApplicationController

  def create
    @idea_a = Idea.find(params[:link][:idea_a_id])
    @idea_b = Idea.find(params[:link][:idea_b_id])
    @link = @idea_a.link!(@idea_b)
    @idea_a.concept.match!(@idea_b.concept, @idea_a.graph.user)
  end

  def destroy
    Link.find(params[:id]).destroy
    head 200
  end

end