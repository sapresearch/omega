Omega::Engine.routes.draw do
    #match 'calendars' => 'calendars#index'


    resources :calendars do
      resources :events
      resources :shares, :as => :calendar_shares, :module => :calendars
      collection do
        get :administer
      end
      member do
        get :share
      end
    end

    scope "/users/:user_id" do
      resources :calendars
    end


  #  resources :events
    resources :form_builders

  scope :path => 'contacts', :as => 'contact', :module => 'contacts' do
    resources :groups
    resources :households
    resources :organizations
    resources :skills do
      collection do
        get :suggest
      end
    end
	 resources :fields do
    	member do
			get :edit
		end
	 end
    resources :interests

    resources :imports do
      collection do
        match :csv_import_wizard, :to => 'imports#csv_import_wizard', :path => 'wizard/step/:step'
        post :update_csv
        get :undo_import
        get :get_import_data
        get :get_import_mapping
        get :undo_import_finalize
        get :redo_mapping
        get :delete_forever
        get :draft_import
        get :redo_import
        get :redo_import_finalize
      end
    end

  end

  resources :contacts do
    collection do
      get :all
      get :search
      get :list
      get :autocomplete
      match :letter, :path => ':letter', :constraints => { :letter => /[a-z]/i }
    end

    member do
      get  :upload
      post :do_upload
    end

    scope :as => 'contact', :module => 'contacts' do
      resources :groups do
        member do
          put :assign
          put :remove
          put :move, :path => 'move/:to_id'
        end
      end




  end
  end


  match 'contacts/:action' => 'contacts#search'

  resources :groups do
		member do
			get :space
		end
	end
	resources :posts
	resources :topics
  resources :groups_requesters
  resources :groups_members do
    collection do
      post :add
      delete :remove
    end
  end

  match 'reports/print_file' => 'reports#print_file'
  match 'reports/show' => 'reports#show'
  resources :reports

  namespace :volunteering do
    resources :positions do
      collection do
        get :scheduler
        get :upcoming
        get :mine
        get :my_time_sheets

        get :skills
        get :interests

        resources :skills, :only => [:index, :edit, :update, :destroy]
        resources :interests, :only => [:index, :edit, :update, :destroy]
      end

      member do
        get :history
      end
    end

    resources :schedules
    resources :days

    resources :records do
      collection do
        get :my_applications
        get :pending
        put :create_volunteer
        get :newest
        get :completed
        get :admin_page
        get :new_volunteer
        get :enroll_volunteers
		  post :create_single
		  put :update_status
        post :create_multiple
		  post :message_volunteer
        get :summary
        get :user_history, :path => 'user_history/:contact_id'
		  get :zip_search
      end

      member do
        get :administer
        get :withdraw
      end
    end

    resources :time_entries do
    	collection do
    		get :all_timesheets
    		get :new_timesheets
    		get :summary
    	end
    end



    root :to => 'volunteering#index', :as => ''
  end

  resources :services   
  resources :service_sections
  resources :service_registrations do
    collection do
      post :paypal_return
      get :paypal_cancel_return
    end
  end
  
  resources :roles do
    collection do
      put :restore_role_permission_associations
    end
    member do
      put :update_permission
    end
  end

  resources :assets
  resources :asset_allocations

  resources :payments do
    collection do
      post :ipn_handler
    end
  end
  
  
  resources :favorites, :only => [:index, :show] do
    collection do
      match :add,    :path => 'add/*klass/:id',    :as => 'add_to'
      match :remove, :path => 'remove/*klass/:id', :as => 'remove_from'
    end
  end

  namespace :favorites do
    get :of_klass, :path => '*klass'
  end

  resources :uploads do

  end

  resources :images do
    collection do
   	get :edit_logo
   	put :update_logo
   end
  end

  resources :sessions do
    collection do
      delete :destroy
    end

    collection do
      get :token, :path => 'new/:token'
    end
  end

	resources :settings do
		collection do
			put :update
			get :edit
		end
	end

  resources :users do
	 member do
		get :my_page
		put :update_my_page
	 end
    collection do
      get :register
      post :join, :path => 'register'
      get :autocomplete
      get :role_assignment
      match :letter, :path => ':letter', :constraints => { :letter => /[a-z]/i }
    end
  end

  match 'lost_username' => 'users#lost_username'
  match 'lost_password' => 'users#lost_password'

  resources :roles
  resources :permissions, :only => [:index, :show]

  resources :messages, :except => [:edit] do
    collection do
      get :sent
    end

    member do
      get :reply
      get :forward
    end
  end

  root :to => 'home#index'

  scope :path => 'form_builder', :controller => :form_builder do
    get :dispatch_ui_element, :path => 'dispatch_ui_element/:element'
    get :dispatch_element_properties, :path => 'dispatch_element_properties/:element'
  end

  resources :pages, :glob_id => true do
    resources :blocks
    resources :components
  end
  resources :blocks
  resources :components

  scope :module => 'omega' do
    match '*url' => '#not_found'
  end
end
