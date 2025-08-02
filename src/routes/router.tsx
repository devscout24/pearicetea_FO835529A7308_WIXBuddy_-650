import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div>Main Content lorem50000</div>
      }
    ]
  }
]);