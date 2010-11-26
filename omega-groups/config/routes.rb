Omega::Groups::Module.routes.draw do
  resources :groups do
    
    member do

      get :assign
      put :assign_user_to, :path => 'assign/:user_id'
      put :remove_user_from, :path => 'remove/:user_id'
    end

    collection do
      get :autocomplete

      match :letter, :constraints => {:letter => /[a-z]/i}
    end

    scope :module => 'groups' do
      resources :threads do
        resources :posts
      end

      resources :uploads
    end
  end
end