import upvoteSvg from "../assets/upvote.svg";
import downvoteSvg from "../assets/downvote.svg";
import { useState } from "react";
import Loader from "./Loader";
import { numToHex } from "js-moi-sdk";
import { truncateStr } from "../utils/truncate";

const Post = ({ post, handleUpvote, handleDownvote }) => {
  // Loader
  const [downvoting, setDownvoting] = useState(false);
  const [upvoting, setUpvoting] = useState(false);

  return (
    <div className="post">
      <div className="postinfo">
        <p className="post-creator">By - {`0x${truncateStr(numToHex(post.creator), 21)}`}</p>
        <p className="post-content">{post.content}</p>
        <div className="post-action">
          <div className="row">
            <div
              className="col-6 col-sm-6 col-md-6"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                setUpvoting(true);
                await handleUpvote(post.id);
                setUpvoting(false);
              }}
            >
              {!upvoting ? (
                <button
                  disabled={post.usersVote === 1}
                  className={post.usersVote === 1 ? "btnDao agreeLight" : "btnDao agreeBTN"}
                >
                  <img className="icon" src={upvoteSvg} alt="check" />{" "}
                  {post.usersVote === 1 ? "Upvoted" : "Upvote"}
                  <span className="votes">{post.upvotes}</span>
                </button>
              ) : (
                <button className="btnDao agreeBTN">
                  <Loader loading={upvoting} color="#fff" />
                </button>
              )}
            </div>
            <div
              className="col-6 col-sm-6 col-md-6"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                setDownvoting(true);
                await handleDownvote(post.id);
                setDownvoting(false);
              }}
            >
              {!downvoting ? (
                <button
                  disabled={post.usersVote === 2}
                  className={post.usersVote === 2 ? "btnDao disagreeLight" : "btnDao disagreeBTN"}
                >
                  <img className="icon" src={downvoteSvg} alt="x" />{" "}
                  {post.usersVote === 2 ? "Downvoted" : "Downvote"}
                  <span className="votes">{post.downvotes}</span>
                </button>
              ) : (
                <button className="btnDao disagreeBTN">
                  <Loader loading={downvoting} color="#fff" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
