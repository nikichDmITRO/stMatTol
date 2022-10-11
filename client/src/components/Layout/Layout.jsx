import React from "react";
import { Navbar } from "../Navbar/Navbar";
import s from "./layout.module.scss";
export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className={s.app} >
        <Navbar />
        {children}
      </div>
    </React.Fragment>
  );
};
