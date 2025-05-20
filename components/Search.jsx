import React, { useState } from "react";

const Search = (props) => {
  return (
    <div className="col">
      <div className="input-group mb3">
        <input
          className="form-control"
          type="search"
          id="searchBar"
          name="q"
          aria-describedby="searchAddon"
          aria-label="searchBar"
          value={props.value}
          placeholder="Type to search..."
          onChange={(event) => {
            props.setSearchValue(event.target.value);
            props.setCurrentPage(1);
          }}
        />
        <div className="input-group-append" id="searchAddon">
          <span className="input-group-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 -2 16 20"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
