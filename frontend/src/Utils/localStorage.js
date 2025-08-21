// add a product to local storage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// remove a product from local storage
export const removeFavoriteFromLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter((p) => p._id !== product._id);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// retrive favorites from local storage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
