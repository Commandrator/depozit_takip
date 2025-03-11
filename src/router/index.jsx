import AppProvider from "../provider/index.tsx";
import App from "../App/index.tsx";
import DepozitoApp from "../DepozitoApp";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login, Panel, Register } from "../Auth/index.jsx";
import AuthLayer from "../layers/AuthLayer.tsx";
import PrivateLayer from "../layers/PrivateLayer.tsx";
import CompanyMangement from "../Modules/DTS/company.management/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppProvider />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/depozite" />,
      },
      {
        path: "app",
        element: <PrivateLayer />,
        children: [
          {
            index: true,
            element: <DepozitoApp />,
          },
          {
            path: "depozite",
            element: <App />,
          },
          {
            path:"manage",
            children: [
              {
                index: true,
                element: <Navigate to="/app/depozite" />
              },
              {
                path:"company",
                element:<CompanyMangement/>
              }
            ]
          }
        ],
      },
      {
        path: "auth",
        element: <AuthLayer />,
        children: [
          {
            index: true,
            element: <Navigate to="panel" />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "panel",
            element: <Panel />,
          },
        ],
      },
    ],
  },
]);
const routerProvider = <RouterProvider router={router} />;
export { routerProvider };
