import React from "react";
import s from "./postItem.module.scss";

import { useDispatch } from "react-redux";
import { deletePost, getAllPosts } from "../../redux/slices/post/postSlice";
export const PostIt = ({ post, id }) => {
  const dispatch = useDispatch();

  const delFunk = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className={s.app}>
      <div className={s.container}>
        <div className={s.fio}>{post.title}</div>
        <div className={s.text}>{post.text}</div>
        <div className={s.df}>
          <div className={s.description}>{post.description}</div>
          <div>
            <img src={`http://localhost:8000/${post.imgUrl}`} alt="" />
          </div>
        </div>
        <button onClick={() => delFunk(post._id)}>Удалить</button>
      </div>
    </div>
  );
};
