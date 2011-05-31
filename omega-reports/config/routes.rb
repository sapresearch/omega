Omega::Reports::Module.routes.draw do  
  match 'reports' => 'reports#index'
  match 'reports/print_file' => 'reports#print_file'
  match 'reports/show' => 'reports#show'
  resource :reports
end
