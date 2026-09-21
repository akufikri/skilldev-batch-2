import { createBrowserRouter } from "react-router-dom";
import { DashboardCashier } from "@/pages/DashboardCashier";
import LoginPage from "@/pages/LoginPage";
import ProductDetail from "@/pages/product/DetailProduct";
import { ProtectedRoute } from "./protectedRoute";
import StockPage from "@/pages/StockPage";
import { NotFoundPage } from "@/pages/error/NotFoundPage";
import CategoriesPages from "@/pages/CategoriesPage";
import DetailCategoriesPage from "@/pages/DetailCategoriesPage";
import PerformanceOptimizationDemo from "@/pages/PerformenceOptimaztionDemo";
import LoginRetail from "@/pages/RetailLoginForm";
import TanstackQueryDemo from "@/pages/TanstackQueryDemo";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <DashboardCashier />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/categories/product",
    element: <CategoriesPages />,
  },
  {
    path: "/categories/product/:slug",
    element: <DetailCategoriesPage />,
  },
  {
    path: "/performance",
    element: <PerformanceOptimizationDemo />,
  },
  {
    path: "/retail/login",
    element: <LoginRetail />,
  },
  {
    path: "/tanstack/demo",
    element: <TanstackQueryDemo />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/stock", element: <StockPage /> }],
  },
]);
