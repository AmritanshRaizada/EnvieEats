import React, { lazy,Suspense,useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom"; // Import BrowserRouter for routing
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About"; // Import the About component
import Contact from "./components/Contact"; // Import the Contact component
import Error from "./components/Error"; // Import the Error component
import RestaurantMenu from "./components/RestaurantMenu";
import useOnlineStatus from "./utils/useOnlineStatus";
import Shimmer from "./components/Shimmer";
// import GroceryComponent from "./components/GroceryComponent";

//chunking
//lazy loading
//dynamic bundling
//code splitting 
//on demand loading
//Dynamic Import


// const GroceryComponent=lazy(()=>import("./components/GroceryComponent"))
const GroceryComponent = lazy(() =>
  new Promise(resolve => {
    setTimeout(() => resolve(import('./components/GroceryComponent')), 2000);
  })
);


const App = () => {
  
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

   const isOnline = useOnlineStatus();

   useEffect(() => {
    document.title = `${isOnline ? "🟢" : "🔴"} VISION-FOODS`;
  }, [isOnline]);

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      {/* Pass toggle and state to Header if toggle button is there */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Outlet /> {/* This will render the child routes */}
      <Footer darkMode={darkMode} />
      
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/restaurants/:resid",
        element: <RestaurantMenu />
      },
      {
         path: "/Grocery",
        element: (
          <Suspense fallback={<Shimmer/>}>
            <GroceryComponent />
          </Suspense>
        )
      }
    ], 
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
// <React.StrictMode>
//   <App />
// </React.StrictMode>,
//
