import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SignInUp from "./pages/SignInUp";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/route/ProtectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/signinup',
      element: <SignInUp />
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          )
        },
        {
          path: 'products/:productId',
          element: (
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          )
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;
