class IdeasController < ApplicationController
  before_action :set_idea, only: [:show, :edit, :update, :destroy]
  before_action :set_graph, only: [:index, :create, :edit, :update, :destroy]

  def index
     @ideas = @graph.ideas
  end


  def show
  end

  def edit
  end

  def create
    concept = Concept.new(title: params[:concept][:title])
    concept.save
    @idea = Idea.new( graph_id: @graph.id, concept_id: concept.id, id: idea_params[:id], x: idea_params[:x], y: idea_params[:y], font_size: idea_params[:font_size] )
    @idea.save
  end

  # PATCH/PUT /ideas/1
  # PATCH/PUT /ideas/1.json
  def update
    concept = Concept.new(title: params[:concept][:title])
    concept.save
    @idea.update( graph_id: @graph.id, concept_id: concept.id, id: idea_params[:id], x: idea_params[:x], y: idea_params[:y], font_size: idea_params[:font_size] )
    @idea.save
    render nothing: true, status: 200
  end

  # DELETE /ideas/1
  # DELETE /ideas/1.json
  def destroy
    @idea.destroy
    render nothing: true, status: 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_idea
      @idea = Idea.find(params[:id])
    end

    def set_graph
      @graph = Graph.find(params[:graph_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def idea_params
      params.require(:idea).permit(:id, :x, :y, :font_size, :graph_id, :concept_id)
    end
end
