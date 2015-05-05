class CreateGraphs < ActiveRecord::Migration
  def change
    create_table :graphs do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
