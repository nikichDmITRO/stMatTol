import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { checkIsAuth, registerUser } from "../redux/slices/auth/authSlice";
import s from "../styles/register.module.scss";

export const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      console.log(username, password);
      setPassword("");
      setUserName("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [navigate, isAuth]);

  return (
    <form className={s.app} onSubmit={(e) => e.preventDefault()}>
      <h1 className={s.h}>Регистрация</h1>
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
          className={s.buttonRegistr}
          type="submit"
          onClick={handleSubmit}
        >
          Подтвердить регистрацию
        </button>
        <Link className={s.linkReg} to="/login">
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  );
};
