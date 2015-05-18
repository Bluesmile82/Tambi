class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.integer :concept_a_id
      t.integer :concept_b_id
      t.string :api
      t.timestamps null: false
    end
    add_index :matches, :concept_a_id
    add_index :matches, :concept_b_id
    add_index :matches, [:concept_a_id, :concept_b_id], unique: true
  end
end
