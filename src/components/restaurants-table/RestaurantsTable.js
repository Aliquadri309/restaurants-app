import React from "react";
import "./RestaurantsTable.scss";

const RestaurantsTable = ({ list, sortBy, onPrev, onNext }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => sortBy("name")}>Name</th>
          <th>City</th>
          <th onClick={() => sortBy("state")}>State</th>
          <th>Phone Number</th>
          <th>Genres</th>
        </tr>
      </thead>
      <tbody>
        {list.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.city}</td>
            <td>{row.state}</td>
            <td>{row.telephone}</td>
            <td>
              {row.genre.split(",").map((g, i) => (
                <span className="genre" key={i}>
                  {g}
                </span>
              ))}
            </td>
          </tr>
        ))}
        {list.length === 0 && (
          <tr>
            <td colSpan="5" className="no-resultts-text">
              No results found. Please change the filter criteria.
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">
            <button className="btn prev-btn" onClick={onPrev}>Prev</button>
            <button className="btn next-btn" onClick={onNext}>Next</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default RestaurantsTable;
