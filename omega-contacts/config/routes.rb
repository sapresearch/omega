Omega::Contacts::Tram.routes.draw do
  scope :path => 'contacts', :as => 'contact', :module => 'contacts' do
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

      match ':letter' => 'contacts#letter', :constraints => { :letter => /[A-Za-z]/}
    end

    scope :as => 'contact', :module => 'contacts' do
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
