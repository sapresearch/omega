# prefix with Z to load after Trams::Favorites::FavoritesHelper so we can override these methods
module ZFavoritesHelper
  def add_to_favorites(model)
    link_to('Add', favorite_path(model))
  end

  def remove_from_favorites(model)
    link_to('Remove', favorite_path(model))
  end
end
