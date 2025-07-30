import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthLayout from "./components/auth/Layout";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";
import AdminFeatures from "./pages/admin-view/Features";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page";
import ShoppingLayout from "./components/shopping-view/Layout";
import AdminCategory from "./pages/admin-view/Category";
import AdminBrand from "./pages/admin-view/Brand";
import AdminSubCategory from "./pages/admin-view/SubCategory";
import ShoppingDetails from "./pages/shopping-view/Details";
import ShoppingOrder from "./pages/shopping-view/Order";
import AdminOrders from "./pages/admin-view/Orders";
import ShopSearch from "./pages/shopping-view/search";
import Wishlist from "./pages/shopping-view/Wishlist";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div >
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="brand" element={<AdminBrand />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="category" element={<AdminCategory />} />
          <Route path="subcategory" element={<AdminSubCategory />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="orders" element={<ShoppingOrder />} />
          <Route path="search" element={<ShopSearch />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="details/:id" element={<ShoppingDetails />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
