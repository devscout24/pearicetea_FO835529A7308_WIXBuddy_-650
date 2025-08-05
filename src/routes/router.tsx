import ErrorPage from "@/components/ErrorPage";
import MainLayout from "@/layout/MainLayout";
import AreasOfExpertise from "@/pages/AreasofExpertise/Index";
import Home from "@/pages/Home/Index";
import OurService from "@/pages/OurService/Index";
import TechnologyDetail from "@/pages/OurTechnology/components/TechnologyDetail";
import { axiosCommon } from "@/hooks/useAxiousCommon";
import { createBrowserRouter } from "react-router";
import OurTechnology from "@/pages/OurTechnology/Index";
import ContactUs from "@/pages/ContuctUs";
import NewsAndHighlights from "@/pages/NewsAndHighlights/Index";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
      },
      {
        path: 'news-highlight',
        element: <NewsAndHighlights />,
      },
      {
        path: 'technology',
        element: <OurTechnology />,
      },
      {
        path: 'technology/show/:id',
        element: <TechnologyDetail />,
        loader: async ({ params }) => {
          try {
            const { data } = await axiosCommon.get(`/technology/show/${params.id}`);
            console.log("Technology Detail Data:", data);
            return data;

          } catch {
            throw new Error("Failed to fetch technology details");
          }
        }
      },
      {
        path: 'contact',
        element: <ContactUs />,
      }
    ]
  }
]);