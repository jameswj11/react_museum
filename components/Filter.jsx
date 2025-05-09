const Filter = (props) => {
    console.log('filter mounted');
  return (
    <div>
      {Object.keys(props.startFilters).map((filter, index) => (
        <select key={index} name={filter} onChange={(event) => {
            props.setFilterValue({k: event.target.name, v: event.target.value})
        }}>
          <option key={"default"} value="">
            {(filter == "classification") ? "object type" : filter}
          </option>
          {Object.keys(props.startFilters[filter]).map((selectOption, index) => (
            <option key={index} value={props.startFilters[filter][selectOption].name}>
              {
                props.startFilters[filter][selectOption].name + 
                " (" + props.startFilters[filter][selectOption].objectcount + 
                ")"
              }
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Filter;
