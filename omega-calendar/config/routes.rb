Omega::Calendar::Module.routes.draw do

  #match 'calendars' => 'calendars#index'


  resources :calendars do
    resources :events
    resources :shares, :as => :calendar_shares, :module => :calendars
    collection do
      get :administer
    end
    member do
      get :share
    end
  end

  scope "/users/:user_id" do
    resources :calendars
  end


#  resources :events
  resources :form_builders
end
