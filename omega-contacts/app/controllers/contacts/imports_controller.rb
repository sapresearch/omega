require 'csv'
require 'iconv'

class Contacts::ImportsController < Omega::Controller

  respond_to :html, :js, :json, :xml

  def csv_import_wizard

     if params[:step] == '1'
       session[:rows_id] = nil
       session[:errors] = nil
       session[:last_page] = nil
     end

     if params[:step] == '2'
       @import = Contact::Import.new
     end

     @contact_fields = get_omega_contact_fields
     @contact_fields.compact!

     @mapping = get_mapping_hash

     unless session[:rows_id].nil?
       @csv_rows = Contact::DataImport.find(session[:rows_id]).csv_rows
     end

     case params[:step]

       when '1'

        session[:current_page] = "intro"
        render "contacts/imports/step_1"

       when '2'

        session[:current_page] = "upload"
        render "contacts/imports/step_2"

       when '3'

        session[:current_page] = "mapping"

        @csv_rows = Contact::DataImport.find(session[:rows_id]).csv_rows
        @mapped_rows = Contact::DataImport.find(session[:rows_id]).mapped_rows

        if @mapped_rows.nil?
          @csv_mapping = Hash[*@csv_rows[0].zip(@csv_rows[0]).flatten]

        else
          @csv_mapping = Hash[*@csv_rows[0].zip(@mapped_rows[0]).flatten]

        end

        render "contacts/imports/step_3"

       when '4'

        session[:current_page] = "import"

        @csv_rows = Contact::DataImport.find(session[:rows_id]).csv_rows
        @mapped_rows = Contact::DataImport.find(session[:rows_id]).mapped_rows

        render "contacts/imports/step_4"

     end
  end

  def index

    @imports = Contact::DataImport.all

  end

  def show

  end

  def new

    @import = Contact::Import.new

  end

  def create

    @import = Contact::Import.create(params[:contact_import])

    if params[:upload]

      if @import.valid?
        process_csv(@import)
        redirect_to csv_import_wizard_contact_imports_url(:step => 3)
      else
        session[:errors] = @import.errors.full_messages
        redirect_to csv_import_wizard_contact_imports_url(:step => 2)
      end

      else if params[:next]

        if session[:rows_id].nil?
          redirect_to csv_import_wizard_contact_imports_url(:step => 2)
        else
          redirect_to csv_import_wizard_contact_imports_url(:step => 3)
        end

      end
    end

  end

  def update_csv

    if params[:next]

      session[:last_page] = "preview"
      @rows = Contact::DataImport.find(session[:rows_id]).csv_rows

      params[:csv_field].each do |k,v|
            index = @rows[0].index(k)
            @rows[0][index] = v
      end

      @csv_rows = Contact::DataImport.find(session[:rows_id])

      @csv_rows.update_attributes(:mapped_rows => @rows, :mapping => params[:csv_field])

      case session[:current_page]

      when 'mapping'
         redirect_to csv_import_wizard_contact_imports_url(:step => 4)
      when 'upload'
         redirect_to csv_import_wizard_contact_imports_url(:step => 3)
      when 'import'
        redirect_to csv_import_wizard_contact_imports_url(:step => 4)

      end

    end

    if params[:import]

      @previous_import = Contact::DataImport.find(session[:rows_id])

      if @previous_import.status == 'redo mapping'

        unless @previous_import.contact_ids.nil?
          @previous_import.contact_ids.each do |c|
          unless c.nil?
            contact = Contact.find(c)
            contact.destroy
          end
        end
        end

      end

      @contacts = Array.new

      @rows = Contact::DataImport.find(session[:rows_id]).mapped_rows
      @mapping = Contact::DataImport.find(session[:rows_id]).mapping

      fields_index = Hash.new

       @mapping.each do |k,v|
          index = @rows[0].index(v)
          fields_index[v] = index
        end

      @rows.shift

      @rows.each do |row|

        @contact = Contact.new
        @group = Contact::Group.new

        @contact.phone_numbers.build
        @contact.addresses.build

        @group.phone_numbers.build
        @group.addresses.build

        fields_index.each do |k,v|

          @contact[k] = row[v.to_i]                
          @group[k] = row[v.to_i]

          if k == 'group_name'
            @group['group_type'] = 'Household'
          end
          
          @cols = Contact::PhoneNumber.columns.collect { |c| [c.name] }

          @cols.each do |c|
            if c.include?(k)
              @contact.phone_numbers[0][k] = row[v.to_i]
            end
          end

          @cols = Contact::Address.columns.collect { |c| [c.name] }

          @cols.each do |c|
            if c.include?(k)
              @contact.addresses[0][k] = row[v.to_i]
            end
          end

        end

        @contact.save(:validate => false)
        @group.save(:validate => false)

        @contact_group = Contact::GroupPosition.create(:contact_id => @contact.id, :group_id => @group.id)
        @contacts << @contact.id

      end

      @rows = Contact::DataImport.find(session[:rows_id]).mapped_rows

      @rows[0].each do |c|

        if c.include?("Do Not Import")
          index = @rows[0].index(c)
          @rows.each do |r|
            r.delete_at(index.to_i)
          end
        end
      end

      @imported_rows = Contact::DataImport.find(session[:rows_id])
      @imported_rows.update_attributes(:status => 'complete', :imported_rows => @rows, :contact_ids => @contacts)
      redirect_to contact_imports_url()

    end
  end

   def get_import_data

      @import = Contact::DataImport.find_by_created_at(params[:created_at])

      if params[:filter] == 'import_filter_By_Mapping'
        render :partial => "get_import_mapping"

        else if params[:filter] == 'import_filter_By_Data'
          @contacts = @import.contact_ids
          render :partial => "get_import_data"
        end
      end

   end

  def draft_import
    
    @import = Contact::DataImport.find_by_created_at(params[:created_at])
    render :partial => "draft_import"

  end

  def undo_import

    @imports = Contact::DataImport.all.collect{ |c| [c.created_at.utc.strftime('%Y-%m-%d %H:%M:%S')] unless c.status == 'draft' || c.status == 'deleted'}
    @imports.compact!

  end
  
  def undo_import_finalize

    @import = Contact::DataImport.find(params[:id])
    @import.update_attributes(:status => 'deleted')

    @import.contact_ids.each do |c|
      contact = Contact.find_by_id(c)
      contact.status = 'deleted'
      contact.save(:validate => false)
    end

    redirect_to contact_imports_url()
    
  end

  def redo_mapping

    @import = Contact::DataImport.find(params[:id])
    @import.update_attributes(:status => 'redo mapping')

    session[:rows_id] = @import.id
    redirect_to csv_import_wizard_contact_imports_url(:step => 3)

  end

  def redo_import

    @import = Contact::DataImport.find_by_created_at(params[:created_at])
    render :partial => 'redo_import_data'

  end

  def redo_import_finalize

    @import = Contact::DataImport.find(params[:id])
    @import.update_attributes(:status => 'complete')

    @import.contact_ids.each do |c|
      contact = Contact.find(c)
      contact.status = nil
      contact.save(:validate => false)
    end

    redirect_to contact_imports_url()

  end

  def delete_forever

    @import = Contact::DataImport.find(params[:id])

    unless @import.contact_ids.nil?
      @import.contact_ids.each do |c|
        contact = Contact.find_by_id(c)
        contact.status = 'deleted'
        contact.save(:validate => false)
      end
    end

    @import.destroy

    redirect_to contact_imports_url()

  end

  private #---------------------------------------------------------------------------------------------------

  def process_csv(import)

     rows = parse_csv(import.csv.path)

      if rows.size > 0

        import.update_attributes(:processed => rows.size)
        @csv_rows = []

        rows.each do |r|
          @csv_rows << r
        end

      end

      @rows = Contact::DataImport.create(:csv_rows => @csv_rows, :status => 'draft')
      session[:rows_id] = @rows.id

  end

  def parse_csv(csv)

    rows = []

    CSV.foreach(csv) do |row|
      rows << row
    end

    encoded_rows = []

    rows.each do |r|
      row = []

      r.each do |c|
        row << Iconv.new('UTF-8//IGNORE', 'UTF-8').iconv(c.to_s + ' ')[0..-2]
      end

      encoded_rows << row
    end

    encoded_rows

  end

  def get_omega_contact_fields

    @contacts = Array.new
    @contacts << ["Do Not Import" , "Do Not Import"]

    Contact.columns.collect { |c| [c.name.humanize, c.name] unless c.name == "id"  || c.name == "created_at" || c.name == "updated_at" || c.name == "status"  }.each do |c|
      @contacts << c
    end

    @phones = Contact::PhoneNumber.columns.collect { |c| [c.name.humanize, c.name] unless c.name == "id" || c.name == "contact_id" || c.name == "created_at" || c.name == "updated_at" }
    @address = Contact::Address.columns.collect { |c| [c.name.humanize, c.name] unless c.name == "id" || c.name == "created_at" || c.name == "updated_at"}
    @group = Contact::Group.columns.collect { |c| [c.name.humanize, c.name] unless c.name == "id" || c.name == "created_at" || c.name == "updated_at"}


    @contacts | @phones | @address | @group

  end


  def get_mapping_hash

    @mapping = {     "title" => ['Individual Prefix', 'Prefix', 'Salutation', 'salutation', 'Title', 'prefix', 'individual prefix', 'title'],
                     "first_name" => ['First Name', 'First name', 'First_name', 'first_Name', 'first name', 'firstname', 'Firstname', 'first_name'],
                     "last_name" => ['Last Name', 'Last name', 'Last_name', 'last_Name', 'last name', 'lastname', 'Lastname', 'last_name', 'last_name'],
                     "number_type" => ['phone type', 'phone_type', 'Phone_Type', 'Phone Type', 'Number Type', 'number_type'],
                     "address_type" => ['address type', 'address_type', 'Address_Type', 'Address Type', 'Address type', 'address_type'],
                     "number" => ['phone', 'Phone', 'Phone Number', 'Number', 'Phone number', 'number', 'telephone', 'Telephone'],
                     "contact_type" => ['contact type', 'Contact Type', 'Contact_type', 'contact_Type'],
                     "city" => ['City', 'city'],
                     "zip_code" => ['Postal Code', 'Postal code', 'postal_code', 'Postal_code', 'Zip code', 'Zip', 'zip', 'zip_code'],
                     "state" => [ 'State', 'Province', 'province', 'state'],
                     "street" => [ 'Street', 'street', 'street name', 'Street Name', 'Street Address'],
                     "country" => ['Country', 'country'],
                     "email" => ['Email', 'e-mail', 'E-mail', 'email', 'E-mail Address', 'e-mail address'],
                     "do_not_email" => ['Do Not Email'],
                     "do_not_phone" => ['Do Not Phone'],
                     "do_not_mail" => ['Do Not Mail'],
                     "do_not_sms" => ['Do Not Sms'],
                     "no_bulk_emails" => ['No Bulk Emails'],
                     "nick_name" => ['Nick Name', 'nickname'],
                     "legal_name" => ['Legal Name'],
                     "middle_name" => ['Middle Name'],
                     "preferred_communication_method" => ['Preferred Communication Method'],
                     "preferred_language" => ['Preferred Language', 'Language', 'language'],
                     "date_of_birth" => ['Birth Date', 'Birthday', 'birthday', 'DOB', 'dob', 'Date of Birth','date of birth'],
                     "deceased_date" => ['Deceased Date'],
                     "gender" => ['Gender', 'gender'],
                     "individual_suffix" => ['Individual Suffix', 'Suffix', 'suffix'],
                     "group_name" => ['household', 'Household', 'Household Name', 'household name', 'household_name', 'Household_name',
                                      'organization', 'Organization', 'Organization Name', 'organization name', 'organization_name', 'Organization_name',
                                      'group', 'Group', 'Group Name', 'group name', 'group_name', 'Group_name']

    }
  end
end
