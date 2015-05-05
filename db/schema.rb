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

ActiveRecord::Schema.define(version: 20150503203217) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "concepts", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "graphs", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ideas", force: :cascade do |t|
    t.float    "x"
    t.float    "y"
    t.integer  "font_size"
    t.integer  "concept_id"
    t.integer  "graph_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "ideas", ["concept_id"], name: "index_ideas_on_concept_id", using: :btree
  add_index "ideas", ["graph_id"], name: "index_ideas_on_graph_id", using: :btree

  create_table "links", force: :cascade do |t|
    t.integer  "idea_a_id"
    t.integer  "idea_b_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "links", ["idea_a_id", "idea_b_id"], name: "index_links_on_idea_a_id_and_idea_b_id", unique: true, using: :btree
  add_index "links", ["idea_a_id"], name: "index_links_on_idea_a_id", using: :btree
  add_index "links", ["idea_b_id"], name: "index_links_on_idea_b_id", using: :btree

  add_foreign_key "ideas", "concepts"
  add_foreign_key "ideas", "graphs"
end
