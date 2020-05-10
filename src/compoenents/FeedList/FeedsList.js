import React from "react";
import upvote from "../../images/upvote.gif";

import "./feedlist.css";

export const StortyActions = {
  HIDE: "hide",
  UPVOTE: "upvote",
};

export default class FeedsList extends React.Component {
  constructor(props) {
    super(props);
  }
  compponentDidMount() {
    this.upvotePost = this.upvotePost.bind(this);
  }
  storyActions(objectID, action) {
    const storyFromStorage = localStorage.getItem(`${objectID}`);
    if (storyFromStorage) {
      const parsedStorage = JSON.parse(storyFromStorage);
      const votedCount = parseInt(parsedStorage.votes);
      if (action === StortyActions.UPVOTE) {
        if (votedCount === 10) {
          return false;
        }
        parsedStorage.votes = votedCount + 1;
      } else if (action === StortyActions.HIDE) {
        parsedStorage.hideStory = true;
      }
      localStorage.setItem(`${objectID}`, JSON.stringify(parsedStorage));
    } else {
      const storageObj = {};
      if (action === StortyActions.UPVOTE) {
        storageObj.votes = 1;
      } else if (action === StortyActions.HIDE) {
        storageObj.hideStory = true;
      }
      localStorage.setItem(`${objectID}`, JSON.stringify(storageObj));
    }
    this.props.updateStory(objectID, action);
  }
  renderHeader() {
    return (
      <div className={"newsItem stories-header"}>
        <div className={"rank text-center"}>Votes</div>
        <div className={"upvoteWrapper"}>Upvote</div>
        <div className={"storyTitle text-center"}>Title</div>
        <div className={"author"}>Author</div>
        <div className={"hideButton actionCol"}>Action</div>
      </div>
    );
  }
  renderStories() {
    const { storiesList } = this.props;
    return (
      <>
        {storiesList &&
          storiesList.map(
            ({
              title,
              url,
              author,
              points,
              objectID,
              isUpVoted,
              hideStory,
            }) => {
              return (
                <>
                  {hideStory === undefined && (
                    <div className={"newsItem"}>
                      <div className={"rank text-center"}>{points}</div>
                      <div className={"upvoteWrapper"}>
                        <div
                          className={isUpVoted ? "upvote green" : "upvote"}
                          onClick={() =>
                            this.storyActions(objectID, StortyActions.UPVOTE)
                          }
                        ></div>
                      </div>
                      <div className={"storyTitle"}>
                        <a href={url} className={"titleLink"}>
                          {title}{" "}
                        </a>
                      </div>
                      <div className={"author"}>{author}</div>
                      <div
                        className={"hideButton"}
                        onClick={() =>
                          this.storyActions(objectID, StortyActions.HIDE)
                        }
                      >
                        Hide
                      </div>
                    </div>
                  )}
                </>
              );
            }
          )}
      </>
    );
  }

  render() {
    return (
      <div className={"listContainer"}>
        {this.renderHeader()}
        {this.renderStories()}
      </div>
    );
  }
}
