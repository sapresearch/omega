Omega::Services::Tram.routes.draw do |map|

  scope :path => 'services', :name_prefix => 'service', :module => 'services' do
    resources :fields
    resources :fieldvalues
    resources :registrations do
        collection do
          get :my_registrations
        end
      end
    resources :types
    resources :typefields
    resources :services_types

  end

  resources :services do
    scope :name_prefix => 'service', :module => 'services' do
      resources :fields
      resources :fieldvalues
      resources :registrations
      resources :types
      resources :typefields
      resources :services_types
    end
    collection do
      get :export_to_csv
      get :new_import
      get :new_custom_service
      get :get_type
      get :type_def
      get :service_wizard
      get :finalize
      get :add_field
      get :add_registration_field
      get :remove_field
    end

  end

  resources :imports

  map.connect 'services/:action/:id', :controller => 'services'


  
end
