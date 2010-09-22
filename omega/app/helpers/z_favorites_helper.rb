# prefix with Z to load after Trams::Favorites::FavoritesHelper so we can override these methods
module ZFavoritesHelper
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
end
