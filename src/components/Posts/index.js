import "./index.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Posts = () => {
  const navigate = useNavigate();

  const [selectedTag, setSelectedTag] = useState("#all");
  const [posts, setPosts] = useState([
    {
      title: "Laid off after 20 years...",
      tags: ["#advice", "#tech"],
      timePosted: "23m",
      author: "Anonymous2",
      content:
        "I've been working at Google for 19 years, going on 20 next month. I started as an intern on...",
    },
    {
      title: "I got hired at a FANG company",
      tags: ["#tech"],
      timePosted: "5h",
      author: "Anonymous29",
      content: "I just recently got hired at blah blah blah",
    },
  ]);

  const addNewPost = () => {
    setPosts([
      {
        title: "I got hired at a FANG company",
        tags: ["#tech"],
        timePosted: "5h",
        author: "Anonymous29",
        content: "I just recently got hired at blah blah blah",
      },
      ...posts,
    ]);
  };

  return (
    <>
      <div className="postsContainer">
        <input
          className="searchBar"
          type="text"
          placeholder="Search Outlet"
        ></input>
        <div className="headerButtons">
          <input
            className="buttons"
            type="button"
            onClick={() => {
              setSelectedTag("#advice");
            }}
            value="#advice"
          ></input>
          <input
            className="buttons"
            type="button"
            onClick={() => {
              setSelectedTag("#layoff");
            }}
            value="#layoff"
          ></input>
          <input
            className="buttons"
            type="button"
            onClick={() => {
              setSelectedTag("#tech");
            }}
            value="#tech"
          ></input>
          <input
            className="buttons"
            type="button"
            onClick={() => {
              setSelectedTag("#hopeful");
            }}
            value="#hopeful"
          ></input>
          <input
            className="buttons"
            type="button"
            onClick={() => {
              setSelectedTag("#misc");
            }}
            value="#misc"
          ></input>
          <input
            className="buttons"
            type="button"
            onClick={() => {
              setSelectedTag("#all");
            }}
            value="All filters"
          ></input>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="newPost"
            color="#ffffff"
            size="4x"
            onClick={() => addNewPost()}
          />
        </div>
        <div className="postContainer">
          {posts
            .filter(
              (post) =>
                selectedTag === "#all" || post.tags.includes(selectedTag)
            )
            .map((post) => {
              return (
                <div className="post">
                  <div className="postInfo">
                    <div>{post.title}</div>
                    <div>{post.timePosted}</div>
                    <div>by {post.author}</div>
                    <div>{post.tags}</div>
                  </div>
                  <p className="postText">{post.content}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Posts;
