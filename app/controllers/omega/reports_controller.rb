module Omega
	class ReportsController < Controller
	  #require_permission Volunteering::PERM_ADMIN
	
	  require "report_app_adapter.rb"
	  include ReportAppAdapter
	  before_filter :init_data_feeds, :only=>[:index, :show]
	  
	  def index
	  end
	
	  def show
	    session[:report_partial_name] = params[:report_partial_name]
	  end
	
	  # note: alternative use wicked_pdf layout
	  def print_file
	    @head_html = params[:head_html]
	    @report_html = params[:report_html]
	
	    render :pdf => "omega_report",
	           :layout => 'report_pdf.html',
	           :template => "reports/print_file_template.pdf.erb"
	  end
	
	end
end
