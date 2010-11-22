require 'csv'

class Contacts::ImportsController < Omega::Controller

  respond_to :html, :js, :json, :xml
  
  def csv_import_wizard

     if params[:step] == '2'
       @import = Contact::Import.new
     end
     
     @contact_fields = get_omega_contact_fields
     @mapping = get_mapping_hash

     unless session[:rows_id].nil?
       @rows = Contact::DataImport.find(session[:rows_id]).rows

       logger.debug("Rows:#{@rows[0]}")
     end

     case params[:step]


       when '1'

        render "contacts/imports/step_1"
        session[:current_page] = nil
        session[:rows_id] = nil

       when '2'

        render "contacts/imports/step_2"
        session[:current_page] = "upload"
        session[:rows_id] = nil
         
       when '3'

        render "contacts/imports/step_3"
        session[:current_page] = "mapping"

       when '4'

        session[:current_page] = "import"

        @old_rows = Contact::DataImport.find(session[:rows_id]).rows
        @rows = Contact::DataImport.find(session[:rows_id]).new_rows

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

    @rows = Contact::DataImport.find(session[:rows_id]).rows

    if params[:update]

    @discard_columns = Array.new

        params[:mapping].each do |k,v|

            logger.debug("Mapping Key: #{k} ")
            logger.debug("Mapping Value: #{v} ")
            logger.debug("Mapping Discard: #{v["discard"]} ")
            logger.debug("Mapping Column: #{v["column"]} ")

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

    session[:column] = params[:column]

    @csv_rows = Contact::DataImport.find(session[:rows_id])
    @csv_rows.update_attributes(:rows => @rows)

    redirect_to csv_import_wizard_contact_imports_url(:step => 3)

    end

    if params[:next]

      @rows = Contact::DataImport.find(session[:rows_id]).rows

      @rows[0].each do |column|

      unless column.nil?

      params[:csv_field].each do |k,v|

       if k.eql?(column)
          index = @rows[0].index(k)
          @rows[0][index] = v
       end

      end
      end
      end

      @csv_rows = Contact::DataImport.find(session[:rows_id])
      @csv_rows.update_attributes(:new_rows => @rows)

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

      @rows = Contact::DataImport.find(session[:rows_id]).new_rows

      @rows.shift

      @rows.compact!

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

        @contact.save!


      end

      redirect_to contact_imports_url()

    end

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

      @rows = Contact::DataImport.create(:rows => @csv_rows)
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

    @contacts = Contact.columns()
    @phones = Contact::PhoneNumber.columns()
    @address = Contact::Address.columns()

    @contacts | @phones | @address

  end

  def get_mapping_hash
    
    @mapping = {     "title" => ['Individual Prefix', 'Prefix', 'Salutation', 'salutation' 'Title', 'prefix', 'individual prefix'],
                     "first_name" => ['First Name', 'First name', 'First_name', 'first_Name', 'first name', 'firstname', 'Firstname'],
                     "last_name" => ['Last Name', 'Last name', 'Last_name', 'last_Name', 'last name', 'lastname', 'Lastname', 'last_name'],
                     "number_type" => ['phone type', 'phone_type', 'Phone_Type', 'Phone Type', 'Number Type'],
                     "address_type" => ['address type', 'address_type', 'Address_Type', 'Address Type', 'Address type'],
                     "number" => ['phone', 'Phone', 'Phone Number', 'Number', "Phone number"],
                     "contact_type" => ['contact type', 'Contact Type', 'Contact_type', 'contact_Type'],
                     "city" => ['City'],
                     "zip_code" => ['Postal Code', 'Postal code', 'postal_code', 'Postal_code', 'Zip code', 'Zip', 'zip'],
                     "state" => [ 'State', 'Province', 'province'],
                     "street" => [ 'Street', 'street'],
                     "country" => ['Country'],
                     "email" => ['Email', 'e-mail', 'E-mail', 'email']
    }
  end
end
