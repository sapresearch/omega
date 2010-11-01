Omega::Groups::Module.routes.draw do
  resources :groups do
    resources :threads, :module => 'group' do
      resources :posts
    end
    
    member do

      get :assign

      put :assign_user_to, :path => 'assign/:user_id'
      put :remove_user_from, :path => 'remove/:user_id'
    end
    collection do
      get :autocomplete

      match ':letter' => 'groups#letter', :constraints => {:letter => /[a-z]/i}
    end

  end
end