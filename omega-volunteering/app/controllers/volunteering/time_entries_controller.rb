class Volunteering::TimeEntriesController < ApplicationController

  respond_to :html, :xml, :json, :js

    def show
      @entry = Volunteering::TimeEntry.find(params[:id])
      @entry_days = Volunteering::TimeEntry::Day.all
      respond_with(@entry)
    end

    def new
      @entry = Volunteering::TimeEntry.new
      @entry.record = Volunteering::Record.find(params[:id])

      ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].each do |day|
        @entry.days.build(:day => day)
      end
      
      respond_with(@entry)

    end

    def create
      @entry = Volunteering::TimeEntry.create(params[:volunteering_time_entry])
      respond_with(@entry)
      
    end

    
  end