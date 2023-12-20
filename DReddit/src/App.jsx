import React, { useEffect, useState } from "react";
import { gettingLogicDriver } from "./utils/gettingLogicDriver";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import NewPostForm from "./components/NewPostForm/NewPostForm";
import Dashboard from "./components/Dashboard";
import MnemonicModal from "./components/MnemonicModal";
import { validateMnemonic } from "js-moi-sdk";

// ------- Update with your Logic Id ------------------ //
const logicId = "0x080000643e328b31ccaab66c37bcb9869273b343d5f2aca687bf47f533437d3069884d";

function App() {
  const [posts, setPosts] = useState([]);
  const [isNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [logicDriver, setLogicDriver] = useState();

  useEffect(() => {
    if (!logicDriver) return;

    getPosts();
  }, [logicDriver]);

  const handleLogin = async (mnemonic) => {
    if (!validateMnemonic(mnemonic)) {
      return setError("Incorrect mnemonic");
    }
    setMnemonic(mnemonic);
    setIsModalOpen(false);
    setError("");
    const logicDriver = await gettingLogicDriver(logicId, mnemonic, "m/44'/6174'/7020'/0/0");
    setLogicDriver(logicDriver);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError("");
  };

  const showMnemonicModal = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setMnemonic("");
    setError("");
    setPosts([]);
  };

  const getPosts = async () => {
    try {
      setLoadingPost(true);
      let tPosts = await logicDriver.persistentState.get("posts");
      tPosts = await getUserVote(tPosts);
      tPosts.reverse();
      setPosts(tPosts);
      setLoadingPost(false);
    } catch (error) {
      setLoadingPost(false);
      console.log(error);
    }
  };

  const getUserVote = async (posts) => {
    for (let i = 0; i < posts.length; i++) {
      const readIx = await logicDriver.routines.getUserVote([posts[i].id]).call({
        fuelPrice: 1,
        fuelLimit: 1000,
      });
      const { vote } = (await readIx.result()).output;
      posts[i].usersVote = vote;
    }
    return posts;
  };

  const handleCreatePost = async (content) => {
    try {
      const ix = await logicDriver.routines.CreatePost([content]).send({
        fuelPrice: 1,
        fuelLimit: 1000,
      });
      const { post: newPost } = (await ix.result()).output;
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const ix = await logicDriver.routines.Upvote([id]).send({
        fuelPrice: 1,
        fuelLimit: 1000,
      });
      await ix.wait();
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async (id) => {
    try {
      const ix = await logicDriver.routines.Downvote([id]).send({
        fuelPrice: 1,
        fuelLimit: 1000,
      });
      await ix.wait();
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        handleLogout={handleLogout}
        mnemonic={mnemonic}
        showMnemonicModal={showMnemonicModal}
      />
      <Toaster />
      <MnemonicModal
        error={error}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        handleLogin={handleLogin}
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
        mnemonic={mnemonic}
        showMnemonicModal={showMnemonicModal}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        posts={posts}
        setIsNewPostFormOpen={setIsNewPostFormOpen}
      />
    </>
  );
}

export default App;
