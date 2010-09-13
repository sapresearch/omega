class ImportsController < ApplicationController

  respond_to :html, :js, :json, :xml
  
  def new
    @import = Import.new
    respond_with(@import)
  end

  def show
    @service = Service.last
    @import = Import.find(params[:id])
    respond_with(@import)
  end

  def create
    @import = Import.create(params[:import])
    process_csv(@import)
    respond_with(@import)
  end

  private #-----------------------------------------------------

  def process_csv(import)

      lines = parse_csv(import.csv.path)
      lines.shift

      if lines.size > 0
        import.update_attributes(:processed => lines.size)
        @check = []
        lines.each do |l|
          case import.datatype
          when "services"
            new_service(l)
        end
        end
    end

  end

  def parse_csv(csv)

    lines = []

    require 'fastercsv'

    FasterCSV.foreach(csv) do |r|

      lines << r
          
    end

    lines
    
  end

  def new_service(line)

    params = Hash.new
    params[:service_field] = Hash.new
    params[:service] = Hash.new

    unless @check.include?(line[0])

      params[:service]["service_type"] = line[0]
      service = Service.new(params[:service])
      service.save
      @s_id = service.id
      @check << line[0]
      
    end
    
    params[:service_field]["field_name"] = line[1]
    params[:service_field]["field_type"] = line[2]
    params[:service_field]["service_id"] = @s_id

    field = Service::Field.new(params[:service_field])   
    field.save


  end

end
