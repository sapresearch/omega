Omega::Groups::Module.routes.draw do
  resources :groups
  resources :groups_requesters
  resources :groups_members do
    collection do
      post :add
      delete :remove
    end
  end
end