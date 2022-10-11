import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../../redux/slices/auth/authSlice";
import s from "./navbar.module.scss";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };
  return (
    <div className={s.app}>
      <div>
        <p className={s.titul}>Стоматологический блакнот</p>
      </div>
      
        { isAuth && (<div><NavLink className={s.link} to={"/"}>
          Главная
        </NavLink>
        <NavLink className={s.link} to={"/posts"}>
          Пациенты
        </NavLink>
        <NavLink className={s.link} to={"/new"}>
          Учет приемов
        </NavLink>
      </div>)}
      {isAuth ? (
        <button className={s.button} onClick={logoutHandler}>Выйти</button>
      ) : (
        <NavLink className={s.button} to={"/login"}>
          Войти
        </NavLink>
      )}
    </div>
  );
};
