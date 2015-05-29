class GraphsController < ApplicationController
  before_action :set_graph, only: [:show, :redirect, :update, :destroy]

  def index
    @graphs= current_user.graphs
  end

  def all
    @graphs = Graph.all
  end

  def show
    redirect_to user_graph_ideas_path(graph_id: @graph.id)
  end

  def redirect
    @path = user_graph_ideas_path(graph_id: @graph)
  end

  def create
    @graph = current_user.graphs.new(graph_params)
    if @graph.save
      create_first_idea
      redirect_to user_graph_ideas_path(graph_id: @graph.id)
    else
      redirect_to user_graphs_path, alert: 'Something has gone wrong'
    end
  end

  def destroy
    @graph.destroy
    redirect_to user_graphs_path , notice: 'Graph was successfully destroyed.'
  end

  private

  def create_first_idea
      first_title = 'Idea'
      concept = Concept.find_by_title( first_title ) || Concept.create(title: first_title )
      Idea.create(  graph_id: @graph.id,
                    x: 600,
                    y: 400,
                    font_size: 20,
                    concept_id: concept.id,
                    concept_type: 'concept')
  end

  def set_graph
    @graph = params[:idea_id] ? Graph.find(Idea.find(params[:idea_id]).graph.id) : Graph.find(params[:id])
  end

  def graph_params
    params.require(:graph).permit(:title, :user_id)
  end
end
