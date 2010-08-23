Omega::Calendar::Tram.routes.draw do

  #match 'calendars' => 'calendars#index'

  
  resources :calendars
  resources :events
  resources :form_builders
end
