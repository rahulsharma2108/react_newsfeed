import React from "react";

import Header from "../Header/Header";
import home from "./home.css";
import FeedsList from "../FeedList/FeedsList";
import LineGraph from "./LineGraph";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    let data = [];
    let page;
    if (props.staticContext) {
      data = props.staticContext.hits;
      page = parseInt(props.staticContext.page) + 1;
    } else {
      data = window.__storiesList__;
      page = parseInt(window.__page__) + 1;
      delete window.__storiesList__;
      delete window.__page__;
    }
    this.state = { storiesList: data, page };
  }

  componentDidMount() {
    const { storiesList } = this.state;
    const newStorylist = storiesList.map((story) => {
      const storyPoints = story.points;
      const storageObj = localStorage.getItem(story.objectID);
      if (storageObj) {
        const storeageVotes = JSON.parse(storageObj).votes;
        story.points += storeageVotes;
        story.isUpVoted = true;
      }
      return story;
    });
    this.setState({ storiesList: newStorylist });
  }

  updateVotes(objectID, points) {
    const { storiesList } = this.state;
    const story = storiesList.find((story) => story.objectID === objectID);
    story.points += 1;
    story.isUpVoted = true;
    this.setState({ storiesList: storiesList });
  }

  render() {
    return (
      <div className={"container"}>
        <Header />
        <FeedsList
          storiesList={this.state.storiesList}
          setUpdtedVote={(objectId, points) =>
            this.updateVotes(objectId, points)
          }
        />
        <a href={`/news?page=${this.state.page}`}>More</a>

        <LineGraph storiesList={this.state.storiesList}></LineGraph>
        {/*Footer/> */}
      </div>
    );
  }
}
