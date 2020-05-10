import React from "react";

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
        <div className={"rank cell"}>Votes</div>
        <div className={"upvoteWrapper cell"}>Upvote</div>
        <div className={"storyTitle cell"}>Title</div>
        <div className={"author cell"}>Author</div>
        <div className={"hideButton actionCol cell"}>Action</div>
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
                <React.Fragment key={objectID}>
                  {hideStory === undefined && (
                    <div className={"newsItem"}>
                      <div className={"rank cell"}>{points}</div>
                      <div className={"upvoteWrapper cell"}>
                        <div
                          className={isUpVoted ? "upvote green" : "upvote"}
                          onClick={() =>
                            this.storyActions(objectID, StortyActions.UPVOTE)
                          }
                        ></div>
                      </div>
                      <div className={"storyTitle cell"}>
                        <a href={url} className={"titleLink"}>
                          {title}{" "}
                        </a>
                      </div>
                      <div className={"author cell"}>{author}</div>
                      <div
                        className={"hideButton cell"}
                        onClick={() =>
                          this.storyActions(objectID, StortyActions.HIDE)
                        }
                      >
                        Hide
                      </div>
                    </div>
                  )}
                </React.Fragment>
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
