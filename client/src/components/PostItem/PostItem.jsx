import React from "react";
import s from "./postItem.module.scss";

import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/post/postSlice";
import { Link } from "react-router-dom";
export const PostIt = ({ post }) => {
  const dispatch = useDispatch();

  const delFunk = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div>
      <div className={s.app}>
        <div className={s.container}>
          <Link to={`/${post._id}`}>

            <div className={s.fio}>{post.title}</div>
            <div className={s.text}>{post.text}</div>
            <div className={s.df}>
              <div className={s.description}>{post.description}</div>
              <div>
              {post?.imgUrl&&(<img src={`http://localhost:8000/${post.imgUrl}`} alt="img" />)}
              </div>
            </div>
          </Link>
          <button onClick={() => delFunk(post._id)}>Удалить</button>
        </div>

      </div>

      
    </div>
  );
};
