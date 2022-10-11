import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, loginUser } from "../redux/slices/auth/authSlice";
import s from "../styles/login.module.scss";

export const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [ navigate, isAuth]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {}
  };

  return (
    <form className={s.app} onSubmit={(e) => e.preventDefault()}>
      <h1 className={s.h}>Авторизация</h1>
      <div className={s.container}>
        <label className={s.label}>
          Username:
          <input
            className={s.input}
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
          />
        </label>
        <label className={s.label}>
          Password:
          <input
            className={s.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="username"
          />
        </label>
        <button
          onClick={handleSubmit}
          className={s.buttonRegistr}
          type="submit"
        >
          Войти
        </button>
        <Link className={s.linkReg} to="/register">
          Хотите зарегистрироваться?
        </Link>
      </div>
    </form>
  );
};
