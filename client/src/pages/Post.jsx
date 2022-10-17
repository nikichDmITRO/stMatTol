import axios from "../utils/axios";
import React from "react";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const Post = () => {
  const [post, setPost] = useState("");

  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/post/${params.id}`);
    setPost(data);
    console.log(params.id)
    }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div>
      <button>Назад</button>
      <div>
        <Link to={`/${params.id}/edit`} >
      edit
        </Link>
        <div>{post.title}</div>
        <div>{post.text}</div>
        <div>
          <div>{post.description}</div>
          <div>
            {post?.imgUrl&&(<img src={`http://localhost:8000/${post.imgUrl}`} alt="img" />)}
            
          </div>
        </div>
      </div>
    </div>
  );
};
