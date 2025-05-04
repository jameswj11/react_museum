const Search = (props) => {
  console.log('props from search component:', props);
  return (
    <div>
      <label htmlFor="search">Search the Collection:</label>
      <input
        type="search"
        id="searchBar"
        name="q"
        value={props.value}
        placeholder="Type to search..."
        onChange={(event) => props.setSearchValue(event.target.value)}
      />
    </div>
  );
};

export default Search;
