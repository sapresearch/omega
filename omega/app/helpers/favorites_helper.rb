module FavoritesHelper
  def link_to_favorite(favorite)
    item = favorite.item

    item_path_helper = Omega::FavoritePaths[item]
    raise("#{item.class} is not registered in #{Omega::FavoritePaths}") unless item_path_helper

    link_to(item, send(item_path_helper, item))
  end

  def toggle_favorite(model)
    already_favorite?(model) ? remove_from_favorites(model) : add_to_favorites(model)
  end

#  def add_to_favorites(model)
#    link_to('Add to Favorites', favorite_path(model))
#  end
#
#  def remove_from_favorites(model)
#    link_to('Remove from Favorites', favorite_path(model))
#  end

  def add_to_favorites(model)
    om_button(:plain => true, :icon => 'favorite-add') do
      link_to('Add as Favorite', favorite_path(model), :remote => true,
              :'data-method' => :post, :'data-type' => :json,:'data-tooltip' => 'Add this position to your favorites')
    end

  end

  def remove_from_favorites(model)

    om_button(:plain => true, :icon => 'favorite-remove') do
      link_to('Remove from Favorites', favorite_path(model), :remote => true,
              :'data-method' => :post, :'data-type' => :json,:'data-tooltip' => 'Remove this position to your favorites')
    end


  end

  def favorite_path(model)
    helper = already_favorite?(model) ? :remove_from : :add_to
    send(:"#{helper}_favorites_path", model, :klass => model.class.to_s.underscore)
  end

  private
    def already_favorite?(model)
      Favorite.of(current_user).for(model).any?
    end
end
