Omega::Services::Module.routes.draw do
  resources :services 
  resources :service_registrations
  resources :service_sections
end

