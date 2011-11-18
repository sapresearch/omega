Omega::Groups::Module.routes.draw do
  resources :groups
  resources :groups_requesters
  resources :groups_members
end