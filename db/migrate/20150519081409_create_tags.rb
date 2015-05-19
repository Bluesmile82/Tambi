class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.references :concept, index: true, foreign_key: true
      t.references :idea, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
