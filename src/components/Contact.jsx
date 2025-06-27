import React from 'react';
import '../../ContactUs.css'; // Importing custom styles

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <div className="contact-info">
        <div className="contact-title">Contact Us</div>
        <div className="contact-detail">
          <strong>Phone:</strong> +91 123 456 7890
        </div>
        <div className="contact-detail">
          <strong>Email:</strong> support@swiggy.com
        </div>
        <div className="contact-detail">
          <strong>Address:</strong> 123, Swiggy Tower, Main Road, City, State
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
