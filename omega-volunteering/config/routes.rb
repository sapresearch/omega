Omega::Volunteering::Tram.routes.draw do
  namespace :volunteering do
    resources :positions do
      collection do
        get :scheduler
        get :upcoming

        get :skills, :path => 'skills/:skills'
        get :interests, :path => 'interests/:interests'
      end
    end
    
    resources :schedules
    resources :days

    resources :records
    resources :time_entries
  end
end