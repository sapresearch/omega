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
			post :new
			get :edit
			put :update_email
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
