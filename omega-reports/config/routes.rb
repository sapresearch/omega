Omega::Reports::Module.routes.draw do  
  match 'reports/print_file' => 'reports#print_file'
  match 'reports/show' => 'reports#show'
  resources :reports
end
