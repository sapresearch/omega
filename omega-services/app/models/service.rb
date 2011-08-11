class Service < ActiveRecord::Base
  # app-spec
  PERM_ADMIN       = 'service_admin'
  PERM_APPLY       = 'service_apply'
  PERM_EDIT_ADMIN  = 'service_edit_admin'
  PERM_EDIT_USER   = 'service_edit_user'
  PERM_VIEW        = 'service_view'
  # end app-spec

  ROOT_SUPER_SERVICE_ID = 'root'
  LEAF_LEVEL = "leaf"
  BRANCH_LEVEL = "branch"

  belongs_to :super_service, :class_name => "Service"
  has_many :sub_services, :class_name => "Service", :foreign_key => "super_service_id", :dependent => :destroy, :order => "name"
  has_one :service_detail_form, :dependent => :destroy
  has_one :service_detail_template, :through => :service_detail_form
  has_one :service_registration_form, :dependent => :destroy
  has_one :service_registration_template, :through => :service_registration_form
  has_one :service_leaf, :dependent => :destroy
  has_many :service_registrations, :through => :service_leaf
  has_many :service_sections, :through => :service_leaf

  accepts_nested_attributes_for :service_leaf

  # abstraction layer functions for different implementation in database
  class << self
    def new_with_dependency
      service = Service.new
      service_leaf = service.build_service_leaf
      service_section = service_leaf.service_sections.build
      service_section.build_event
      service
    end

    def open?
      service_roots.each{|sr|return true if sr.status=="public"}
      false
    end

    def service_leaves
      ServiceLeaf.all.map{|sl|sl.service}
    end

    def real_public_service_leaves
      ServiceLeaf.all.inject([]){|r, sl|s=sl.service; r<<s if s.is_real_public?; r}
    end

    #avoid direct iteration for performance
    def real_public_services(service=nil)
      services = service.nil? ? Service.service_roots : service.sub_services
      services = services.select{|s| s.is_public? }
      services_tmp = services[0, services.length]
      services_tmp.each{|s| services.concat(Service.real_public_services(s))}
      services
    end

    def public_services
      Service.where(:status=>"public").order(:name)
    end

    def private_services
      Service.where(:status=>"private").order(:name)
    end

    def service_roots
      Service.where(:super_service_id => nil).order(:name)
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
    not service_leaf.nil?
  end

  def is_end?
    sub_services.empty?
  end

  def is_ancestor_of?(service)
    return false if is_end? || service.is_root?
    service.super_service == self ? true : is_ancestor_of?(service.super_service)
  end

  def is_descendant_of?(service)
    return false if is_root? || service.is_end?
    super_service == service ? true : super_service.is_descendant_of?(service)
  end

  def sibling_services
    is_root? ? Service.service_roots : super_service.sub_services
  end

  def super_service_id
    is_root? ? ROOT_SUPER_SERVICE_ID : super_service.id
  end

  def is_real_public?
    is_root? ? status=="public" : (status=="public" && super_service.is_real_public?)
  end
  
  def is_public?
    status=="public"
  end

  def is_private?
    status=="private"
  end

  # should we consider publish all parent services?
  def publish(recursive)
    transaction do
      update_attribute("status", "public")
      sub_services.each{|s|s.publish(true)} if recursive
    end
  end

  def unpublish(recursive)
    transaction do
      update_attribute("status", "private")
      sub_services.each{|s|s.unpublish(true)} if recursive
    end
  end

  def detail_html
    return nil if service_detail_form.nil?
    service_detail_form.html.html_safe
  end

  def detail_field_values
    return nil if service_detail_form.nil?
    service_detail_form.field_values
  end

  def detail_field_values_hash
    return nil if service_detail_form.nil?
    ActiveSupport::JSON.decode(service_detail_form.field_values)
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
