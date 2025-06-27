import React from 'react';
import '../../ShimmerCard.css';
const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[1, 2, 3,4,5].map((item) => (
        <div className="shimmer-card" key={item}>
          <div className="shimmer-image shimmer-animate"></div>
          <div className="shimmer-line shimmer-animate short"></div>
          <div className="shimmer-line shimmer-animate long"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
// This component is used to display a shimmer effect while the restaurant cards are loading. It uses CSS to create a shimmering effect on the card. The card has a background color of #f0f0f0 and contains three divs with the class "shimmer" to create the shimmer effect. The first div is for the image, and the other two are for the title and subtitle.