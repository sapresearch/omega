class Service < ActiveRecord::Base
  require 'util.rb'
  
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

    def service_roots
      Service.where(:super_service_id => nil).order(:name)
    end
    alias_method :root_services, :service_roots

    def service_branches
      Service.all(:order=>:name) - service_leaves
    end
    alias_method :branch_services, :service_branches

    # returns service objects
    def service_leaves(order="name")
      ServiceLeaf.all.map{|sl|sl.service}.sort{|s1,s2|s1.send(order)<=>s2.send(order)}
    end
    alias_method :leaf_services, :service_leaves

    def real_public_service_leaves
      ServiceLeaf.all.inject([]){|r, sl|s=sl.service; r<<s if s.is_real_public?; r}
    end
    alias_method :real_public_leaf_services, :real_public_service_leaves

    #avoid direct iteration for performance
    def real_public_services(service=nil)
      services = service.nil? ? Service.service_roots : service.sub_services
      services = services.select{|s| s.is_public? }
      services_tmp = services[0, services.length]
      services_tmp.each{|s| services.concat(Service.real_public_services(s))}
      services
    end

    def public_services(order_by=:name)
      Service.where(:status=>"public").order(order_by)
    end

    def private_services(order_by=:name)
      Service.where(:status=>"private").order(order_by)
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

    # filter services of certain register type, or contains any service of certain register type from a collection of services
    def filter_by_register_type(services, register_type)
      selected_leaf_services = ServiceLeaf.all.select{|sl| sl.register_type==register_type}.map{|sl|sl.service}
      filtered_services = services.select do |s|
        (s.is_end? && !s.is_leaf?) || selected_leaf_services.include?(s) || begin
          val = false;
          selected_leaf_services.each do |es|
            if es.is_descendant_of?(s)
              val = true
              break
            end
          end
          val
        end
      end
      filtered_services
    end

    # all service pairs that conflict on any asset
    def time_conflicting_services_with_periods(assets=Asset.all, begin_at=Time.now, until_at=begin_at+1.year)
      leaf_service_conflicts = {}
      leaf_service_periods_unions = {}
      #leaf_services = assets.inject([]){|r, asset|asset.services.each{|s|r<<s unless r.include?(s)}; r}
#=begin
      leaf_services = []
      assets.each do |asset|
        unless asset.services.empty?
          leaf_services = Service.leaf_services
          break;
        end
      end
#=end
      return {} if leaf_services.length<2

      leaf_services.each{|ls|leaf_service_periods_unions[ls]=ls.periods_union(begin_at, until_at)} #pre-calculate all periods 
      remaining_leaf_service_combinations=leaf_services.to_combinations  # collection of possible combinations uncounted
      
      assets.each do |asset|        
=begin
        asset.services.to_combinations.each do |sc|         
          if leaf_service_conflicts[sc].nil?
            sc_a = sc.to_a
            periods_intersection = Event.periods_intersection([leaf_service_periods_unions[sc_a[0]], leaf_service_periods_unions[sc_a[1]]])
            leaf_service_conflicts[sc]=periods_intersection unless periods_intersection.empty?
            remaining_leaf_service_combinations.delete(sc)
            return leaf_service_conflicts if remaining_leaf_service_combinations.empty?
          end          
        end
=end
#=begin
        accounted_services = []
        asset.services.each do |leaf_service_1|
          accounted_services << leaf_service_1
          Service.leaf_services - accounted_services.each do |leaf_service_2|
            sc = [leaf_service_1, leaf_service_2].to_set
            if leaf_service_conflicts[sc].nil?
              sc_a = sc.to_a
              periods_intersection = Event.periods_intersection([leaf_service_periods_unions[sc_a[0]], leaf_service_periods_unions[sc_a[1]]])
              leaf_service_conflicts[sc]=periods_intersection unless periods_intersection.empty?
              remaining_leaf_service_combinations.delete(sc)
              return leaf_service_conflicts if remaining_leaf_service_combinations.empty?
            end
          end
        end
