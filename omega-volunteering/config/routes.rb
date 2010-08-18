Omega::Volunteering::Tram.routes.draw do
  namespace :volunteering do
    resources :positions
    resources :records do
      resources :time_entries
    end

    root :to => 'volunteering#index'
  end
end