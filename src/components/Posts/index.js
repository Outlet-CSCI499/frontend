import "./index.scss";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => setPosts(res.data.allposts))
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
      .catch((err) => console.log(err));
  };

  const editPost = (id) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.findIndex((post) => post._id === id);
    updatedPosts[index].title = "New Title";
    updatedPosts[index].body = "New Body";
    axios
      .patch(`http://localhost:3000/posts/${id}`, updatedPosts[index])
      .then(() => setPosts(updatedPosts))
      .catch((err) => console.log(err));
  };

  const addPost = () => {
    axios
      .post("http://localhost:3000/posts", newPost)
      .then((res) => {
        setPosts([...posts, res.data.post]);
        setModalIsOpen(false);
        setNewPost({
          title: "",
          body: "",
          authorId: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Take a look at the most recent posts:</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Add your own post! </h2>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="newPost"
          color="#ffffff"
          size="4x"
          onClick={() => setModalIsOpen(true)}
        />
      </div>

      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => deletePost(post._id)}>Delete</button>
          <button onClick={() => editPost(post._id)}>Edit</button>
        </div>
      ))}
      {/* <button onClick={() => setModalIsOpen(true)}>Create Post</button> */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Create Post</h2>
        <form>
          <label>Title:</label>
          <br></br>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleChange}
          />
          <br></br>
          <label>Body:</label>
          <br></br>
          <textarea name="body" value={newPost.body} onChange={handleChange} />
        </form>
        <button onClick={addPost}>Done</button>
      </Modal>
    </div>
  );
};

export default App;

// const Posts = () => {
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newPostTitle, setNewPostTitle] = useState('');
//   const [newPostBody, setNewPostBody] = useState('');

//   const [selectedTag, setSelectedTag] = useState("#all");

//   async function handleNewPostSubmit(event) {
//         event.preventDefault();
//         const result = await axios.post('/posts', {
//           title: newPostTitle,
//           body: newPostBody
//         });
//         setPosts([...posts, result.data]);
//         setNewPostTitle('');
//         setNewPostBody('');
//         setShowModal(false);
//       }

//   const addNewPost = () => {
//     setPosts([
//       {
//         title: "I got hired at a FANG company",
//         tags: ["#tech"],
//         timePosted: "5h",
//         author: "Anonymous29",
//         content: "I just recently got hired at blah blah blah",
//       },
//       ...posts,
//     ]);
//   };

//   return (
//     <>
//       <div className="postsContainer">
//         <input
//           className="searchBar"
//           type="text"
//           placeholder="Search Outlet"
//         ></input>
//         <div className="headerButtons">
//           <input
//             className="buttons"
//             type="button"
//             onClick={() => {
//               setSelectedTag("#advice");
//             }}
//             value="#advice"
//           ></input>
//           <input
//             className="buttons"
//             type="button"
//             onClick={() => {
//               setSelectedTag("#layoff");
//             }}
//             value="#layoff"
//           ></input>
//           <input
//             className="buttons"
//             type="button"
//             onClick={() => {
//               setSelectedTag("#tech");
//             }}
//             value="#tech"
//           ></input>
//           <input
//             className="buttons"
//             type="button"
//             onClick={() => {
//               setSelectedTag("#hopeful");
//             }}
//             value="#hopeful"
//           ></input>
//           <input
//             className="buttons"
//             type="button"
//             onClick={() => {
//               setSelectedTag("#misc");
//             }}
//             value="#misc"
//           ></input>
//           <input
//             className="buttons"
//             type="button"
//             onClick={() => {
//               setSelectedTag("#all");
//             }}
//             value="All filters"
//           ></input>
//           <FontAwesomeIcon
//             icon={faPenToSquare}
//             className="newPost"
//             color="#ffffff"
//             size="4x"
//             onClick={() => addNewPost()}
//           />
//         </div>
//         <div className="postContainer">
//           {posts
//             .filter(
//               (post) =>
//                 selectedTag === "#all" || post.tags.includes(selectedTag)
//             )
//             .map((post) => {
//               return (
//                 <div className="post">
//                   <div className="postInfo">
//                     <div>{post.title}</div>
//                     <div>{post.timePosted}</div>
//                     <div>by {post.author}</div>
//                     <div>{post.tags}</div>
//                   </div>
//                   <p className="postText">{post.content}</p>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Posts;
