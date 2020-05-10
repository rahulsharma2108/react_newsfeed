import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LineGraph from "./LineGraph";

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
describe("<LineGraph/>", () => {
  it("should render graph compoenent", () => {
    const wrapper = shallow(<LineGraph storiesList={mockStories} />);
    expect(wrapper.find(".graphContainer").length).toEqual(1);
  });
  it("should test hide story", () => {
    mockStories[0].hideStory = true;
    const wrapper = shallow(<LineGraph storiesList={mockStories} />);
    expect(wrapper.find(".graphContainer").length).toEqual(1);
  });
});
