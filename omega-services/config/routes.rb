Omega::Services::Module.routes.draw do
  resources :services   
  resources :service_sections
  resources :service_registrations
  
  resources :roles do
    collection do
      put :restore_role_permission_associations
    end
    member do
      put :update_permission
    end
  end

  resources :assets

  resources :asset_allocations do
    collection do      
    end
  end

  resources :payments do
    collection do
      get :ipn_handler
    end
  end
end

