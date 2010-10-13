Omega::Services::Tram.routes.draw do

  scope :path => 'services', :as => 'service', :module => 'services' do
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
     collection do
      get :retrieve_existing_type
      get :define_service_type
      match :service_wizard, :to => 'services#service_wizard', :path => 'wizard/step/:step'
      match :finalize, :to => 'services#finalize', :path => 'finalize/:id'
      match :modify_service, :to => 'services#modify_service', :path => 'modify_service/:id'
      get :show_drafts
      get :add_service_field
      get :add_registration_field
      get :remove_field
       
     end

    scope :as => 'service', :module => 'services' do
      resources :fields
      resources :fieldvalues
      resources :registrations
      resources :types
      resources :typefields
      resources :services_types
    end


  end

  
end
