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

  resources :messages, :except => [:edit] do
    collection do
      get :sent
    end
  end
  
  root :to => 'home#index'
  match 'product' => 'home#product'
end