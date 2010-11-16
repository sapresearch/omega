Omega::Calendar::Module.routes.draw do

  #match 'calendars' => 'calendars#index'


  resources :calendars do
    resources :events
    collection do
      get :administer
    end
  end


#  resources :events
  resources :form_builders
end
