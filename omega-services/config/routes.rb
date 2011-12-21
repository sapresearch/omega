Omega::Services::Module.routes.draw do
  resources :services   
  resources :service_sections
  resources :service_registrations do
    collection do
      get :paypal_return
      get :paypal_cancel_return
    end
  end
  
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
      post :ipn_handler
    end
  end
end

