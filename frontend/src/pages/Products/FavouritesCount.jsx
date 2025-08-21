import { useSelector } from "react-redux";

const FavouritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;
  //   console.log(favoriteCount);
  return (
    <div className="absolute left-4 top-10">
      {favoriteCount > 0 && (
        <span className="bg-pink-500 text-white text-sm font-bold px-1 py-0 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};
export default FavouritesCount;
