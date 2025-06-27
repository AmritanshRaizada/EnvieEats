import React, { useState } from "react";
import "../../RestaurantMenu.css";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resid } = useParams();
  const resinfo = useRestaurantMenu(resid);
  const [openIndex, setOpenIndex] = useState(null);

  if (!resinfo) return <Shimmer />;

  const { name, cuisines, locality, cloudinaryImageId } =
    resinfo?.cards[2]?.card?.card?.info;

  const menuCards =
    resinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = menuCards.filter(
    (card) =>
      card?.card?.card["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryImageId}`}
          alt="Restaurant Icon"
          className="menu-icon"
        />
        <h1 className="restaurant-name">{name}</h1>
        <h2 className="locality">Locality - {locality}</h2>
        <h2 className="cuisines">Cuisines - {cuisines?.join(", ")}</h2>
        <h2 className="menu-title">Our Special Menu</h2>
      </div>

      <div className="accordion-container">
        {categories.map((cat, index) => {
          const { title, itemCards } = cat.card.card;

          return (
            <div className="accordion-item" key={index}>
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <h3>{title}</h3>
                <span
                  className={`accordion-icon ${
                    openIndex === index ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {openIndex === index && (
                <ul className="menu-list">
                  {itemCards?.map((item, idx) => {
                    const {
                      id,
                      name,
                      description,
                      price,
                      defaultPrice,
                      imageId,
                    } = item.card.info;
                    const key = `${id || name}-${idx}`;

                    return (
                      <li key={key} className="menu-item">
                        <div className="menu-text">
                          <h3>{name}</h3>
                          {description && <p>{description}</p>}
                          <p
                            style={{
                              fontWeight: "600",
                              color: "green",
                              fontSize: "17px",
                              marginTop: "8px",
                            }}
                          >
                            ₹{(price ?? defaultPrice) / 100}
                          </p>
                        </div>

                        {imageId && (
                          <div className="menu-image-container">
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                              alt={name}
                              className="menu-image"
                            />
                            <button
                              className="add-to-cart-btn"
                              onClick={() => alert(`Added ${name} to cart!`)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
