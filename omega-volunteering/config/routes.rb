Omega::Volunteering::Tram.routes.draw do
  namespace :volunteering do
    resources :positions
    resources :schedules
    resources :days
  
    resources :records do
      resources :time_entries
    end

#    root :to => 'index'
  end
end