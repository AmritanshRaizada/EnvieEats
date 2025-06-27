import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerCard from "./Shimmer"; // Importing Shimmer component for loading state
//named import of useState hook from react library
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [originallistOfRestaurants, setOListOfRestaurants] = useState([]);
  console.log(originallistOfRestaurants);

  const [searchText, setSearchText] = useState(""); // State to hold the search text

  const RestaurantCardVeg = withVegLabel(RestaurantCard);

  //whenever state variable changes, react triggers a reconcilation process to update the UI(re-rendering the component). This is done by calling the function passed to useState with the new value. The component will then re-render with the updated state.

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://envieeats-proxy.onrender.com/api/restaurants"
      );
      const json = await data.json();

      // Use optional chaining and fallback to empty array
      const restaurants =
        json?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      const cleanedRestaurants = restaurants.map((restaurant) => ({
        resname: restaurant.info.name,
        cuisine: restaurant.info.cuisines.join(", "),
        Rating: restaurant.info.avgRating,
        Cost: restaurant.info.costForTwoMessage || restaurant.info.costForTwo,
        id: restaurant.info.id,
        img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${restaurant.info.cloudinaryImageId}`,
        veg: restaurant.info.veg || restaurant.info.isVeg,
        deliveryTime:
          restaurant.info.sla?.deliveryTime || restaurant.info.deliveryTime,
        location: restaurant.info.areaName || restaurant.info.locality,
      }));

      setListOfRestaurants(cleanedRestaurants);
      setOListOfRestaurants(cleanedRestaurants);
    } catch (error) {
      console.error("Failed to fetch restaurant data", error);
    }
  };

  //useEffect hook is used to perform side effects in functional components. It takes a function as an argument and runs it after the component has rendered. The second argument is an array of dependencies that determines when the effect should run. If the array is empty, the effect will only run once when the component mounts.

  //conditional rendering
  //if the listOfRestaurants is empty, show the shimmer effect
  // rendering the shimmer effect while the data is being fetched

  const handleSearch = () => {
    const filteredList = originallistOfRestaurants.filter(
      (rest) =>
        rest.resname.toLowerCase().includes(searchText.toLowerCase()) ||
        rest.cuisine.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredList.length === 0) {
      alert("No restaurant found with this name or cuisine");
    } else {
      setListOfRestaurants(filteredList);
    }
  };

  return listOfRestaurants.length === 0 ? (
    <div className="shimmer-container">
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
    </div>
  ) : (
    <div className="body">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Food or Restaurant"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Move your search logic to a reusable function
            }
          }}
        />

        {/* Not all parts of the UI will be re-rendered in full — React’s
        reconciliation algorithm efficiently updates only the parts of the DOM
        that actually changed. */}

        <button
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </button>
        <div className="filter">
          <button
            className="filter-btn"
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter(
                (restaurant) => restaurant.Rating > 4.5
              );
              setListOfRestaurants(filteredRestaurants);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.id}
            key={restaurant.id}
            className="res-link"
          >
            {restaurant.veg ? (
              <RestaurantCardVeg {...restaurant} />
            ) : (
              <RestaurantCard {...restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
