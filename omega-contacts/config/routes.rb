Omega::Contacts::Tram.routes.draw do
  scope :path => 'contacts', :name_prefix => 'contact', :module => 'contacts' do
    resources :groups
    resources :households
    resources :organizations
    resources :skills
    resources :interests
  end

  resources :contacts do
    collection do
      get :all
      get :search

      get :autocomplete
      match ':letter' => 'contacts#letter', :constraints => { :letter => %r[\w]}
    end

    scope :name_prefix => 'contact', :module => 'contacts' do
      resources :groups do
        member do
          put :assign
          put :remove
        end
      end
    end
  end

  match 'contacts/:action' => 'contacts#search'

  end