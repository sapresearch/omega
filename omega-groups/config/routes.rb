Omega::Groups::Tram.routes.draw do
  scope :path => 'groups', :as => 'groups', :module => 'groups' do
    resources :groups
    resources :households
    resources :organizations
    resources :skills
    resources :interests
  end

  resources :groups do
    collection do
     
    end


    
  end

  match 'contacts/:action' => 'groups#search'

  end