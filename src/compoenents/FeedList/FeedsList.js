import React from "react";
import upvote from "../../images/upvote.gif";

import "./feedlist.css";
export default class FeedsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotesListId: [],
    };
  }
  compponentDidMount() {
    this.upvotePost = this.upvotePost.bind(this);
  }
  upvotePost(objectID, points) {
    const storyFromStorage = localStorage.getItem(`${objectID}`);
    if (storyFromStorage) {
      const parsedStorage = JSON.parse(storyFromStorage);
      const votedCount = parseInt(parsedStorage.votes);
      if (votedCount === 10) {
        return false;
      }
      parsedStorage.votes = votedCount + 1;
      localStorage.setItem(`${objectID}`, JSON.stringify(parsedStorage));
    } else {
      const storageObj = {};
      storageObj.votes = 1;
      localStorage.setItem(`${objectID}`, JSON.stringify(storageObj));
    }

    this.setState((prevState) => ({
      upvotesListId: [...prevState.upvotesListId, objectID],
    }));
    this.props.setUpdtedVote(objectID, points);
  }
  renderStories() {
    const { storiesList } = this.props;
    const { upvotesListId = [] } = this.state || {};
    return (
      <>
        {storiesList &&
          storiesList.map(
            ({ title, url, author, points, objectID, isUpVoted }) => {
              return (
                <div className={"newsItem"}>
                  <div className={"rank"}>{points}</div>
                  <div
                    className={isUpVoted ? "upvote green" : "upvote"}
                    onClick={() => this.upvotePost(objectID, points)}
                  ></div>
                  <div className={"storyTitle"}>{title}</div>
                </div>
              );
            }
          )}
      </>
    );
  }

  render() {
    return <div className={"listContainer"}>{this.renderStories()}</div>;
  }
}
