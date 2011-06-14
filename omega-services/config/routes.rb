Omega::Services::Module.routes.draw do
  resources :service_categories
  resources :service_types do
    collection do
      #match :index, :to => "service_categories#index"
    end
  end
  resources :services do
    collection do
      #match :index, :to => "service_categories#index"
    end
  end
end

