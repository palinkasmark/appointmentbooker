import React from "react";

const Home = () => {
  const username = localStorage.getItem("username");
  return <div>Welcome home {username} </div>;
};

export default Home;
