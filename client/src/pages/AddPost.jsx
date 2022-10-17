import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/slices/post/postSlice";
import s from "../styles/addpost.module.scss";
export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("description", description);
      data.append("image", image);
      dispatch(createPost(data));
      console.log(data)
      navigate("/posts");
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
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>

      <div>{image && <img src={URL.createObjectURL(image)} alt={image} />}</div>
      <button className={s.button} onClick={submitHandler}>Добавить пациента</button>
    </form>
  );
};
