Omega::Calendar::Module.routes.draw do

  #match 'calendars' => 'calendars#index'

  
  resources :calendars do
    resources :events
  end


#  resources :events
  resources :form_builders
end
