import React from "react";

const ContactUs = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Have a question or feedback? We'd love to hear from you!</p>
      <h2>Get in Touch:</h2>
      <p>If you have any inquiries or suggestions, please feel free to contact us using the form below:</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Send Message</button>
      </form>
      <h2>Reach Out Directly:</h2>
      <p>If you prefer to reach out to us via email or phone, you can do so using the contact information below:</p>
      <ul>
        <li>Email: <a href="mailto:contact@stockmarketmagnet.com">contact@stockmarketmagnet.com</a></li>
        <li>Phone: +1 (123) 456-7890</li>
      </ul>
      <h2>Connect on Social Media:</h2>
      <p>Stay updated with the latest news and updates by following us on social media:</p>
      <ul>
        <li><a href="https://twitter.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        <li><a href="https://facebook.com/StockMarketMagnet" target="_blank" rel="noopener noreferrer">Facebook</a></li>

      </ul>
    </div>
  );
};

export default ContactUs;
