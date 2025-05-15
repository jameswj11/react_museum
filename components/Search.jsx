import React, { useState } from 'react';

const Search = (props) => {

  return (
    <div>
      <label htmlFor="search">Search the Collection:</label>
      <input
        type="search"
        id="searchBar"
        name="q"
        value={props.value}
        placeholder="Type to search..."
        onChange={(event) => {
          props.setSearchValue(event.target.value);
          console.log('search value:', props.searchValue)
          props.setCurrentPage(1)
        }}
      />
    </div>
  );
};

export default Search;
