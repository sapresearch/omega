Omega::Reports::Module.routes.draw do
  match 'reports' => 'reports#index'
  resource :reports
end
