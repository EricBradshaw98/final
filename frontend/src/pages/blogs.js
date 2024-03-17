import React from "react";

const Blogs = () => {
  return (
    <div>
      <h1>Blogs</h1>
      <p>Explore our latest articles, tips, and insights on stock trading and investing:</p>
      <div className="blog-list">
        <div className="blog-item">
          <h2>5 Essential Tips for Beginner Investors</h2>
          <p>Learn the fundamentals of investing and get started on your investment journey.</p>
          <a href="/blog/1">Read More</a>
        </div>
        <div className="blog-item">
          <h2>The Importance of Diversification in Your Investment Portfolio</h2>
          <p>Discover why diversifying your investment portfolio is crucial for long-term success.</p>
          <a href="/blog/2">Read More</a>
        </div>

      </div>
    </div>
  );
};

export default Blogs;
