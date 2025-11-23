"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fragment, useEffect } from "react";

const AOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);
  return <Fragment>{children}</Fragment>;
};
export default AOSProvider;
