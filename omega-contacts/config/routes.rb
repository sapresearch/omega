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
    resources :interests

    resources :imports do
      collection do
        get :csv_import_wizard
      end
    end

  end

  resources :contacts do
    collection do
      get :all
      get :search

      get :autocomplete
      match ':letter' => 'contacts#letter', :constraints => { :letter => /[a-z]/i}
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