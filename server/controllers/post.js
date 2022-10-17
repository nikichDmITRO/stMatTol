import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
  try {
    const { title, text, description } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        description,
        imgUrl: fileName,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      description,
      imgUrl: "",
    });
    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
    return res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: "Что то не так" });
  }
};

// export const getAll = async (req, res) => {
//   try {
//     const posts = await User.posts.find().sort("-createdAt");
//     if (!posts) {
//       return res.json({ message: "Постов нет" });
//     }
//     res.json(posts);
//   } catch (error) {
//     res.json({ message: "Что то пошло не так" });
//   }
// };

export const getMyPosts = async (req, res) => {
  try {
      const user = await User.findById(req.userId)
      const list = await Promise.all(
          user.posts.map((post) => {
              return Post.findById(post._id)
          }),
      )

      res.json(list)
  } catch (error) {
      res.json({ message: 'Что-то пошло не так.' })
  }
}
export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id);
    res.json(post);
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const posts = await Post.findByIdAndDelete(req.params.id);
    if (!posts) {
      return res.json({ message: "такого поста не существует" });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({
      posts,
      message: "Все хорошо",
    });
  } catch (error) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, text, description, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name
      const __dirname = dirname(fileURLToPath(import.meta.url))
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
      post.imgUrl = fileName || ''
      }

    post.title = title;
    post.text = text;
    post.description = description;
    
    await post.save();
    res.json(post);
  } catch (error) {
    res.json({ message: "Что то пошло не так сука" });
  }
};
