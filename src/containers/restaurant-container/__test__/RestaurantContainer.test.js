import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RestaurantContainer from "../RestaurantContainer";

describe("RestaurantContainer Component", () => {
  it("should render without crash", () => {
    const component = shallow(<RestaurantContainer />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
