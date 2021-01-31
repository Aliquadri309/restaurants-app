import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "./App";

describe("App Component", () => {
  it("should render without crash", () => {
    const component = shallow(<App />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
