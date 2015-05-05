class LinksController < ApplicationController

  def create
    @idea_a = Idea.find(params[:idea_a_id])
    @idea_b = Idea.find(params[:idea_b_id])
    @idea_a.link!(@idea_b)
    byebug
    respond_to do |format|
      format.html { redirect_to @idea }
    end
  end

  def destroy
    @idea = Idea.find(params[:id]).idea_bs
    current_idea.unlink!(@idea)
    respond_to do |format|
      format.html { redirect_to @idea }
    end
  end

end