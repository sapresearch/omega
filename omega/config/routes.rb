Omega::Tram.routes.draw do
  resources :sessions do
    collection do
      delete :destroy
    end
  end
  
  resources :users do
    collection do
      get :register
       get :autocomplete
    end
  end

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
  match 'product' => 'home#product'
end