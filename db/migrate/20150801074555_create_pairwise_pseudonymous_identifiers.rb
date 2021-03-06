class CreatePairwisePseudonymousIdentifiers < ActiveRecord::Migration
  def change
    create_table :ppid do |t|
      t.belongs_to :o_auth_application, index: true
      t.belongs_to :user, index: true

      t.primary_key :guid, :string, limit: 32
      t.string :sector_identifier
    end
    add_foreign_key :ppid, :o_auth_applications
    add_foreign_key :ppid, :users
  end
end
