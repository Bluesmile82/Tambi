class AddUserToMatches < ActiveRecord::Migration
  def change
    add_reference :matches, :user, index: true, foreign_key: true
  end
end
