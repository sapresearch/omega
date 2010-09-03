# prefix with Z to load after Trams::Favorites::FavoritesHelper so we can override these methods
module ZFavoritesHelper
  def add_to_favorites(model)
    link_to(favorite_path(model), :remote => true, :'data-method' => :post, :'data-type' => :json) do
      '<img src="/images/icons/heart-plus.png" alt="">Add to Favorites'
    end
  end

  def remove_from_favorites(model)
    link_to('Remove', favorite_path(model))
  end
end
