Omega::Reports::Module.routes.draw do  
  match 'reports' => 'reports#index'
  match '/sandbox/reports/graph_code' => 'reports#graph_code'
  match 'reports/open_flash_chart' => 'reports#open_flash_chart'
  match 'reports/high_charts' => 'reports#high_charts'
  match 'reports/google_chart_tools' => 'reports#google_chart_tools'
  resource :reports
end
