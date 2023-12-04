import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./NewPostForm.module.css";
import { error, info, success } from "../../utils/toastWrapper";
import Loader from "../../components/Loader";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const [postContent, setPostContent] = useState("");
  const [loadingStatus, setLoadingStatus] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const errorWrapper = (message) => {
    setLoadingStatus({ isLoading: false, isSuccess: false });
    error(message);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoadingStatus({ isLoading: true, isSuccess: false });

      await props.handleCreatePost(postContent);

      setLoadingStatus({ isLoading: false, isSuccess: true });
      props.onClose();
    } catch (e) {
      errorWrapper("Something went wrong");
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.popupHeader}>
        <h3 style={{ color: "#000" }} className={classes.formHeading}>
          Create post
        </h3>
        <span className={classes.closeBtn} onClick={() => props.setIsNewPostFormOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
      <form onSubmit={handleCreatePost} className={classes.formEl}>
        <div className={classes.inputEl}>
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
              <button className={classes.btn}>Post</button>
            ) : (
              <button
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                className={classes.btn}
              >
                <Loader loading={loadingStatus.isLoading} color="#fff" />
                ``
              </button>
            )}
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
        <ModalOverlay
          handleCreatePost={handleCreatePost}
          onClose={() => setIsNewPostFormOpen(false)}
          setIsNewPostFormOpen={setIsNewPostFormOpen}
        />,
        portalElement
      )}
    </>
  );
};

export default NewPostForm;
