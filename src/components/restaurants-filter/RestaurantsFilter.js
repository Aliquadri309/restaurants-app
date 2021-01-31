import React, { useState } from "react";
import "./RestaurantsFilter.scss";

const RestaurantsFilter = ({ states, genres, onFilterChange }) => {
  const [stateVal, setStateVal] = useState("All");
  const [genreVal, setGenreVal] = useState("All");
  const [searchBy, setSearchBy] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "stateFilter") {
      setStateVal(value);
    } else if (name === "genreFilter") {
      setGenreVal(value);
    } else if (name === "searchBy") {
      setSearchBy(value);
    }
    if (
      name === "stateFilter" ||
      name === "genreFilter" ||
      (name === "searchBy" && (event.key === "Enter" || value === ""))
    ) {
      onFilterChange({
        stateFilter: name === "stateFilter" ? value : stateVal,
        genreFilter: name === "genreFilter" ? value : genreVal,
        searchBy: name === "searchBy" ? value : searchBy,
      });
    }
  };
  return (
    <div className="filters">
      <div className="filters__input-group">
        <label>Search By</label>
        <input
          type="text"
          className="filters__input-group__input"
          name="searchBy"
          placeholder="Name, City, Genre"
          value={searchBy}
          onKeyDown={handleChange}
          onChange={handleChange}
        />
      </div>
      <div className="filters__input-group">
        <label>Filter By State</label>
        <select
          className="filters__input-group__input"
          name="stateFilter"
          value={stateVal}
          onChange={handleChange}
        >
          {states.map((state, index) => (
            <option value={state} key={index}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="filters__input-group">
        <label>Filter By Genre</label>
        <select
          className="filters__input-group__input"
          name="genreFilter"
          value={genreVal}
          onChange={handleChange}
        >
          {genres.map((genre, index) => (
            <option value={genre} key={index}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RestaurantsFilter;
