import React from 'react';
import { useRouteError } from 'react-router-dom';
import '../../CartoonErrorPage.css';
import { Link } from "react-router-dom";
const CartoonErrorPage = () => {
    const error = useRouteError();
    console.error(error);
  return (
    <div className="cartoon-error-container">
      <div className="cartoon-error-content">
        <div className="cartoon-illustration">
          <img 
            src="https://t4.ftcdn.net/jpg/05/69/98/19/360_F_569981913_0ev87kxVdBkqwMEQZTyF1Jt4GQw163Zq.jpg" 
            alt="Error" 
            className="error-img"
          />
        </div>
        <h1 className="fade-in">Oops! Something Went Wrong</h1>
        <p className="fade-in">Looks like our servers are on a coffee break! Please try again later.</p>
        <p>DETAILS  - {error.status}: {error.statusText} </p>
      
        <Link to="/"><button className="retry-button"> Try Again!</button></Link>
      </div>
    </div>
  );
};

export default CartoonErrorPage;
