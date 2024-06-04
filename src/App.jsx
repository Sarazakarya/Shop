import { Route, Routes } from "react-router-dom";
import { ProductPage } from "./Pages/ProductPage";
import SingleProduct from "./Pages/SingleProduct";
import { MainLayout } from "./Components/outliet/MainLayout";
import Login from "./Pages/Login/Login";
import IsNotLogin from "./Components/Protectedlogin/IsNotLogin";
import { Dashboard } from "./Dashboard/Dashboard";
import { DashboardLayout } from "./Dashboard/DashboardLayout/DashboardLayout";
import { DashboardProduct } from "./Dashboard/DashboardProduct/DashboardProduct";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route index element={<ProductPage />} />
        <Route path="singleProduct/:id" element={<SingleProduct />} />
      </Route>
      <Route
        path="Login"
        element={
          <IsNotLogin>
            <Login />
          </IsNotLogin>
        }
      />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<DashboardProduct />} />
        <Route path="Category" element={<h1>Category</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
