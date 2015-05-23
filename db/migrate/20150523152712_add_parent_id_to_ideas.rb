class AddParentIdToIdeas < ActiveRecord::Migration
  def change
    add_column :ideas, :parent_id, :integer
  end
end
