import React from "react";
import s from "./postItem.module.scss";

export const PostIt = ({ post }) => {
  
  return (
    <div className={s.app}>
      <div className={s.container}>
        <div className={s.fio}>{post.title}</div>
        <div>{post.text}</div>
        <div>
          <img src={`http://localhost:8000/${post.imgUrl}`} alt="" />
        </div>
      </div>
    </div>
  );
};
