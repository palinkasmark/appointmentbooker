import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    await fetch("/home", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      const token = localStorage.getItem("user-token").length !== 0;
      setTimeout(() => {
        if (!token) {
          navigate("/");
        }
        if (token) {
          setIsLoading(false);
        }
      }, 3000);
    });
  };

  return <>{isLoading ? <CircularProgress /> : <div>This is home</div>}</>;
};

export default Home;
