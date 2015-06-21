# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150617124650) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "concepts", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "graphs", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "user_id"
    t.string   "description"
    t.boolean  "public",      default: false
    t.boolean  "private",     default: false
  end

  add_index "graphs", ["user_id"], name: "index_graphs_on_user_id", using: :btree

  create_table "ideas", force: :cascade do |t|
    t.float    "x"
    t.float    "y"
    t.integer  "font_size"
    t.integer  "concept_id"
    t.integer  "graph_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "concept_type"
    t.text     "description"
    t.string   "url"
    t.string   "picture"
    t.integer  "parent_id"
  end

  add_index "ideas", ["concept_id"], name: "index_ideas_on_concept_id", using: :btree
  add_index "ideas", ["graph_id"], name: "index_ideas_on_graph_id", using: :btree

  create_table "links", force: :cascade do |t|
    t.integer  "idea_a_id"
    t.integer  "idea_b_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "links", ["idea_a_id", "idea_b_id"], name: "index_links_on_idea_a_id_and_idea_b_id", unique: true, using: :btree
  add_index "links", ["idea_a_id"], name: "index_links_on_idea_a_id", using: :btree
  add_index "links", ["idea_b_id"], name: "index_links_on_idea_b_id", using: :btree
  add_index "links", ["user_id"], name: "index_links_on_user_id", using: :btree

  create_table "matches", force: :cascade do |t|
    t.integer  "concept_a_id"
    t.integer  "concept_b_id"
    t.string   "api"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "user_id"
  end

  add_index "matches", ["concept_a_id", "concept_b_id"], name: "index_matches_on_concept_a_id_and_concept_b_id", unique: true, using: :btree
  add_index "matches", ["concept_a_id"], name: "index_matches_on_concept_a_id", using: :btree
  add_index "matches", ["concept_b_id"], name: "index_matches_on_concept_b_id", using: :btree
  add_index "matches", ["user_id"], name: "index_matches_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.integer  "concept_id"
    t.integer  "idea_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["concept_id"], name: "index_tags_on_concept_id", using: :btree
  add_index "tags", ["idea_id"], name: "index_tags_on_idea_id", using: :btree
  add_index "tags", ["user_id"], name: "index_tags_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "username"
    t.text     "bio"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "graphs", "users"
  add_foreign_key "ideas", "concepts"
  add_foreign_key "ideas", "graphs"
  add_foreign_key "links", "users"
  add_foreign_key "matches", "users"
  add_foreign_key "tags", "concepts"
  add_foreign_key "tags", "ideas"
  add_foreign_key "tags", "users"
end
