Omega::Services::Module.routes.draw do
  resources :services 
  resources :service_registrations
  resources :service_sections
  
  resources :roles do
    collection do
      put :restore_role_permission_associations
    end
    member do
      put :update_permission
    end
  end

  resources :asset_allocations do
    collection do
      get :show_services_for_asset
      get :show_assets_for_service
    end
  end
end

