require 'csv'
require 'array.rb'

class Contacts::ImportsController < ApplicationController

  respond_to :html, :js, :json, :xml
  
  def csv_import_wizard

    if params[:id].nil?
      @import = Contact::Import.new
    else
      @import = Contact::Import.find_by_id(params[:id])
    end

    session[:current_step] = params[:step]
    session[:import_id] = params[:id]

    @contact_fields = get_omega_contact_fields
    @mapping = get_mapping_hash



    case params[:step]
      
      when '1'
        render "contacts/imports/step_1"
      when '2'
        render "contacts/imports/step_2"
      when '3'
        render "contacts/imports/step_3"
      when '4'
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

       @current_step = session[:current_step]
       redirect_to csv_import_wizard_contact_imports_url(:step => @current_step.to_i+1, :id => @import)



  end

  def edit

    @import = Contact::Import.find(params[:id])

  end

  def update

    @import = Contact::Import.find(params[:id])
    @import.update_attributes(params[:contact_import])


    @current_step = session[:current_step]

    if (params[:commit] == "Update")

       #  params[:discard].each do |k,v|
           
        #      $rows[0].delete(k)

         #end

      $rows = $rows.safe_transpose


      params[:discard].each do |k|

         $rows.each do |row|

            row.slice!(0..row.length) if row.include?(k)


        end
         end

      logger.debug("Before: #{$rows}")

      $rows = $rows.safe_transpose

      redirect_to csv_import_wizard_contact_imports_url(:step => @current_step, :id => @import)

      logger.debug("After: #{$rows}")

    end

    if (params[:commit] == "Finalize")
          redirect_to csv_import_wizard_contact_imports_url(:step => @current_step.to_i+1, :id => @import)

    end

    
  end



  private #-----------------------------------------------------

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

  def new_contact(column)


     @contact = Contact.new

     @contact.email = column[0]
     @contact.title = column[1]
     @contact.first_name = column[2]
     @contact.last_name = column[3]
     @contact.phone_numbers.build
     @contact.phone_numbers.first.number_type = column[5]
     @contact.phone_numbers.first.number = column[4]

     @contact.save

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
