class AddPublicToGraph < ActiveRecord::Migration
  def change
    add_column :graphs, :public, :boolean, default: false
  end
end
