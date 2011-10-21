Omega::Contacts::Module.routes.draw do
  scope :path => 'contacts', :as => 'contact', :module => 'contacts' do
    resources :groups
    resources :households
    resources :organizations
    resources :skills do
      collection do
        get :suggest
      end
    end
	 resources :fields
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

  end
