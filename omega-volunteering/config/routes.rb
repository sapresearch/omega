Omega::Volunteering::Tram.routes.draw do
  namespace :volunteering do
    resources :positions do
      collection do
        get :scheduler
        get :upcoming
        get :my_positions
        get :my_time_sheets

        get :skills, :path => 'skills/:skills'
        get :interests, :path => 'interests/:interests'

        resources :skills, :only => [:index, :edit, :update, :destroy]
        resources :interests, :only => [:index, :edit, :update, :destroy]
      end
    end
    
    resources :schedules
    resources :days

    resources :records do
      collection do
        get :new_all
        get :pending_all
        get :complete_all
        get :admin_page
        get :admin_action
      end
    end
    resources :time_entries


    root :to => 'volunteering#index', :as => ''
  end
end