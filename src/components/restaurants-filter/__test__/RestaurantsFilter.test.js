import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RestaurantsFilter from "../RestaurantsFilter";

describe("RestaurantsFilter Component", () => {
  it("should render component without crash", () => {
    const states = ["All", "VA", "NY", "FL", "NC"];
    const genres = [
      "All",
      "American",
      "Seafood",
      "International",
      "Asian",
      "Cafe",
    ];
    const component = shallow(
      <RestaurantsFilter states={states} genres={genres} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should match the initial state value", () => {
    const states = ["All", "VA", "NY", "FL", "NC"];
    const genres = [
      "All",
      "American",
      "Seafood",
      "International",
      "Asian",
      "Cafe",
    ];
    const component = shallow(
      <RestaurantsFilter states={states} genres={genres} />
    );
    const searchInput = component.find(".filters__input-group__input").at(0);
    const statesInput = component.find(".filters__input-group__input").at(1);
    const genreInput = component.find(".filters__input-group__input").at(2);
    expect(searchInput.props().value).toBe("");
    expect(statesInput.props().value).toBe("All");
    expect(genreInput.props().value).toBe("All");
  });

  it("should change the state, genre, search input values on change event", () => {
    const states = ["All", "VA", "NY", "FL", "NC"];
    const genres = [
      "All",
      "American",
      "Seafood",
      "International",
      "Asian",
      "Cafe",
    ];
    const mockFun = jest.fn();
    const component = shallow(
      <RestaurantsFilter
        states={states}
        genres={genres}
        onFilterChange={mockFun}
      />
    );
    // state dropdown on change
    const statesInput = component.find(".filters__input-group__input").at(1);
    expect(statesInput.props().value).toBe("All");
    statesInput.simulate("change", {
      target: { name: "stateFilter", value: "VA" },
    });
    const statesInput1 = component.find(".filters__input-group__input").at(1);
    expect(statesInput1.props().value).toBe("VA");

    // genre dropdown on change
    const genreInput = component.find(".filters__input-group__input").at(2);
    expect(genreInput.props().value).toBe("All");
    genreInput.simulate("change", {
      target: { name: "genreFilter", value: "American" },
    });
    const genreInput1 = component.find(".filters__input-group__input").at(2);
    expect(genreInput1.props().value).toBe("American");

    // search input on change
    const searchInput = component.find(".filters__input-group__input").at(0);
    expect(searchInput.props().value).toBe("");
    searchInput.simulate("change", {
      target: { name: "searchBy", value: "city Name" },
    });
    const searchInput1 = component.find(".filters__input-group__input").at(0);
    expect(searchInput1.props().value).toBe("city Name");
  });

  it("should call filter method on input change", () => {
    const states = ["All", "VA", "NY", "FL", "NC"];
    const genres = [
      "All",
      "American",
      "Seafood",
      "International",
      "Asian",
      "Cafe",
    ];
    const mockFun = jest.fn();
    const component = shallow(
      <RestaurantsFilter
        states={states}
        genres={genres}
        onFilterChange={mockFun}
      />
    );

    const genreInput = component.find(".filters__input-group__input").at(2);
    expect(genreInput.props().value).toBe("All");
    genreInput.simulate("change", {
      target: { name: "genreFilter", value: "American" },
    });

    expect(mockFun).toHaveBeenCalled();
    expect(mockFun).toHaveBeenCalledWith({
      stateFilter: "All",
      genreFilter: "American",
      searchBy: "",
    });
  });
});
