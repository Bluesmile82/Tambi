class CreateConcepts < ActiveRecord::Migration
  def change
    create_table :concepts do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
