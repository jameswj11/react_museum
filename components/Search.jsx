import React, { useState } from 'react';

const Search = (props) => {

  return (
        <div>
          <input
            type="search"
            id="searchBar"
            name="q"
            value={props.value}
            placeholder="Type to search..."
            onChange={(event) => {
              props.setSearchValue(event.target.value);
              props.setCurrentPage(1)
            }}
          />
        </div>
  );
};

export default Search;
