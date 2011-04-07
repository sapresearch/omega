Omega::Services::Module.routes.draw do

  scope :path => 'services', :as => 'service', :module => 'services' do
    resources :fields
    resources :fieldvalues
    resources :registrations do
      collection do
        get :my_registrations
      end
    end
    
    resources :types do
    collection do
      match :service_wizard, :to => 'types#service_wizard', :path => 'wizard/step/:step'
      match :finalize, :to => 'types#finalize', :path => 'finalize/:id'
      match :modify_service, :to => 'types#modify_service', :path => 'modify_service/:id'
      get :retrieve_existing_type
      get :define_service_type
      get :service_create
      get :set_session
      get :show_drafts
      get :add_service_field
      get :add_registration_field
      get :remove_field
      get :service_preview
      
    end
    end
    
    resources :typefields
    resources :services_types

  end

  resources :services do
    collection do
      match :service_wizard, :to => 'services#service_wizard', :path => 'wizard/step/:step'
      match :modify_service, :to => 'services#modify_service', :path => 'modify_service/:id'
      match :finalize, :to => 'services#finalize', :path => 'finalize/:id'
      get :retrieve_existing_type
      get :define_service_type
      get :service_create
      get :set_session
      get :show_drafts
      get :add_service_field
      get :add_registration_field
      get :remove_field
      get :service_preview
      
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
