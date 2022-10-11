import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostIt } from "../components/PostItem/PostItem";

import { getAllPosts } from "../redux/slices/post/postSlice";

export const Posts = () => {

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postys);
  

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div>
     
      <div>
        {posts?.map((post, ind) => (
          <PostIt key={ind} post={post} />
        ))}

      
      </div>
    </div>
  );
};
