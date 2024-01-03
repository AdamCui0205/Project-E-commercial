import React from 'react';
import '/home/aflores004/grace-shopper/Project-E-commercial/src/client/styles/Footer.css'; // Import your stylesheet

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Your description about your company goes here.</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Connect with us on social media:</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
