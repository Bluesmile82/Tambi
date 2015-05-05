class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.float :x
      t.float :y
      t.integer :font_size
      t.references :concept, index: true, foreign_key: true
      t.references :graph, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
