class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.integer :idea_a_id
      t.integer :idea_b_id
      t.timestamps null: false
    end
    add_index :links, :idea_a_id
    add_index :links, :idea_b_id
    add_index :links, [:idea_a_id, :idea_b_id], unique: true
  end
end
