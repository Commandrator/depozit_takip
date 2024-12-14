import {AppProvider} from '../providers/index.tsx';
import App from "../App/index.tsx"
import DepozitoApp from '../DepozitoApp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
    {
      path: "/",
      element: <AppProvider/>,
      children: [
        {
          index: true,
          element: <DepozitoApp />
        },
        {
          path:"depozite",
          element:<App/>
        }
      ]
    }
]);
const routerProvider = <RouterProvider router={router} />;
export {routerProvider}