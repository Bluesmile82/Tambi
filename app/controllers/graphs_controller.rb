class GraphsController < ApplicationController
  before_action :set_graph, only: [:show, :update, :destroy]

  def new
  end

  def index
    @graphs= Graph.all
  end

  def show
    redirect_to graph_ideas_path(@graph)
  end

  def update
  end
  def create
    @graph = Graph.new(graph_params)

    respond_to do |format|
      if @graph.save
        format.html { redirect_to @graph, notice: 'Idea was successfully created.' }
        # format.json { render :show, status: :created, location: @idea }
      else
        format.html { render :new }
        # format.json { render json: @idea.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @graph.destroy
    redirect_to graphs_path , notice: 'Graph was successfully destroyed.'
  end

  def set_graph
    @graph = Graph.find(params[:id])
  end

  def graph_params
    params.require(:graph).permit(:title)
  end
end
