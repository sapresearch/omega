require 'csv'

class Contacts::ImportsController < Omega::Controller

  respond_to :html, :js, :json, :xml
  
  def csv_import_wizard

     if params[:step] == '1'
       session[:rows_id] = nil
     end

     if params[:step] == '2'
       @import = Contact::Import.new
     end
     
     @contact_fields = get_omega_contact_fields
     @contact_fields.compact!
     @mapping = get_mapping_hash

     unless session[:rows_id].nil?
       @rows = Contact::DataImport.find(session[:rows_id]).csv_rows
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
        render "contacts/imports/step_3"

       when '4'

        session[:current_page] = "import"

        @old_rows = Contact::DataImport.find(session[:rows_id]).csv_rows
        @rows = Contact::DataImport.find(session[:rows_id]).mapped_rows

        render "contacts/imports/step_4"
         
     end
  end

  def show
  end

  def new
      @import = Contact::Import.new
  end

  def create

    @import = Contact::Import.create(params[:contact_import])

    process_csv(@import)

    if params[:upload]
       redirect_to csv_import_wizard_contact_imports_url(:step => 3)
    end

  end

  def update_csv

    @rows = Contact::DataImport.find(session[:rows_id]).csv_rows

    if params[:discard]
    
    @discard_columns = Array.new

        params[:mapping].each do |k,v|

            if v["discard"] == "1"
               @discard_columns << v["column"].to_i
            end
        end

    @discard_columns = @discard_columns.sort {|x,y| y <=> x }

    @discard_columns.each do |c|
        @rows.each do |row|
           row.delete_at(c)
        end
    end

    @csv_rows = Contact::DataImport.find(session[:rows_id])
    @csv_rows.update_attributes(:csv_rows => @rows)

    redirect_to csv_import_wizard_contact_imports_url(:step => 3)

    end

    if params[:next]

      @rows = Contact::DataImport.find(session[:rows_id]).csv_rows

      params[:csv_field].each do |k,v|

        @rows[0].each do |column|

        unless column.nil?

          if k == column
            index = @rows[0].index(k)
            @rows[0][index] = v
          end
        end
        end
      end

      @csv_rows = Contact::DataImport.find(session[:rows_id])
      @csv_rows.update_attributes(:mapped_rows => @rows)

      case session[:current_page]

      when 'mapping'
         redirect_to csv_import_wizard_contact_imports_url(:step => 4)
      when 'upload'
         redirect_to csv_import_wizard_contact_imports_url(:step => 3)
      when 'import'
        redirect_to csv_import_wizard_contact_imports_url(:step => 4)

      end

      session[:column] = params[:column]

    end

    if params[:import]

      @contacts = Array.new
      
      @rows = Contact::DataImport.find(session[:rows_id]).mapped_rows
      @rows.shift

      @rows.each do |row|

        @contact = Contact.new
        @contact.phone_numbers.build
        @contact.addresses.build

        session[:column].each do |k,v|

          @contact[k] = row[v.to_i]

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

  def undo_import

  @imports = Contact::DataImport.all.collect{ |c| [c.created_at] unless c.status == 'draft'}

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

    CSV.foreach(csv) do |r|
      rows << r
    end
    
    rows
    
  end

  def get_omega_contact_fields

    @contacts = Array.new
    @contacts << "Do Not Import"

    Contact.columns.collect { |c| [c.name] unless c.name == "id"  || c.name == "created_at" || c.name == "updated_at" || c.name == "status"  }.each do |c|
      @contacts << c
    end

    @phones = Contact::PhoneNumber.columns.collect { |c| [c.name] unless c.name == "id" || c.name == "contact_id" || c.name == "created_at" || c.name == "updated_at" }
    @address = Contact::Address.columns.collect { |c| [c.name] unless c.name == "id" || c.name == "created_at" || c.name == "updated_at"}

    @contacts | @phones | @address

  end

  def get_mapping_hash
    
    @mapping = {     "title" => ['Individual Prefix', 'Prefix', 'Salutation', 'salutation' 'Title', 'prefix', 'individual prefix', 'title'],
                     "first_name" => ['First Name', 'First name', 'First_name', 'first_Name', 'first name', 'firstname', 'Firstname', 'first_name'],
                     "last_name" => ['Last Name', 'Last name', 'Last_name', 'last_Name', 'last name', 'lastname', 'Lastname', 'last_name', 'last_name'],
                     "number_type" => ['phone type', 'phone_type', 'Phone_Type', 'Phone Type', 'Number Type', 'number_type'],
                     "address_type" => ['address type', 'address_type', 'Address_Type', 'Address Type', 'Address type', 'address_type'],
                     "number" => ['phone', 'Phone', 'Phone Number', 'Number', 'Phone number', 'number', 'telephone', 'Telephone'],
                     "contact_type" => ['contact type', 'Contact Type', 'Contact_type', 'contact_Type'],
                     "city" => ['City', 'city'],
                     "zip_code" => ['Postal Code', 'Postal code', 'postal_code', 'Postal_code', 'Zip code', 'Zip', 'zip', 'zip_code'],
                     "state" => [ 'State', 'Province', 'province', 'state'],
                     "street" => [ 'Street', 'street', 'street name', 'Street Name'],
                     "country" => ['Country', 'country'],
                     "email" => ['Email', 'e-mail', 'E-mail', 'email'],
                     "do_not_email" => ['Do Not Email'],
                     "do_not_phone" => ['Do Not Phone'],
                     "do_not_mail" => ['Do Not Mail'],
                     "do_not_sms" => ['Do Not Sms'],
                     "no_bulk_emails" => ['No Bulk Emails'],
                     "nick_name" => ['Nick Name', 'nickname'],
                     "legal_name" => ['Legal Name'],
                     "middle_name" => ['Middle Name'],
                     "preferred_communication_method" => ['Preferred Communication Method'],
                     "preferred_language" => ['Preferred Language'],
                     "date_of_birth" => ['Birth Date'],
                     "deceased_date" => ['Deceased Date'],
                     "gender" => ['Gender'],
                     "individual_suffix" => ['Individual Suffix']

    }
  end
end
