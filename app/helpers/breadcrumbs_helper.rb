	module BreadcrumbsHelper
	  def breadcrumbs
	    controller.breadcrumbs.collect do |text, url|
	      render('shared/breadcrumb', :text => text, :url => url)
	    end.join(render('shared/breadcrumb_spacer')).html_safe
	  end
	end
