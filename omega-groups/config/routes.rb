Omega::Groups::Module.routes.draw do
  resources :groups do
    #resources :topics
    member do
      get :space
    end    
  end
  resources :posts
  resources :topics
  resources :groups_requesters
  resources :groups_members do
    collection do
      post :add
      delete :remove
    end
  end
  
end