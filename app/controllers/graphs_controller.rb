class GraphsController < ApplicationController
  before_action :set_graph, only: [:show, :update, :destroy]

  def index
    @graphs= Graph.all
  end

  def show
      redirect_to graph_ideas_path(@graph)
  end

  def create
    @graph = Graph.new(graph_params)
    if @graph.save
      create_first_idea
      redirect_to graph_ideas_path(@graph)
    else
      redirect_to graphs_path, alert: 'Something has gone wrong'
    end
  end

  def destroy
    @graph.destroy
    redirect_to graphs_path , notice: 'Graph was successfully destroyed.'
  end

  private

  def create_first_idea
      first_title = 'Idea'
      concept = Concept.find_by_title( first_title ) || Concept.create(title: first_title )
      Idea.create(graph_id: @graph.id, x: 600 , y: 400 , font_size: 20 , concept_id: concept.id)
  end

  def set_graph
    @graph = Graph.find(params[:id])
  end

  def graph_params
    params.require(:graph).permit(:title)
  end
end
