import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./NewPostForm.module.css";
import { error, info, success } from "../../utils/toastWrapper";
import Loader from "../../components/Loader";
const { Web3Storage } = require("web3.storage");
const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI2QTRCNTg3NzkxNGYzOUU3MDFkNWViNDhmMjRkNzZFOWUwOGMxZGMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDQ4MTMxMTU1MzksIm5hbWUiOiJuZnRwb2MifQ.QXhHNlGOxpDOh_vTPYTmUtJ8kvP9Zll0dzzb75MJN8c",
});

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState();
  const [loadingStatus, setLoadingStatus] = useState({
    isLoading: false,
    isSuccess: false
  });

  const errorWrapper = (message) => {
    setLoadingStatus({ isLoading: false, isSuccess: false });
    error(message);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoadingStatus({ isLoading: true, isSuccess: false });
      
      // if (!postTitle) return errorWrapper("Please add a title for your Post");
      // if (!postTitle.length > 10 || !postTitle.length < 100) return errorWrapper(`Title should be between 10-100 characters`);
      // if (!postContent) return errorWrapper("Please add content to your Post");
      // if (!postContent.length > 20 || !postContent.length < 500) return errorWrapper("Content should be be between 20-500 characters");
      // if (!imageFile) return errorWrapper("Please Upload an Image to Proceed");

      const cid = await client.put([imageFile]);
      const postImageUri = `https://ipfs.io/ipfs/${cid}/${imageFile.name}`;

      await props.handleCreatePost(postTitle, postContent, postImageUri);

      setLoadingStatus({ isLoading: false, isSuccess: true });
      props.onClose();
    } catch (e) {
      errorWrapper("Something went wrong")
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 50097152; // 2MB

    if (file && file.size > maxSizeInBytes) {
      return error("Image file size exceeds 50mb");
    }
    setImageFile(file);
    success("Image selected successfully");
  };

  return (
    <div className={classes.modal}>
      <div className={classes.popupHeader}>
        <h3 className={classes.formHeading}>Create post</h3>
        <span
          className={classes.closeBtn}
          onClick={() => props.setIsNewPostFormOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
      <form onSubmit={handleCreatePost} className={classes.formEl}>
        <div className={classes.inputEl}>
          <label htmlFor="title" className={classes.label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="What's on your mind...?"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className={classes.input}
            maxLength={100} // Added maxLength attribute
          />
        </div>
        <div className={classes.inputEl}>
          <label htmlFor="post" className={classes.label}>
            Post
          </label>
          <textarea
            id="post"
            type="text"
            placeholder="Add your post..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className={classes.textarea}
            rows={5}
            maxLength={1000} // Added maxLength attribute
          />
        </div>
        <div className={classes.submitBtn}>
          <div className={classes.btnEl}>
            {!loadingStatus.isSuccess && !loadingStatus.isLoading ? (
              <button className={classes.btn}>
                Post
              </button>
            ) : (
              <button style={{display:"flex", justifyContent:"center", alignItems:"center"}} className={classes.btn}>
                <Loader loading={loadingStatus.isLoading} color="#fff" />``
              </button>
            )}
          </div>
          <div className={classes.browseEl}>
            <label htmlFor="file" className={classes.browseTxt}>
              <i className="fa-solid fa-image"></i>
            </label>
            <input
              id="file"
              type="file"
              className={classes.fileInput}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};


const NewPostForm = ({ handleCreatePost, isNewPostFormOpen, setIsNewPostFormOpen }) => {
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={() => setIsNewPostFormOpen(false)} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay handleCreatePost={handleCreatePost} onClose={() => setIsNewPostFormOpen(false)} setIsNewPostFormOpen={setIsNewPostFormOpen} />,
        portalElement
      )}
    </>
  );
};

export default NewPostForm;
