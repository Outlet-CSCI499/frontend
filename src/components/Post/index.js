import "./index.scss";
import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { Grid } from '@mantine/core';
import {
  SegmentedControl,
  TextInput,
  Center,
  Box,
  Modal,
  Text,
  Button,
  Paper,
  Textarea,
  Divider,
  NumberInput,
  Group,
  ActionIcon,
  rem,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faClockRotateLeft,
  faArrowUpLong,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Vote = ({ postId, votes, getPostsNew }) => {
  const [value, setValue] = useState(votes);
  const handlers = useRef();

  const upvote = async () => {
    await fetch(`http://localhost:3001/posts/${postId}/upvote`, {
      method: "POST",
    });

    getPostsNew();
  };

  const downvote = async () => {
    await fetch(`http://localhost:3001/posts/${postId}/downvote`, {
      method: "POST",
    });

    getPostsNew();
  };

  return (
    <Group spacing={5}>
      <ActionIcon
        size={42}
        variant="default"
        onClick={() => {
          handlers.current.decrement();
          downvote();
        }}
      >
        –
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        handlersRef={handlers}
        step={1}
        styles={{ input: { width: rem(54), textAlign: "center" } }}
      />

      <ActionIcon
        size={42}
        variant="default"
        onClick={() => {
          handlers.current.increment();
          upvote();
        }}
      >
        +
      </ActionIcon>
    </Group>
  );
};

const Post = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("recent");
  const [createOpened, { open: createOpen, close: createClose }] =
    useDisclosure(false);
  const [postOpened, { open: postOpen, close: postClose }] =
    useDisclosure(false);

  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);

  const [createPostTitle, setCreatePostTitle] = useState("");
  const [createPostBody, setCreatePostBody] = useState("");

  const [selectedPost, setSelectedPost] = useState({});

  const { currentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser);

  const discardPost = () => {
    createClose();
    setCreatePostTitle("");
    setCreatePostBody("");
  };

  const submitPost = async () => {
    createClose();
    console.log(createPostTitle, createPostBody, currentUser.user.id);
    await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createPostTitle,
        body: createPostBody,
        authorId: currentUser.user.id,
      }),
    });
    setCreatePostTitle("");
    setCreatePostBody("");
    getPosts();
  };

  const openPost = (id, authorid, title, time, body, votes) => {
    setSelectedPost({ id, authorid, title, time, body, votes });
    postOpen();
    getReplies();
  };

  const getPosts = async () => {
    const allPosts = await fetch("http://localhost:3001/posts", {
      method: "GET",
    }).then((res) => res.json());

    console.log(Array.from(allPosts.allposts));

    setPosts(allPosts.allposts);
  };

  const deletePost = async () => {
    postClose();
    await fetch(`http://localhost:3001/posts/${selectedPost.authorid}`, {
      method: "DELETE",
    });

    getPosts();
  };

  const editPost = async () => {
    await fetch(`http://localhost:3001/posts/${selectedPost.id}`, {
      method: "POST",
    });
  };

  const getReplies = async () => {
    const allReplies = await fetch(`http://localhost:3001/replies/posts/${selectedPost.authorid}`, {
    method: "GET",
    }).then((res) => res.json());

    console.log(Array.from(allReplies.replies));

    setReplies(allReplies.replies);
  }

  const submitReply = async () => {
    await fetch(`http://localhost:3001/replies/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createPostTitle,
        body: createPostBody,
        authorId: currentUser.user.id,
      }),
    });
    setCreatePostTitle("");
    setCreatePostBody("");
    getPosts();
  }

  const deleteReply = async () => {
    postClose();
    await fetch(`http://localhost:3001/replies/posts/${selectedPost.authorid}`, {
      method: "DELETE",
    });

    getPosts();
  };

  const editReply = async () => {
    await fetch(`http://localhost:3001/replies/posts/${selectedPost.id}`, {
      method: "POST",
    });
  };

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  useEffect(() => {
    getPosts();
    
  }, []);

  return (
    <>
      <div className="postContainer">
        <div className="posts">
          <div className="postOptionHeader">
            <div className="postOptions">
              <TextInput
                placeholder="Search Outlet"
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />}
                size="xl"
                className="postSearch"
                value={searchInput}
                onChange={(event) => setSearchInput(event.currentTarget.value)}
              />

              <Button size="xl" color="gray" onClick={createOpen}>
                <FontAwesomeIcon icon={faPenToSquare} size="xl" />
              </Button>
            </div>

            <SegmentedControl
              value={filter}
              onChange={setFilter}
              data={[
                {
                  label: (
                    <Center>
                      <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
                      <Box ml={10}>Recent</Box>
                    </Center>
                  ),
                  value: "recent",
                },
                {
                  label: (
                    <Center>
                      <FontAwesomeIcon icon={faArrowUpLong} size="sm" />
                      <Box ml={10}>Top Rated</Box>
                    </Center>
                  ),
                  value: "top",
                },
              ]}
              size="xl"
            />
          </div>

          <div className="userPosts">
            {filter === "recent" &&
              posts
                .filter(
                  (post) =>
                    post.title.includes(searchInput) ||
                    post.title === searchInput
                )
                .map((post) => {
                  return (
                    <Paper
                      shadow="sm"
                      p="md"
                      withBorder
                      className="post"
                      onClick={() =>
                        openPost(
                          post.id,
                          post.authorId,
                          post.title,
                          post.created,
                          post.body,
                          post.upvote - post.downvote
                        )
                      }
                      key={post.title + post.created}
                    >
                      <div className="postInfo">
                        <Text className="postTitle">{post.title}</Text>
                        <Text className="postTime">
                          {timeSince(new Date(post.created))} ago
                        </Text>
                        <Text className="postAuthor">
                          by anonymous user {post.authorId}
                        </Text>
                      </div>

                      <Text className="postContent">{post.body}</Text>
                    </Paper>
                  );
                })}

            {filter === "top" &&
              posts
                .filter(
                  (post) =>
                    post.title.includes(searchInput) ||
                    post.title === searchInput
                )
                .sort((a, b) => b.upvote - b.downvote - (a.upvote - a.downvote))
                .map((post) => {
                  return (
                    <Paper
                      shadow="sm"
                      p="md"
                      withBorder
                      className="post"
                      onClick={() =>
                        openPost(
                          post.id,
                          post.authorId,
                          post.title,
                          post.created,
                          post.body,
                          post.upvote - post.downvote
                        )
                      }
                      key={post.title + post.created}
                    >
                      <div className="postInfo">
                        <Text className="postTitle">{post.title}</Text>
                        <Text className="postTime">
                          {timeSince(new Date(post.created))} ago
                        </Text>
                        <Text className="postAuthor">
                          by anonymous user {post.authorId}
                        </Text>
                      </div>

                      <Text className="postContent">{post.body}</Text>
                    </Paper>
                  );
                })}
          </div>
        </div>
      </div>

      <Modal
        size="100em"
        opened={createOpened}
        onClose={createClose}
        title={<Text fz="2em">Create a post</Text>}
        centered
      >
        <TextInput
          label="Post Title"
          size="xl"
          value={createPostTitle}
          onChange={(event) => setCreatePostTitle(event.currentTarget.value)}
          withAsterisk
        />
        <br />
        <Textarea
          label="Post Body"
          size="xl"
          minRows={10}
          maxRows={20}
          value={createPostBody}
          onChange={(event) => setCreatePostBody(event.currentTarget.value)}
          withAsterisk
        />
        <br />

        <div className="postButtons">
          <Button size="xl" color="red" onClick={() => discardPost()}>
            Discard
          </Button>
          <Button size="xl" color="gray" onClick={() => submitPost()}>
            Post
          </Button>
        </div>
      </Modal>

      <Modal
        size="100em"
        opened={postOpened}
        onClose={postClose}
        // title={<Text fz="2em">{selectedPost.title}</Text>}
        title={
          <div className="modalPostInfo">
            <div className="modalPostTitle">{selectedPost.title}</div>
            <div>{timeSince(new Date(selectedPost.time))} ago</div>
            <div>by anonymous user {selectedPost.authorid}</div>
          </div>
        }
        centered
      >
        <Divider my="sm" />
        <div className="modalPostBody">{selectedPost.body}</div>
        <Divider my="sm" />
        {}
        {selectedPost.authorid === currentUser.user.id && (
          <>
            <div className="authorButtons">
              {/* <div>Edit</div> */}
              <div onClick={() => deletePost(selectedPost.id)}>Delete</div>
            </div>
            <Divider my="sm" />
          </>
        )}
        <Vote
          postId={selectedPost.id}
          votes={selectedPost.votes}
          getPostsNew={getPosts}
        />
        <div>
          <Textarea
            label="Comment"
            size="xl"
            minRows={3}
            maxRows={5}
            value={createPostBody}
            onChange={(event) => setCreatePostBody(event.currentTarget.value)}
          />
          <br></br>
          <div className="commentButton">
            <Button size="xl" color="gray" onClick={() => submitReply()}>
              Post
            </Button>
          </div>
        </div>
        <br></br>
        <div className="replySection">
        <Grid gutter="md">
        {replies.map((reply) => (
          <Grid.Col span={12} key={reply.id}>
            <Paper shadow="sm" padding="md" radius="md">
              <div className="replyInfo">
                <Text className="replyAuthor">by anonymous user {reply.authorId}</Text>
                <Text className="replyTime">{timeSince(new Date(reply.created))} ago</Text>
              </div>
              <Text className="replyContent">{reply.body}</Text>
            </Paper>
          </Grid.Col>
        ))}
        </Grid>
          {/* <Paper withBorder>Comment goes here</Paper> */}
        </div>
        
      </Modal>
    </>
  );
};

export default Post;
