class AddTypeToIdea < ActiveRecord::Migration
  def change
    add_column :ideas, :concept_type, :string
    add_column :ideas, :description, :text
    add_column :ideas, :url, :string
    add_column :ideas, :picture, :string
  end
end
