import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import NewPostForm from "./components/NewPostForm/NewPostForm";
import Dashboard from "./components/Dashboard";
import ConnectModal from "./components/ConnectModal";
import { toastError, toastSuccess, toastInfo } from "./utils/toastWrapper";
import "./app.css";
import logic from "./interface/logic";

function App() {
  const [wallet, setWallet] = useState();
  const [posts, setPosts] = useState([]);
  const [isNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPosts();
  }, [wallet]);

  const updateWallet = (wallet) => {
    setWallet(wallet);
  };
  const showConnectModal = (value) => {
    setIsModalOpen(value);
  };

  const getPosts = async () => {
    try {
      setLoadingPost(true);

      let { posts } = await logic.GetPosts();
      if (wallet) posts = await getUserVote(posts);
      posts.reverse();
      setPosts(posts);

      setLoadingPost(false);
    } catch (error) {
      setLoadingPost(false);
      toastError(error.message);
    }
  };

  const getUserVote = async (posts) => {
    for (let i = 0; i < posts.length; i++) {
      const { vote } = await logic.GetUserVote(wallet.address, posts[i].id);
      posts[i].usersVote = vote;
    }
    return posts;
  };

  const handleCreatePost = async (content) => {
    try {
      const { createdPost } = await logic.CreatePost(wallet, content);

      setPosts([createdPost, ...posts]);
      toastSuccess("Created Post successfully");
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await logic.Upvote(wallet, id);

      const tPost = posts.map((post) => {
        if (post.id === id) {
          if (post.usersVote == 2) {
            post.downvotes--;
          }
          post.upvotes++;
          post.usersVote = 1;
        }
        return post;
      });

      setPosts(tPost);
      toastSuccess("Successfully Upvoted");
    } catch (error) {
      toastError(error.message);
    }
  };

  const handleDownvote = async (id) => {
    try {
      await logic.Downvote(wallet, id);

      const tPost = posts.map((post) => {
        if (post.id === id) {
          if (post.usersVote == 1) {
            post.upvotes--;
          }
          post.usersVote = 2;
          post.downvotes++;
        }
        return post;
      });

      setPosts(tPost);
      toastSuccess("Successfully Downvoted");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <>
      <Navbar
        updateWallet={updateWallet}
        wallet={wallet}
        showConnectModal={showConnectModal}
      />
      <Toaster />
      <ConnectModal
        isModalOpen={isModalOpen}
        showConnectModal={showConnectModal}
        updateWallet={updateWallet}
      />

      {isNewPostFormOpen && (
        <NewPostForm
          handleCreatePost={handleCreatePost}
          isNewPostFormOpen={isNewPostFormOpen}
          setIsNewPostFormOpen={setIsNewPostFormOpen}
        />
      )}

      <Dashboard
        loadingPost={loadingPost}
        wallet={wallet}
        showConnectModal={showConnectModal}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        posts={posts}
        setIsNewPostFormOpen={setIsNewPostFormOpen}
      />
    </>
  );
}

export default App;
