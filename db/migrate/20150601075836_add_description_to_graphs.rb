class AddDescriptionToGraphs < ActiveRecord::Migration
  def change
    add_column :graphs, :description, :string
  end
end
