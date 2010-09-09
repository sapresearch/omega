# prefix with Z to load after Trams::Favorites::FavoritesHelper so we can override these methods
module ZFavoritesHelper
  def add_to_favorites(model)
            link_to('Add to Favorites', favorite_path(model), :remote => true, :'data-method' => :post, :'data-type' => :json, :class => 'remove-favorite')
  end

  def remove_from_favorites(model)

            link_to('Remove from Favorites', favorite_path(model), :remote => true, :'data-method' => :post, :'data-type' => :json, :class => 'remove-favorite')

  end
end
