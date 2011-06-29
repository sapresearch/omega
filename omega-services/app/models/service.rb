class Service < ActiveRecord::Base
  # app-spec
  PERM_ADMIN       = 'service_admin'
  PERM_APPLY       = 'service_apply'
  PERM_EDIT_ADMIN  = 'service_edit_admin'
  PERM_EDIT_USER   = 'service_edit_user'
  PERM_VIEW        = 'service_view'
  # end app-spec

  belongs_to :super_service, :class_name => "Service"
  has_many :sub_services, :class_name => "Service", :foreign_key => "super_service_id", :dependent => :destroy
  has_one :service_detail_form, :dependent => :destroy
  has_one :service_detail_template, :through => :service_detail_form
  has_one :service_registration_form, :dependent => :destroy
  has_one :service_registration_template, :through => :service_registration_form
  has_one :service_leaf, :dependent => :destroy
  has_many :service_registrations, :through => :service_leaf

  # abstraction layer functions for different implementation in database
  class << self
    def service_leaves
      ServiceLeaf.all.map{|sl|sl.service}
    end
    def service_roots
      Service.where(:super_service_id => nil)
    end
    def services_with_detail_form
      ServiceDetailForm.all.map{|sdf|sdf.service}
    end
    def services_with_detail_template
      ServiceDetailTemplate.all.map{|sdt|sdt.service_detail_form.service}
    end
    def services_with_registration_form
      ServiceRegistrationForm.all.map{|srf|srf.service}
    end
    def services_with_registration_template
      ServiceRegistrationTemplate.all.map{|srt|srt.service_registration_form.service}
    end
  end

  def is_root?
    super_service.nil?
  end

  def is_leaf?
    ServiceLeaf.all.map{|sl|sl.service}.include?(self)
  end

  def detail_html
    return nil if service_detail_form.nil?
    service_detail_form.html.html_safe
  end

  def registration_html
    return nil if service_registration_form.nil?
    service_registration_form.html.html_safe
  end

  def has_service_detail_form?
    not service_detail_form.nil?
  end

  def has_service_registration_form?
    not service_registration_form.nil?
  end

  def has_service_detail_template?
    not service_detail_template.nil?
  end

  def has_service_registration_template?
    not service_registration_template.nil?
  end
  
  def default_service_with_detail_template
    return self if has_service_detail_template?
    return nil if super_service.nil?
    return super_service.default_service_with_detail_template 
  end

  def default_service_with_registration_template
    return self if has_service_registration_template?
    return nil if super_service.nil?
    return super_service.default_service_with_registration_template
  end
  
end
