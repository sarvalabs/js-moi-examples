import React, { useEffect, useState } from "react";
import Post from "./Post";
import Loader from "./Loader";

const Dashboard = ({
  setIsNewPostFormOpen,
  loadingPost,
  wallet,
  showConnectModal,
  posts,
  handleUpvote,
  handleDownvote,
}) => {
  const popupHandler = () => {
    setIsNewPostFormOpen(true);
  };

  return (
    <section className="middleSection iPadView">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-3 col-md-3">{/* Voters Leaderboard */}</div>
          <div className="col-12 col-sm-6 col-md-6 orderTop">
            <div className="postBox">
              <div className="postRight">
                <div
                  className="createyourpost"
                  onClick={wallet ? popupHandler : () => showConnectModal(true)}
                >
                  <div className="yourProfile">{/* Profile Pic */}</div>
                  <input type="text" className="postText" placeholder="Create New Post" />
                </div>
              </div>
            </div>

            {!loadingPost ? (
              posts.map((post, index) => (
                <Post
                  id={index}
                  key={index}
                  handleUpvote={handleUpvote}
                  handleDownvote={handleDownvote}
                  wallet={wallet}
                  showConnectModal={showConnectModal}
                  post={post}
                />
              ))
            ) : (
              <div style={{ marginTop: "25px" }}>
                <Loader loading={loadingPost} size={"25px"} color={"#fff"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
