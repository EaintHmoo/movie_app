import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen, { loader as HomeScreenLoader } from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import RootPage from "./Screens/RootPage";
import NotFound from "./Screens/NotFound";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/Movies";
import SingleMovie, {
  loader as singleMovieLoader,
} from "./Screens/SingleMovie";
import WatchPage from "./Screens/WatchPage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import AOS from "aos";
import Password from "./Screens/Dashboard/Password";
import FavoritesMovies from "./Screens/Dashboard/FavoritesMovies";
import MovieList from "./Screens/Dashboard/Admin/MovieList";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Categories from "./Screens/Dashboard/Admin/Categories";
import User from "./Screens/Dashboard/Admin/User";
import AddMovie from "./Screens/Dashboard/Admin/AddMovie";
import SiderbarContextProvider from "./Context/SiderbarContextProvider";
import { Provider } from "react-redux";
import store from "./store";
import UpdateMovie from "./Screens/Dashboard/Admin/UpdateMovie";
import SearchResult from "./Screens/SearchResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
        loader: HomeScreenLoader,
      },
      {
        path: "search-results",
        element: <SearchResult />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "movies",
        children: [
          {
            index: true,
            element: <MoviesPage />,
          },
          {
            path: ":movieId/:movieTitle",
            element: <SingleMovie />,
            loader: singleMovieLoader,
          },
        ],
      },
      {
        path: "watch/:movieId/:movieTitle",
        element: <WatchPage />,
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
        path: "profile",
        element: <Profile />,
      },
      {
        path: "password",
        element: <Password />,
      },
      {
        path: "favorites",
        element: <FavoritesMovies />,
      },
      {
        path: "movieslist",
        element: <MovieList />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "addmovie",
        element: <AddMovie />,
      },
      {
        path: "updatemovie",
        element: <UpdateMovie />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "users",
        element: <User />,
      },
    ],
  },
]);

function App() {
  AOS.init();
  return (
    <SiderbarContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SiderbarContextProvider>
  );
}

export default App;
