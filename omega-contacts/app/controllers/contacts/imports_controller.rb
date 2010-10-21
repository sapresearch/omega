require 'csv'
require 'array.rb'

class Contacts::ImportsController < ApplicationController

  respond_to :html, :js, :json, :xml
  
  def csv_import_wizard

     if session[:import_id] == nil

      @import = Contact::Import.new

     else

      @import = Contact::Import.find_by_id(session[:import_id])

     end

     session[:current_step] = params[:step]

    @contact_fields = get_omega_contact_fields
    @mapping = get_mapping_hash

    case params[:step]
      
      when '1'
        render "contacts/imports/step_1"
        session[:current_page] = "upload"
      when '2'
        render "contacts/imports/step_2"
        session[:current_page] = "mapping"
      when '3'
        render "contacts/imports/step_3"
        session[:current_page] = "import"
      when ''
        session[:import_id] == nil

    end
 end

  def show

  end

  def new
    @import = Contact::Import.new
  end

  def create

       @import = Contact::Import.create(params[:contact_import])
       session[:import_id] = @import.id
       
       process_csv(@import)

       if session[:current_page] == 'upload'
       redirect_to csv_import_wizard_contact_imports_url(:step => session[:current_step].to_i+1)
       else

       end

  end

  def edit
    @import = Contact::Import.find(session[:import_id])
  end

  def update

    @import = Contact::Import.find(session[:import_id])

    @import.update_attributes(params[:contact_import])

    if (params[:commit] == "Update")

      $rows = $rows.safe_transpose

      params[:discard].each do |k,v|

        if (v=='1')
         $rows.each do |row|
            row.slice!(0..row.length) if row.include?(k)
         end
        end
      end

      $rows = $rows.safe_transpose

      redirect_to csv_import_wizard_contact_imports_url(:step => session[:current_step])

    end

    if (params[:commit] == "Finalize")


      $rows[0].each do |column|

      unless column.nil?

      params[:csv_field].each do |k,v|

       if k.include?(column)
          index = $rows[0].index(k)
          $rows[0][index] = v
       end

      end
      end
      end

      redirect_to csv_import_wizard_contact_imports_url(:step => session[:current_step].to_i+1)
    end

    if (params[:commit] == "Import")

      $rows.each do |row|

        row.delete_if {|x| x == nil}

    end


    heading_row = $rows.shift.map { |heading| Contact.connection.quote_column_name(heading) }.join(",")

    $rows.each do |row|

    unless row.empty?

        row_data = row.map { |item| Contact.connection.quote(item) }.join(",")
        Contact.connection.execute("INSERT INTO %s(%s) VALUES (%s);" % ["contacts", heading_row, row_data])
    end
    end

    redirect_to contact_imports_url()
      
    end

  end

  private #---------------------------------------------------------------------------------------------------

  def process_csv(import)

      rows = parse_csv(import.csv.path)

      if rows.size > 0
        import.update_attributes(:processed => rows.size)
        $rows = []

        rows.each do |r|
          $rows << r
        end
    end
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
    
    @mapping = {     "title" => ['Individual Prefix', 'Prefix', 'Salutation', 'Title', 'prefix', 'individual prefix'],
                     "first_name" => ['First Name', 'First name', 'First_name', 'first_Name', 'first name', 'firstname', 'Firstname'],
                     "last_name" => ['Last Name', 'Last name', 'Last_name', 'last_Name', 'last name', 'lastname', 'Lastname'],
                     "number_type" => ['phone type', 'phone_type', 'Phone_Type', 'Phone Type', 'Number Type'],
                     "number" => ['phone', 'Phone', 'Phone Number', 'Number', "Phone number"],
                     "contact_type" => ['contact type', 'Contact Type', 'Contact_type', 'contact_Type'],
                     "city" => ['City'],
                     "zip_code" => ['Postal Code', 'Postal code', 'postal_code', 'Postal_code', 'Zip code', 'Zip'],
                     "state" => [ 'State', 'Province', 'province'],
                     "country" => ['Country'],
                     "email" => ['Email', 'e-mail', 'E-mail']
    }
  end
end
