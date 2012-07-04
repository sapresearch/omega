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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120621131059) do

  create_table "accounts", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "active_admin_comments", :force => true do |t|
    t.string   "resource_id",   :null => false
    t.string   "resource_type", :null => false
    t.integer  "author_id"
    t.string   "author_type"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "namespace"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], :name => "index_active_admin_comments_on_author_type_and_author_id"
  add_index "active_admin_comments", ["namespace"], :name => "index_active_admin_comments_on_namespace"
  add_index "active_admin_comments", ["resource_type", "resource_id"], :name => "index_admin_notes_on_resource_type_and_resource_id"

  create_table "admin_users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], :name => "index_admin_users_on_email", :unique => true
  add_index "admin_users", ["reset_password_token"], :name => "index_admin_users_on_reset_password_token", :unique => true

  create_table "asset_allocations", :force => true do |t|
    t.integer  "asset_id"
    t.integer  "service_leaf_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "asset_allocations", ["account_id"], :name => "index_asset_allocations_on_account_id"

  create_table "assets", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "assets", ["account_id"], :name => "index_assets_on_account_id"

  create_table "blocks", :force => true do |t|
    t.string   "type",                           :null => false
    t.string   "name",                           :null => false
    t.string   "title"
    t.text     "description"
    t.text     "content",                        :null => false
    t.boolean  "user_created", :default => true, :null => false
    t.text     "settings"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "blocks", ["account_id"], :name => "index_blocks_on_account_id"
  add_index "blocks", ["name"], :name => "index_blocks_on_name", :unique => true

  create_table "calendar_event_sources", :force => true do |t|
    t.integer  "calendar_id"
    t.integer  "event_id"
    t.integer  "source_id"
    t.string   "source_type"
    t.boolean  "synchronize"
    t.text     "mapping"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "calendar_event_sources", ["account_id"], :name => "index_calendar_event_sources_on_account_id"

  create_table "calendar_events", :force => true do |t|
    t.integer  "calendar_id"
    t.string   "name"
    t.string   "url"
    t.text     "description"
    t.datetime "start"
    t.datetime "end"
    t.boolean  "all_day"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "recurrent"
    t.integer  "recurrence_series_id"
    t.time     "recurrence_start_time"
    t.time     "recurrence_end_time"
    t.string   "recurrence_pattern"
    t.string   "recurrence_every"
    t.string   "recurrence_ordinal"
    t.string   "recurrence_days"
    t.integer  "recurrence_weeks"
    t.integer  "recurrence_months"
    t.integer  "recurrence_years"
    t.date     "recurrence_start"
    t.string   "recurrence_end_on"
    t.date     "recurrence_end_at"
    t.integer  "recurrence_end_after"
    t.integer  "account_id"
  end

  add_index "calendar_events", ["account_id"], :name => "index_calendar_events_on_account_id"

  create_table "calendar_shares", :force => true do |t|
    t.integer  "calendar_id"
    t.integer  "shared_to_id"
    t.boolean  "readable"
    t.boolean  "writable"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "calendar_shares", ["account_id"], :name => "index_calendar_shares_on_account_id"

  create_table "calendars", :force => true do |t|
    t.string   "calendar_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "account_id"
  end

  add_index "calendars", ["account_id"], :name => "index_calendars_on_account_id"

  create_table "components", :force => true do |t|
    t.string   "type",                           :null => false
    t.string   "name",                           :null => false
    t.string   "title"
    t.text     "description"
    t.text     "content",                        :null => false
    t.boolean  "user_created", :default => true, :null => false
    t.text     "settings"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "components", ["account_id"], :name => "index_components_on_account_id"
  add_index "components", ["name"], :name => "index_components_on_name", :unique => true

  create_table "contact_addresses", :force => true do |t|
    t.integer  "contact_id",      :null => false
    t.string   "contact_type",    :null => false
    t.string   "address_type"
    t.string   "street"
    t.integer  "unit_apt_number"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "country"
    t.text     "notes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_addresses", ["account_id"], :name => "index_contact_addresses_on_account_id"

  create_table "contact_contacts_interests", :id => false, :force => true do |t|
    t.integer "contact_id",  :null => false
    t.integer "interest_id", :null => false
    t.integer "account_id"
  end

  add_index "contact_contacts_interests", ["account_id"], :name => "index_contact_contacts_interests_on_account_id"
  add_index "contact_contacts_interests", ["contact_id", "interest_id"], :name => "index_contact_contacts_interests_on_contact_id_and_interest_id", :unique => true

  create_table "contact_contacts_languages", :id => false, :force => true do |t|
    t.integer "contact_id",  :null => false
    t.integer "language_id", :null => false
    t.integer "account_id"
  end

  add_index "contact_contacts_languages", ["account_id"], :name => "index_contact_contacts_languages_on_account_id"
  add_index "contact_contacts_languages", ["contact_id", "language_id"], :name => "index_contact_contacts_languages_on_contact_id_and_language_id", :unique => true

  create_table "contact_contacts_skills", :id => false, :force => true do |t|
    t.integer "contact_id", :null => false
    t.integer "skill_id",   :null => false
    t.integer "account_id"
  end

  add_index "contact_contacts_skills", ["account_id"], :name => "index_contact_contacts_skills_on_account_id"
  add_index "contact_contacts_skills", ["contact_id", "skill_id"], :name => "index_contact_contacts_skills_on_contact_id_and_skill_id", :unique => true

  create_table "contact_data_imports", :force => true do |t|
    t.text     "csv_rows",      :limit => 2147483647
    t.text     "mapping",       :limit => 2147483647
    t.text     "mapped_rows",   :limit => 2147483647
    t.text     "imported_rows", :limit => 2147483647
    t.string   "status"
    t.text     "contact_ids",   :limit => 2147483647
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_data_imports", ["account_id"], :name => "index_contact_data_imports_on_account_id"

  create_table "contact_fields", :force => true do |t|
    t.string   "name"
    t.string   "data_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.integer  "account_id"
  end

  add_index "contact_fields", ["account_id"], :name => "index_contact_fields_on_account_id"

  create_table "contact_fields_volunteering_positions", :id => false, :force => true do |t|
    t.integer "contact_field_id",         :null => false
    t.integer "volunteering_position_id", :null => false
    t.integer "account_id"
  end

  add_index "contact_fields_volunteering_positions", ["account_id"], :name => "index_contact_fields_volunteering_positions_on_account_id"

  create_table "contact_group_positions", :force => true do |t|
    t.integer "contact_id", :null => false
    t.integer "group_id",   :null => false
    t.string  "position"
    t.integer "account_id"
  end

  add_index "contact_group_positions", ["account_id"], :name => "index_contact_group_positions_on_account_id"
  add_index "contact_group_positions", ["contact_id", "group_id"], :name => "index_contact_group_positions_on_contact_id_and_group_id"

  create_table "contact_groups", :force => true do |t|
    t.string   "group_type"
    t.string   "group_name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_groups", ["account_id"], :name => "index_contact_groups_on_account_id"

  create_table "contact_imports", :force => true do |t|
    t.string   "datatype"
    t.integer  "processed",        :default => 0
    t.string   "csv_file_name"
    t.string   "csv_content_type"
    t.integer  "csv_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_imports", ["account_id"], :name => "index_contact_imports_on_account_id"

  create_table "contact_interests", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_interests", ["account_id"], :name => "index_contact_interests_on_account_id"

  create_table "contact_interests_volunteering_positions", :id => false, :force => true do |t|
    t.integer "interest_id", :null => false
    t.integer "position_id", :null => false
    t.integer "account_id"
  end

  add_index "contact_interests_volunteering_positions", ["account_id"], :name => "index_contact_interests_volunteering_positions_on_account_id"
  add_index "contact_interests_volunteering_positions", ["interest_id", "position_id"], :name => "contact_interests_volunteering_positions_ids", :unique => true

  create_table "contact_languages", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_languages", ["account_id"], :name => "index_contact_languages_on_account_id"

  create_table "contact_phone_numbers", :force => true do |t|
    t.integer  "contact_id",     :null => false
    t.string   "contact_type",   :null => false
    t.string   "number_type"
    t.string   "number"
    t.string   "available_time"
    t.string   "preferred_time"
    t.text     "notes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_phone_numbers", ["account_id"], :name => "index_contact_phone_numbers_on_account_id"

  create_table "contact_skills", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_skills", ["account_id"], :name => "index_contact_skills_on_account_id"

  create_table "contact_skills_users", :id => false, :force => true do |t|
    t.integer "skill_id",   :null => false
    t.integer "user_id",    :null => false
    t.integer "account_id"
  end

  add_index "contact_skills_users", ["account_id"], :name => "index_contact_skills_users_on_account_id"
  add_index "contact_skills_users", ["skill_id", "user_id"], :name => "contact_skills_users_ids", :unique => true

  create_table "contact_skills_volunteering_positions", :id => false, :force => true do |t|
    t.integer "skill_id",    :null => false
    t.integer "position_id", :null => false
    t.integer "account_id"
  end

  add_index "contact_skills_volunteering_positions", ["account_id"], :name => "index_contact_skills_volunteering_positions_on_account_id"
  add_index "contact_skills_volunteering_positions", ["skill_id", "position_id"], :name => "contact_skills_volunteering_positions_ids", :unique => true

  create_table "contact_values", :force => true do |t|
    t.integer  "field_id"
    t.integer  "contact_id"
    t.string   "value"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "contact_values", ["account_id"], :name => "index_contact_values_on_account_id"

  create_table "contacts", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "middle_name"
    t.string   "email"
    t.string   "email2"
    t.string   "emergency_contact_name"
    t.integer  "emergency_contact_number"
    t.boolean  "volunteered_before"
    t.text     "volunteerd_when_where"
    t.string   "parent_name"
    t.string   "parent_email"
    t.string   "gender"
    t.string   "about_us"
    t.string   "status"
    t.boolean  "do_not_email"
    t.boolean  "no_bulk_emails"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "birthday"
    t.integer  "account_id"
    t.boolean  "over_18",                  :default => false
  end

  add_index "contacts", ["account_id"], :name => "index_contacts_on_account_id"

  create_table "deliveries", :force => true do |t|
    t.string  "message_id"
    t.string  "recipient"
    t.text    "content"
    t.string  "status"
    t.integer "account_id"
  end

  add_index "deliveries", ["account_id"], :name => "index_deliveries_on_account_id"

  create_table "event_recurrences", :force => true do |t|
    t.string   "interval"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "end_at"
    t.integer  "account_id"
  end

  add_index "event_recurrences", ["account_id"], :name => "index_event_recurrences_on_account_id"

  create_table "events", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "start_at"
    t.datetime "end_at"
    t.string   "location"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "events", ["account_id"], :name => "index_events_on_account_id"

  create_table "favorites", :force => true do |t|
    t.integer  "user_id"
    t.integer  "item_id"
    t.string   "item_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "favorites", ["account_id"], :name => "index_favorites_on_account_id"
  add_index "favorites", ["user_id", "item_id", "item_type"], :name => "index_favorites_on_user_id_and_item_id_and_item_type", :unique => true

  create_table "groups", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "status",         :default => "private"
    t.integer  "capacity"
    t.boolean  "is_blocked",     :default => false
    t.integer  "super_group_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "groups", ["account_id"], :name => "index_groups_on_account_id"

  create_table "groups_members", :force => true do |t|
    t.string   "position",   :default => "member"
    t.integer  "group_id"
    t.integer  "member_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "groups_members", ["account_id"], :name => "index_groups_members_on_account_id"

  create_table "groups_requesters", :force => true do |t|
    t.integer  "group_id"
    t.integer  "requester_id"
    t.string   "status"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "groups_requesters", ["account_id"], :name => "index_groups_requesters_on_account_id"

  create_table "groups_roles", :force => true do |t|
    t.integer  "group_id"
    t.integer  "role_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "groups_roles", ["account_id"], :name => "index_groups_roles_on_account_id"

  create_table "groups_topics", :force => true do |t|
    t.integer  "group_id"
    t.integer  "topic_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "groups_topics", ["account_id"], :name => "index_groups_topics_on_account_id"

  create_table "groups_uploads", :force => true do |t|
    t.integer  "group_id"
    t.integer  "upload_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "groups_uploads", ["account_id"], :name => "index_groups_uploads_on_account_id"

  create_table "images", :force => true do |t|
    t.string   "datatype"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "image_in_use"
    t.string   "banner_or_logo"
    t.integer  "account_id"
  end

  add_index "images", ["account_id"], :name => "index_images_on_account_id"

  create_table "menu_items", :force => true do |t|
    t.integer  "parent_id",                     :null => false
    t.string   "parent_type",                   :null => false
    t.string   "path"
    t.string   "name",                          :null => false
    t.string   "title"
    t.string   "description"
    t.boolean  "enabled",     :default => true, :null => false
    t.integer  "weight",      :default => 10,   :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "menu_items", ["account_id"], :name => "index_menu_items_on_account_id"
  add_index "menu_items", ["name"], :name => "index_menu_items_on_name", :unique => true
  add_index "menu_items", ["parent_id", "parent_type"], :name => "index_menu_items_on_parent_id_and_parent_type"
  add_index "menu_items", ["path"], :name => "index_menu_items_on_path", :unique => true

  create_table "menus", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "menus", ["account_id"], :name => "index_menus_on_account_id"
  add_index "menus", ["name"], :name => "index_menus_on_name", :unique => true

  create_table "messages", :force => true do |t|
    t.integer  "to_id"
    t.integer  "from_id"
    t.string   "subject"
    t.text     "body"
    t.datetime "read_at"
    t.datetime "deleted_by_to_at"
    t.datetime "deleted_by_from_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "messages", ["account_id"], :name => "index_messages_on_account_id"

  create_table "news_item_sources", :force => true do |t|
    t.integer  "account_id",                     :null => false
    t.string   "name"
    t.string   "source_type", :default => "rss"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    t.string   "remote_id"
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  end

  create_table "news_items", :force => true do |t|
    t.integer  "account_id",                            :null => false
    t.integer  "news_item_source_id"
    t.string   "title"
    t.text     "content"
    t.string   "url"
    t.boolean  "visibility",          :default => true
    t.datetime "created_at"
    t.datetime "updated_at"
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    t.string   "remote_id"
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  end

  create_table "page_blocks", :force => true do |t|
    t.integer  "page_id",                      :null => false
    t.integer  "block_id",                     :null => false
    t.string   "title"
    t.boolean  "enabled",    :default => true, :null => false
    t.integer  "weight",     :default => 10,   :null => false
    t.text     "settings"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "page_blocks", ["account_id"], :name => "index_page_blocks_on_account_id"
  add_index "page_blocks", ["page_id", "block_id"], :name => "index_page_blocks_on_page_id_and_block_id"

  create_table "page_components", :force => true do |t|
    t.integer  "page_id",                        :null => false
    t.integer  "component_id",                   :null => false
    t.string   "title"
    t.boolean  "enabled",      :default => true, :null => false
    t.integer  "weight",       :default => 10,   :null => false
    t.text     "settings"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "page_components", ["account_id"], :name => "index_page_components_on_account_id"
  add_index "page_components", ["page_id", "component_id"], :name => "index_page_components_on_page_id_and_component_id"

  create_table "pages", :force => true do |t|
    t.string   "path"
    t.string   "name",                           :null => false
    t.string   "title"
    t.text     "description"
    t.boolean  "enabled",     :default => true,  :null => false
    t.boolean  "is_home",     :default => false, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "pages", ["account_id"], :name => "index_pages_on_account_id"
  add_index "pages", ["name"], :name => "index_pages_on_name", :unique => true
  add_index "pages", ["path"], :name => "index_pages_on_path", :unique => true

  create_table "payments", :force => true do |t|
    t.integer  "payable_id"
    t.string   "payable_type"
    t.integer  "payer_id"
    t.decimal  "amount",         :precision => 8, :scale => 2, :default => 0.0
    t.string   "payment_method"
    t.integer  "transaction_id"
    t.text     "description"
    t.string   "status"
    t.boolean  "is_test"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "payments", ["account_id"], :name => "index_payments_on_account_id"

  create_table "permissions", :force => true do |t|
    t.string  "name",        :null => false
    t.string  "group"
    t.string  "value",       :null => false
    t.text    "description"
    t.integer "account_id"
  end

  add_index "permissions", ["account_id"], :name => "index_permissions_on_account_id"
  add_index "permissions", ["name"], :name => "index_permissions_on_name"
  add_index "permissions", ["value"], :name => "index_permissions_on_value"

  create_table "permissions_roles", :id => false, :force => true do |t|
    t.integer "permission_id", :null => false
    t.integer "role_id",       :null => false
    t.integer "account_id"
  end

  add_index "permissions_roles", ["account_id"], :name => "index_permissions_roles_on_account_id"
  add_index "permissions_roles", ["permission_id", "role_id"], :name => "index_permissions_roles_on_permission_id_and_role_id", :unique => true

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "author_id"
    t.integer  "super_post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "posts", ["account_id"], :name => "index_posts_on_account_id"

  create_table "roles", :force => true do |t|
    t.string   "name",                             :null => false
    t.boolean  "default_role",  :default => false, :null => false
    t.boolean  "locked",        :default => false, :null => false
    t.string   "internal_name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "roles", ["account_id"], :name => "index_roles_on_account_id"
  add_index "roles", ["name"], :name => "index_roles_on_name"

  create_table "roles_users", :id => false, :force => true do |t|
    t.integer "role_id",    :null => false
    t.integer "user_id",    :null => false
    t.integer "account_id"
  end

  add_index "roles_users", ["account_id"], :name => "index_roles_users_on_account_id"
  add_index "roles_users", ["role_id", "user_id"], :name => "index_roles_users_on_role_id_and_user_id", :unique => true

  create_table "service_detail_forms", :force => true do |t|
    t.text     "html"
    t.text     "field_values"
    t.integer  "service_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "service_detail_forms", ["account_id"], :name => "index_service_detail_forms_on_account_id"

  create_table "service_detail_templates", :force => true do |t|
    t.integer  "service_detail_form_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "service_detail_templates", ["account_id"], :name => "index_service_detail_templates_on_account_id"

  create_table "service_leaves", :force => true do |t|
    t.integer  "service_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "capacity"
    t.boolean  "is_blocked",                                  :default => false
    t.string   "register_type"
    t.decimal  "price",         :precision => 8, :scale => 2, :default => 0.0
    t.integer  "account_id"
  end

  add_index "service_leaves", ["account_id"], :name => "index_service_leaves_on_account_id"

  create_table "service_registration_form_values", :force => true do |t|
    t.integer  "service_registration_id"
    t.text     "field_values"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "service_registration_form_values", ["account_id"], :name => "index_service_registration_form_values_on_account_id"

  create_table "service_registration_forms", :force => true do |t|
    t.text     "html"
    t.integer  "service_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "service_registration_forms", ["account_id"], :name => "index_service_registration_forms_on_account_id"

  create_table "service_registration_templates", :force => true do |t|
    t.integer  "service_registration_form_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "service_registration_templates", ["account_id"], :name => "index_service_registration_templates_on_account_id"

  create_table "service_registrations", :force => true do |t|
    t.integer  "service_leaf_id"
    t.integer  "registrant_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status",          :default => "pending"
    t.integer  "account_id"
  end

  add_index "service_registrations", ["account_id"], :name => "index_service_registrations_on_account_id"

  create_table "service_sections", :force => true do |t|
    t.integer  "contact_id"
    t.integer  "service_leaf_id"
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "service_sections", ["account_id"], :name => "index_service_sections_on_account_id"

  create_table "services", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "status",           :null => false
    t.integer  "super_service_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "services", ["account_id"], :name => "index_services_on_account_id"

  create_table "settings", :force => true do |t|
    t.string   "facebook_token"
    t.boolean  "twitter"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "image_id"
    t.string   "fb_secret"
    t.string   "email"
    t.integer  "account_id"
    t.string   "news_group_id"
  end

  add_index "settings", ["account_id"], :name => "index_settings_on_account_id"
  add_index "settings", ["user_id"], :name => "index_settings_on_user_id"

  create_table "topics", :force => true do |t|
    t.string   "caption"
    t.integer  "post_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "topic_type", :default => "regular"
    t.integer  "account_id"
  end

  add_index "topics", ["account_id"], :name => "index_topics_on_account_id"

  create_table "uploads", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.string   "upload_file_name"
    t.integer  "upload_file_size"
    t.string   "upload_content_type"
    t.integer  "binding_id"
    t.string   "binding_type"
    t.integer  "uploader_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "uploads", ["account_id"], :name => "index_uploads_on_account_id"

  create_table "user_sessions", :force => true do |t|
    t.integer  "user_id",                            :null => false
    t.boolean  "enabled",          :default => true, :null => false
    t.datetime "signed_in_at"
    t.string   "last_activity"
    t.datetime "last_activity_at"
    t.integer  "account_id"
  end

  add_index "user_sessions", ["account_id"], :name => "index_user_sessions_on_account_id"
  add_index "user_sessions", ["user_id"], :name => "index_user_sessions_on_user_id"

  create_table "user_tokens", :force => true do |t|
    t.integer  "user_id"
    t.string   "token"
    t.string   "token_type"
    t.datetime "consumed_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "user_tokens", ["account_id"], :name => "index_user_tokens_on_account_id"

  create_table "users", :force => true do |t|
    t.string   "username",                     :null => false
    t.string   "password_hash", :limit => 128, :null => false
    t.string   "password_salt", :limit => 128, :null => false
    t.string   "email"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "time_zone"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "users", ["account_id"], :name => "index_users_on_account_id"
  add_index "users", ["email"], :name => "index_users_on_email"
  add_index "users", ["username"], :name => "index_users_on_username"

  create_table "volunteering_contact_positions", :force => true do |t|
    t.integer "contact_id",  :null => false
    t.integer "position_id", :null => false
    t.integer "account_id"
  end

  add_index "volunteering_contact_positions", ["account_id"], :name => "index_volunteering_contact_positions_on_account_id"
  add_index "volunteering_contact_positions", ["contact_id", "position_id"], :name => "by_contact_indeces", :unique => true

  create_table "volunteering_days", :force => true do |t|
    t.integer  "schedule_id", :null => false
    t.string   "day"
    t.boolean  "enabled"
    t.datetime "start_time"
    t.datetime "end_time"
    t.integer  "volunteers"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "volunteering_days", ["account_id"], :name => "index_volunteering_days_on_account_id"

  create_table "volunteering_positions", :force => true do |t|
    t.string   "name",                  :null => false
    t.text     "description"
    t.text     "hours"
    t.integer  "volunteers_required",   :null => false
    t.integer  "contact_id"
    t.datetime "start"
    t.datetime "end"
    t.boolean  "disclaimer_agreement"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "recurrent"
    t.integer  "recurrence_series_id"
    t.time     "recurrence_start_time"
    t.time     "recurrence_end_time"
    t.string   "recurrence_pattern"
    t.string   "recurrence_every"
    t.string   "recurrence_ordinal"
    t.string   "recurrence_days"
    t.integer  "recurrence_weeks"
    t.integer  "recurrence_months"
    t.integer  "recurrence_years"
    t.date     "recurrence_start"
    t.string   "recurrence_end_on"
    t.date     "recurrence_end_at"
    t.integer  "recurrence_end_after"
    t.text     "agreement"
    t.string   "priority"
    t.integer  "account_id"
  end

  add_index "volunteering_positions", ["account_id"], :name => "index_volunteering_positions_on_account_id"

  create_table "volunteering_records", :force => true do |t|
    t.integer  "position_id",                                      :null => false
    t.integer  "contact_id",                                       :null => false
    t.string   "status",                                           :null => false
    t.text     "notes"
    t.string   "action"
    t.text     "more_information"
    t.text     "admin_notes"
    t.text     "volunteering_reason"
    t.text     "my_idea"
    t.string   "availability"
    t.integer  "hours_per_week"
    t.boolean  "day_time"
    t.boolean  "evening_time"
    t.string   "day_preference"
    t.string   "evening_preference"
    t.date     "start_date"
    t.time     "start_time"
    t.date     "end_date"
    t.time     "end_time"
    t.boolean  "volunteering_to_meet_requirements"
    t.integer  "hours_required"
    t.boolean  "parental_consent"
    t.integer  "agreement",                         :default => 1
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "volunteering_records", ["account_id"], :name => "index_volunteering_records_on_account_id"

  create_table "volunteering_schedules", :force => true do |t|
    t.integer  "position_id",   :null => false
    t.string   "schedule_type", :null => false
    t.string   "value"
    t.date     "start_date",    :null => false
    t.date     "end_date",      :null => false
    t.time     "start_time",    :null => false
    t.time     "end_time",      :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "volunteering_schedules", ["account_id"], :name => "index_volunteering_schedules_on_account_id"

  create_table "volunteering_time_entries", :force => true do |t|
    t.integer "record_id",  :null => false
    t.date    "week",       :null => false
    t.integer "account_id"
  end

  add_index "volunteering_time_entries", ["account_id"], :name => "index_volunteering_time_entries_on_account_id"

  create_table "volunteering_time_entry_days", :force => true do |t|
    t.integer  "time_entry_id",                               :null => false
    t.string   "day"
    t.decimal  "hours",         :precision => 4, :scale => 2
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "account_id"
  end

  add_index "volunteering_time_entry_days", ["account_id"], :name => "index_volunteering_time_entry_days_on_account_id"

end
