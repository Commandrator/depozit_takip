import App from '../conexts';
import DepozitoApp from '../DepozitoApp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          index: true,
          element: <DepozitoApp />
        }
      ]
    }
]);
const routerProvider = <RouterProvider router={router} />;
export {routerProvider}