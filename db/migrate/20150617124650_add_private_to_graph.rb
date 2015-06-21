class AddPrivateToGraph < ActiveRecord::Migration
  def change
    add_column :graphs, :private, :boolean, default: false
  end
end
