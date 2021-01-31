import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RestaurantsTable from "../RestaurantsTable";

describe("RestaurantsTable Component", () => {
  it("should render without crash", () => {
    const list = [];
    const sortBy = jest.fn();
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const component = shallow(
      <RestaurantsTable
        list={list}
        sortBy={sortBy}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should have table rows when list has data", () => {
    const list = [
      {
        id: "f223fdd0-4adc-423e-9747-980a66c256ca",
        name: "Old Hickory Steakhouse",
        address1: "201 Waterfront St",
        city: "Oxon Hill",
        state: "MD",
        zip: "20745",
        lat: "38.782098",
        long: "-77.017492",
        telephone: "(301) 965-4000",
        tags: "Social,Food and Dining,Restaurants,Steakhouses",
        website: "http://www.gaylordnational.com",
        genre: "Steak,American,Contemporary,Seafood,Cafe",
        hours: "Open Daily 5:30 PM-10:00 PM",
        attire: "business casual",
      },
      {
        id: "00b35e1a-82b1-4988-b8b9-6df826db2818",
        name: "Matsuhisa",
        address1: "303 E Main St",
        city: "Aspen",
        state: "CO",
        zip: "81611",
        lat: "39.190723",
        long: "-106.82031",
        telephone: "(970) 544-6628",
        tags:
          "Social,Food and Dining,Restaurants,Japanese,Social,Food and Dining,Restaurants,Sushi",
        website: "http://www.matsuhisaaspen.com",
        genre: "Japanese,Sushi,Asian,Contemporary,Seafood",
        hours: "Open Daily 5:30 PM-9:00 PM",
        attire: "business casual",
      },
    ];
    const sortBy = jest.fn();
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const component = shallow(
      <RestaurantsTable
        list={list}
        sortBy={sortBy}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
    const tbody = component.find("tbody tr");
    expect(tbody.length).toBe(2);
  });
  it("should display no data when empty list passed", () => {
    const list = [];
    const sortBy = jest.fn();
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const component = shallow(
      <RestaurantsTable
        list={list}
        sortBy={sortBy}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
    const tbody = component.find("tbody tr");
    expect(tbody.length).toBe(1);
    const noTextNode = component.find(".no-resultts-text");
    expect(noTextNode).toBeDefined();
    expect(noTextNode.text()).toBe(
      "No results found. Please change the filter criteria."
    );
  });
  it("should call sort method when name , state column clicked", () => {
    const list = [];
    const sortBy = jest.fn();
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const component = shallow(
      <RestaurantsTable
        list={list}
        sortBy={sortBy}
        onNext={onNext}
        onPrev={onPrev}
      />
    );
    const nameColumn = component.find("thead tr th").at(0);
    const stateColumn = component.find("thead tr th").at(2);
    nameColumn.simulate("click");
    expect(sortBy).toHaveBeenCalledWith("name");
    stateColumn.simulate("click");
    expect(sortBy).toHaveBeenCalledWith("state");
  });
});
