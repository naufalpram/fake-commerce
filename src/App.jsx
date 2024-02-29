import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import SignInUp from "./pages/SignInUp";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/signinup',
      element: <SignInUp />
    },
    {
      path: '/',
      element: <Header />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'products/:productId',
          element: <ProductDetail />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
};

export default App;