#=end
      end
      leaf_service_conflicts
    end

    # not in use
    # performance improvable
    # return the next happening service from the time on
    def next_service(time = Time.now)
      result_service=nil
      min_next_time=nil
      Service.leaf_services.each do |leaf_service|
        next_time = nil
        periods = leaf_service.periods_union
        periods.each do |period|
          next if period[0]<=time.to_i
          next_time = period[0]
          break
        end
        if (min_next_time.nil? && !next_time.nil?) || (!min_next_time.nil? && !next_time.nil? && min_next_time > next_time)
          min_next_time = next_time
          result_service = leaf_service
        end
      end
      result_service
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

  def block
    return unless is_leaf?
    service_leaf.block
  end

  def unblock
    return unless is_leaf?
    service_leaf.unblock
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

  # returns service objects
  def service_leaves
    return nil if is_leaf?
    sub_services.inject([]){ |r,s| s.is_leaf? ? r << s : r.concat(s.service_leaves) }
  end

  # return the type of majority service leaves in the parent category.
  def default_register_type
    return nil unless is_leaf?
    sample_service_leaves = is_root? ? Service.service_leaves : super_service.service_leaves
    count_hash = sample_service_leaves.map{|s|s.service_leaf}.inject({}){ |r,sl| r[sl.register_type].nil? ? r[sl.register_type]=1 : r[sl.register_type]+=1; r } # count the number of each type
    count_hash.keys.max{ |a,b| count_hash[a]<=>count_hash[b] } || "enrollable" # return the type with max value, if no type is defined return 'enrollable'
  end

  def accepted_registrants
    return nil unless is_leaf?
    service_leaf.accepted_registrants
  end

  def capacity
    return nil unless is_leaf?
    service_leaf.capacity
  end

  def assets(refresh=false)
    return nil unless is_leaf?
    service_leaf.assets(refresh)
  end

  def is_allocated_to?(asset)
    return nil unless is_leaf?
    service_leaf.assets.include?(asset)
  end

  def periods_union(begin_at=Time.now, until_at=begin_at+1.year)
    return nil unless is_leaf?
    service_leaf.periods_union(begin_at, until_at)
  end

  # not efficient for more than 2 services in a loop, repetitively calling periods_union
  def time_overlapping_periods_with(leaf_service, begin_at=Time.now, until_at=begin_at+1.year)
    return nil unless is_leaf?
    return service_leaf.time_overlapping_periods_with(leaf_service.service_leaf, begin_at, until_at)
  end

  def time_overlapping_services(asset=nil, begin_at=Time.now, until_at=begin_at+1.year)
    return nil unless is_leaf?
    result_services = []
    periods_union_1 = self.periods_union(begin_at, until_at) # this line only needs to run one time
    leaf_services = asset.nil? ? Service.leaf_services : asset.services
    leaf_services.delete_if{|s|s==self}.each do |service|
      periods_union_2 = service.periods_union(begin_at, until_at)
      periods_intersection = Event.periods_intersection([periods_union_1,periods_union_2])
      result_services << service unless periods_intersection.empty?
    end
    result_services
  end

  def time_overlapping_services_with_periods(asset=nil, begin_at=Time.now, until_at=begin_at+1.year)
    return nil unless is_leaf?
    overlapping_hash = {}
    periods_union_1 = self.periods_union(begin_at, until_at) # this line only needs to run one time
    leaf_services = asset.nil? ? Service.leaf_services : asset.services
    leaf_services.delete_if{|s|s==self}.each do |service|
      periods_union_2 = service.periods_union(begin_at, until_at)
      periods_intersection = Event.periods_intersection([periods_union_1,periods_union_2])
      overlapping_hash[service] = periods_intersection unless periods_intersection.empty?
    end
    overlapping_hash
  end

  def time_overlapping_service_ids_with_periods(asset=nil, begin_at=Time.now, until_at=begin_at+1.year)
    return nil unless is_leaf?
    overlapping_hash = {}
    periods_union_1 = self.periods_union(begin_at, until_at) # this line only needs to run one time
    leaf_services = asset.nil? ? Service.leaf_services : asset.services
    leaf_services.delete_if{|s|s==self}.each do |service|
      periods_union_2 = service.periods_union(begin_at, until_at)
      periods_intersection = Event.periods_intersection([periods_union_1,periods_union_2])
      overlapping_hash[service.id] = periods_intersection unless periods_intersection.empty?
    end
    overlapping_hash
  end

  # return the next happening service section from the time on
  def next_section(time = Time.now)
    return nil unless is_leaf?
    service_leaf.next_section(time)
  end
  alias_method :next_service_section, :next_section

  def next_event(time=Time.now)
    next_section(time).event
  end
  
end
