class IdeasController < ApplicationController
  before_action :set_idea, only: [:show, :update, :destroy]
  before_action :set_graph, only: [:index, :create, :update, :destroy]
  before_action :set_concept, only: [:create, :update]

  def index
     @ideas = @graph.ideas
     @links = @ideas.map{|idea| idea.links }.flatten
  end

  def create
    @idea = Idea.create( graph_id: @graph.id, concept_id: @concept.id, id: idea_params[:id], x: idea_params[:x], y: idea_params[:y], font_size: idea_params[:font_size] )
  end

  def update
    @idea.update( graph_id: @graph.id, concept_id: @concept.id, id: idea_params[:id], x: idea_params[:x], y: idea_params[:y], font_size: idea_params[:font_size] )
    @idea.save
    head 200
  end

  def destroy
    @idea.destroy
    head 200
  end

  private

    def set_concept
      @concept = Concept.find_by_title(params[:idea][:concept_title])
      create_concept if @concept.nil?
    end

    def create_concept
      @concept = Concept.create(title: params[:idea][:concept_title])
    end

    def set_idea
      @idea = Idea.find(params[:id])
    end

    def set_graph
      @graph = Graph.find(params[:graph_id])
    end

    def idea_params
      params.require(:idea).permit(:id, :x, :y, :font_size, :graph_id, :concept_id)
    end
end
