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
import Articles from "@/pages/Article";
import ArticleDetail from "@/pages/Article/components/ArticleDetail";
import Courses from "@/pages/Courses";
import GlobalSearchResult from "@/pages/GlobalSearchResult";
import SearchService from "@/pages/IndivisualSearchPages/SearchService";
import SearchArticles from "@/pages/IndivisualSearchPages/searchArticles";
import SearchTechnology from "@/pages/IndivisualSearchPages/searchTechnology";
import SearchCourses from "@/pages/IndivisualSearchPages/SearchCourses";
import SearchNews from "@/pages/IndivisualSearchPages/searchNews";


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
        path: 'training-courses',
        element: <Courses />,
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
            return data;

          } catch {
            throw new Error("Failed to fetch technology details");
          }
        }
      },
      {
        path: 'contact',
        element: <ContactUs />,
      },
      {
        path: 'articles',
        element: <Articles />,
      },
      {
        path: 'article/:id',
        element: <ArticleDetail />,
        loader: async ({ params }) => {
          try {
            const { data } = await axiosCommon.get(`/article/show/${params.id}`);
            return data;
          } catch {
            throw new Error("Failed to fetch article details");
          }
        }
      },
      {
        path: 'global-search',
        element: <GlobalSearchResult />
      },
      {
        path: 'search-service',
        element: <SearchService />
      },
      {
        path: 'search-articles',
        element: <SearchArticles />
      },
      {
        path: 'search-technology',
        element: <SearchTechnology />
      },
      {
        path: "search-courses",
        element: <SearchCourses />
      },
      {
        path: 'search-news',
        element: <SearchNews />
      }
    ]
  }
]);