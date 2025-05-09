const Filter = (props) => {
  let labelOptions = { century: {}, division: {}, culture: {}, medium: {} };

  props.paintings.forEach((painting) => {
    Object.keys(labelOptions).forEach((filterType) => {
      if (
        Object.keys(labelOptions[filterType]).includes(painting[filterType])
      ) {
        labelOptions[filterType][painting[filterType]]++;
      } else {
        if (painting[filterType] == null || painting[filterType] == undefined) {
          labelOptions[filterType] = { "N/A": 1 };
        } else {
          labelOptions[filterType][painting[filterType]] = 1;
        }
      }
    });
  });

  return (
    <div>
      {Object.keys(labelOptions).map((key, index) => (
        <select key={index} onChange={(event) => {
            props.setFilterValue(event.target.value)
        }}>
          <option key={"default"} value="">
            {key}
          </option>
          {Object.keys(labelOptions[key]).map((value, index) => (
            <option key={index} value={value}>
              {value + " (" + labelOptions[key][value] + ")"}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Filter;
