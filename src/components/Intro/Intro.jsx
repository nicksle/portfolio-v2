import React from "react";
import { HeaderFrame } from "../HeaderFrame/HeaderFrame";
import "./Intro.css";

const Intro = ({ onWorkClick }) => {
  return (
    <div className="intro">
      <HeaderFrame onWorkClick={onWorkClick} />
    </div>
  );
};

export default Intro; 