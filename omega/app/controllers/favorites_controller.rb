class FavoritesController < ApplicationController
  respond_to :html, :js, :xml, :json

  def index
    @favorites = Favorite.of(current_user)
    respond_with(@favorites)
  end

  def show
    @favorite = Favorite.of(current_user).find(params[:id])
    respond_with(@favorite)
  end

  def of_klass
    @favorites = Favorite.of(current_user).klassed(klass)
    respond_with(@favorites)
  end

  def add
    @favorite = Favorite.create do |f|
      f.user = current_user
      f.item = model
    end

    respond_with(@favorite)
  end

  def remove
    @favorite = Favorite.of(current_user).for(model).first
    @favorite.try(:destroy)

  end

  private
    def klass
      @klass ||= params[:klass].singularize.camelize.constantize
    end

    def model
      @model ||= klass.find(params[:id])
    end
end
