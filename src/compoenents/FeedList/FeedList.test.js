import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FeedsList from "./FeedsList";

configure({ adapter: new Adapter() });

const mockStories = [
  {
    created_at: "2020-05-10T10:16:09.000Z",
    title: "Memetics",
    url: "https://en.wikipedia.org/wiki/Memetics",
    author: "tosh",
    points: 1,
    story_text: null,
    comment_text: null,
    num_comments: 0,
    story_id: null,
    story_title: null,
    story_url: null,
    parent_id: null,
    created_at_i: 1589105769,
    _tags: [],
    objectID: "23131543",
    _highlightResult: {
      title: {
        value: "Memetics",
        matchLevel: "none",
        matchedWords: [],
      },
      url: {
        value: "https://en.wikipedia.org/wiki/Memetics",
        matchLevel: "none",
        matchedWords: [],
      },
      author: {
        value: "tosh",
        matchLevel: "none",
        matchedWords: [],
      },
    },
  },
];
const updateStory = jest.fn();

describe("<FeedsList/>", () => {
  const wrapper = shallow(
    <FeedsList storiesList={mockStories} updateStory={updateStory} />
  );
  it("should render graph compoenent", () => {
    expect(wrapper.find(".listContainer").length).toEqual(1);
  });
  it("should upvote", () => {
    wrapper.find(".upvote").simulate("click", {}, "12345", "upvote");
    expect(updateStory).toHaveBeenCalled();
  });
  it("should hide story", () => {
    wrapper.find(".hideButton").at(1).simulate("click", {}, "12345", "hide");
    expect(updateStory).toHaveBeenCalled();
  });
});
