// src/pages/AuthSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";


const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      showToast("error", "Google login failed!");
      return navigate("/login");
    }

    localStorage.setItem("token", token);

    fetch("http://localhost:8080/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          showToast("error", data.message || "Failed to fetch user");
          return navigate("/login");
        }

        dispatch(setUser(data));

        showToast("success", "Login successful!");

        // 🔥 FIXED PART
        if (data.registrationType === "FARMER") {
          navigate("/farmer");
        } else {
          navigate("/dashboard");
        }
      })
      .catch(() => {
        showToast("error", "Server error");
        navigate("/login");
      });
  }, []);

  return <p className="text-center mt-10">Finalizing login...</p>;
};

export default AuthSuccess;
