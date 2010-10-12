Omega::Volunteering::Tram.routes.draw do
  namespace :volunteering do
    resources :positions do
      collection do
        get :scheduler
        get :upcoming
        get :mine
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
        get :my_applications
        get :pending
        get :newest
        get :completed
        get :admin_page

      end
      member do
        get :administer
      end
      member do
        get :withdraw
      end
      member do
        get :history
      end
    end
    resources :time_entries


    root :to => 'volunteering#index', :as => ''
  end
end