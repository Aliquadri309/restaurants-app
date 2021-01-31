import React, { useState, useEffect } from "react";
import { getRestaurants } from "../../api/restaurants/RestaurantAPI";
import RestaurantsFilter from "../../components/restaurants-filter/RestaurantsFilter";
import RestaurantsTable from "../../components/restaurants-table/RestaurantsTable";

const RestaurantContainer = () => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [list, setList] = useState([]);
  const [states, setStates] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  useEffect(() => {
    async function getRestaurantsList() {
      const data = await getRestaurants();
      data.sort((a, b) => (a.name < b.name ? -1 : 1));
      setRestaurantsList([...data]);
      const start = pageSize * currentPage;
      const total = data.slice(start, start + pageSize);
      setList(total);
      setTotalPages(Math.ceil(data.length / pageSize));
      let statesList = data.map((x) => x.state);
      statesList = Array.from(new Set(statesList));
      statesList.sort((a, b) => (a < b ? -1 : 1));
      statesList.unshift("All");
      setStates(statesList);
      getStates(data);
    }
    getRestaurantsList();
  }, []);

  const getStates = (data) => {
    let genreList = [];
    for (let i = 0; i < data.length; i++) {
      const list = data[i].genre.split(",");
      genreList.push(...list);
    }
    genreList = Array.from(new Set(genreList));
    genreList.sort((a, b) => (a < b ? -1 : 1));
    genreList.unshift("All");
    setGenres(genreList);
  };

  const handleFiltterChange = (filterObj) => {
    let data = restaurantsList;
    const stateFilter = filterObj["stateFilter"];
    const genreFilter = filterObj["genreFilter"];
    const searchByFilter = filterObj["searchBy"];
    if (stateFilter !== "All") {
      data = restaurantsList.filter((x) => x.state === stateFilter);
    }
    if (genreFilter !== "All") {
      data = data.filter((x) => x.genre.indexOf(genreFilter) > -1);
    }
    if (searchByFilter !== "") {
      data = data.filter((x) => searchBy(x, searchByFilter.toLowerCase()));
    }
    setList(data);
  };

  const searchBy = (obj, value) => {
    return (
      obj.name.toLowerCase().indexOf(value) > -1 ||
      obj.city.toLowerCase().indexOf(value) > -1 ||
      obj.genre.toLowerCase().indexOf(value) > -1
    );
  };

  const handleSortBy = (sortBy) => {
    let data = [...list];
    switch (sortBy) {
      case "name":
        data.sort((a, b) => (a.name < b.name ? -1 : 1));
        setList(data);
        break;
      case "state":
        data.sort((a, b) => (a.state < b.state ? -1 : 1));
        setList(data);
        break;
      default:
        setList(data);
        break;
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const start = pageSize * (currentPage - 1);
      const data = restaurantsList.slice(start, start + pageSize);
      setList(data);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages-1) {
      const start = pageSize * (currentPage + 1);
      const data = restaurantsList.slice(start, start + pageSize);
      setList(data);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <RestaurantsFilter
        states={states}
        genres={genres}
        onFilterChange={handleFiltterChange}
      />
      <RestaurantsTable
        list={list}
        sortBy={handleSortBy}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default RestaurantContainer;
