Omega::Module.routes.draw do
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
end