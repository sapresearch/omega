Omega::Tram.routes.draw do
  resources :sessions do
    collection do
      delete :destroy
    end
  end
  
  resources :users do
    collection do
      get :register
    end
  end

  resources :roles
  resources :permissions, :only => [:index, :show]
  
  root :to => 'home#index'

  namespace :contacts, :singular_path => true do
    root :to => 'contacts#index'
  end
end