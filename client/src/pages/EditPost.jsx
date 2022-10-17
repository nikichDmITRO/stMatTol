import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "../utils/axios";

import { updatePost } from "../redux/slices/post/postSlice";

import s from "../styles/addpost.module.scss";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/post/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setDescription(data.description);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandlerED = () => {
    try {
      // const up = {
      //   title: "",
      //   text: "",
      //   description: "",
      //   id: "",
      //   imgUrl: "",
      // };
      // up.title = title;

      // up.text = text;
      // up.description = description;
      // up.id = params.id;
      // up.imgUrl = newImage;
      // console.log(newImage)
      // console.log(newImage.name)
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('description', description)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
      

      console.log(updatedPost);
    } catch (error) {}
  };

  return (
    <form className={s.add} onSubmit={(e) => e.preventDefault()}>
      <label className={s.label}>
        ФИО пациента:
        <input
          type="text"
          className={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className={s.label}>
        Диагноз пациента:
        <input
          type="text"
          className={s.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <label className={s.label}>
        Описание:
        <textarea
          type="text"
          className={s.inputDes}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className={s.labelAdd}>
        Прикрепить изображение:
        <input
          type="file"
          className={s.addFile}
          onChange={(e) => {
            setNewImage(e.target.files[0]);

            setOldImage("");
          }}
        />
      </label>

      <div>
        {oldImage && (
          <img src={`http://localhost:8000/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <button className={s.button} onClick={submitHandlerED}>
        Добавить пациента
      </button>
    </form>
  );
};
