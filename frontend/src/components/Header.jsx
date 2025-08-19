import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import ProductCarousel from "../pages/Products/ProductCarousel";
import Loader from "./Loader";
const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) return <Loader />;
  if (error) return <div>Error loading products</div>;
  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel></ProductCarousel>
      </div>
    </>
  );
};
export default Header;
