import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "./Header";

configure({ adapter: new Adapter() });

describe("<Header/>", () => {
  const wrapper = shallow(<Header />);
  it("should render header", () => {
    expect(wrapper.find(".header").length).toEqual(1);
  });
});
