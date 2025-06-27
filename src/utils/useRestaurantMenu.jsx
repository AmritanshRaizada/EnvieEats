import { useState,useEffect } from "react";
import { menuURL } from "./constants";

const useRestaurantMenu = (resid) => {
  const [resInfo, setresInfo] = useState(null);

  //fetchdata
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(menuURL + resid);
      console.log(resid);
      const json = await data.json();
      setresInfo(json.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
