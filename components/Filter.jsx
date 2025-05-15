import React from "react";
import Select from "react-select";

const ReactFilter = ({
  setSelectOption,
  startFilters,
  searchValue,
  paintings,
}) => {
  console.log("filter props:", startFilters);
  let centuries = [];

  if (startFilters.century) {
    Object.keys(startFilters.century).forEach((key) => {
      centuries.push({ value: key, label: key });
    });
  }

  const setFilters = (paintings) => {
    centuries = [];
    paintings.forEach((painting) => {
      if (centuries.some((obj) => obj.value == painting.century) == false) {
        centuries.push({ value: painting.century, label: painting.century });
      }
    });

    return centuries;
  };

  if (searchValue) {
    centuries = setFilters(paintings);
  }

  console.log("centuries:", centuries);
  
  const testFunc = (event)=> {
    setSelectOption('century', event.value)
  }

  return (
    <div>
      <Select
        defaultValue={null}
        onChange={testFunc}
        options={centuries}
      />
      <Select
        defaultValue={null}
        onChange={setSelectOption}
        options={[
          { value: "01", label: "01" },
          { value: "01", label: "01" },
        ]}
      />
      <Select
        defaultValue={null}
        onChange={setSelectOption}
        options={[
          { value: "room", label: "room" },
          { value: "space", label: "space" },
        ]}
      />
    </div>
  );
};

export default ReactFilter;
