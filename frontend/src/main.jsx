import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";

//Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";

//Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/productUpdate.jsx";
import AllProductList from "./pages/Admin/AllProductList.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/favorite" element={<Favorites />}></Route>
      <Route path="/product/:id" element={<ProductDetails />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/shop" element={<Shop />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Route>
      {/* //Admin router */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />}></Route>
        <Route path="categorylist" element={<CategoryList />}></Route>
        <Route path="productlist" element={<ProductList />}></Route>
        <Route path="allproductslist" element={<AllProductList />}></Route>
        <Route path="product/update/:_id" element={<ProductUpdate />}></Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
