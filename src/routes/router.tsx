import MainLayout from "@/layout/MainLayout";
import AreasOfExpertise from "@/pages/AreasofExpertise/Index";
import Home from "@/pages/Home/Index";
import OurService from "@/pages/OurService/Index";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "service",
        element: <OurService />
      },
      {
        path: "expertise",
        element: <AreasOfExpertise />
      }
    ]
  }
]);