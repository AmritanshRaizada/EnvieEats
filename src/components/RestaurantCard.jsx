const RestaurantCard = ({
  resname,
  cuisine,
  Rating,
  Cost,
  img,
  deliveryTime,
  location,
}) => {
  return (
    <div className="res-card">
      <img src={img} alt={resname} className="res-img" />
      <h3 className="res-name">{resname}</h3>
      <h4 className="res-cuisine">{cuisine}</h4>

      <div className="res-details">
        <span>⭐ {Rating}</span>
        <span>{Cost}</span>
        <span>🕒 {deliveryTime} mins</span>
        <span>📍 {location}</span>
      </div>

    </div>
  );
};

// Higher Order Component
export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div style={{ position: "relative" }}>
        <label className="veg-label">VEG</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
