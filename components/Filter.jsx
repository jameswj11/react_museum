const Filter = (props) => {
  const currentFilters = { century: {}, culture: {}, classification: {} };

  props.paintings.forEach((result) => {
    Object.keys(currentFilters).forEach((filter) => {
      if (currentFilters[filter][result[filter]] != undefined) {
        currentFilters[filter][result[filter]]++;
      } else {
        currentFilters[filter][result[filter]] = 1;
      }
    });
  });

  if (props.searchValue || Object.keys(props.filterValue).length) {
    // not a blank search
    return(
        <div>
        {Object.keys(currentFilters).map((filter, index) => (
            <select
            key={index}
            name={filter}
            onChange={(event) => {
                props.setFilterValue(prevState => (
                    {...prevState, [filter]: event.target.value}));
            }}
            >
            <option key={"default"} value="">
                {filter == "classification" ? "object type" : filter}
            </option>
            {Object.keys(currentFilters[filter]).map(
                (selectOption, index) => (
                <option
                    key={index}
                    value={selectOption}>
                    {
                    selectOption +
                    " (" +
                    currentFilters[filter][selectOption] +
                    ")"}
                </option>
                )
            )}
            </select>
        ))}
        </div>
    )

  } else {
    // blank search
    return (
      <div>
        {Object.keys(props.startFilters).map((filter, index) => (
          <select
            key={index}
            name={filter}
            onChange={(event) => {
                props.setFilterValue(prevState => (
                    {...prevState, [filter] : event.target.value}));
            }}
          >
            <option key={"default"} value="">
              {filter == "classification" ? "object type" : filter}
            </option>
            {Object.keys(props.startFilters[filter]).map(
              (selectOption, index) => (
                <option
                  key={index}
                  value={selectOption}
                >
                  {selectOption +
                    " (" +
                    props.startFilters[filter][selectOption] +
                    ")"}
                </option>
              )
            )}
          </select>
        ))}
      </div>
    );
  }
};

export default Filter;
