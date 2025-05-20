import React from "react";
import Select from "react-select";

const ReactFilter = ({
  setSelectOption,
  startFilters,
  searchValue,
  paintings,
  selected,
}) => {
  let centuries = [];
  let classifications = [];
  let cultures = [];

  if (startFilters.century) {
    Object.keys(startFilters.century).forEach((key) => {
      centuries.push({ value: key, label: key });
    });

    Object.keys(startFilters.classification).forEach((key) => {
      classifications.push({ value: key, label: key });
    });

    Object.keys(startFilters.culture).forEach((key) => {
      cultures.push({ value: key, label: key });
    });
  }

  const setFilters = (paintings) => {
    centuries = [];
    classifications = [];
    cultures = [];

    paintings.forEach((painting) => {
      if (centuries.some((obj) => obj.value == painting.century) == false) {
        centuries.push({ value: painting.century, label: painting.century });
      }
      if (cultures.some((obj) => obj.value == painting.culture) == false) {
        cultures.push({ value: painting.culture, label: painting.culture });
      }
      if (
        classifications.some((obj) => obj.value == painting.classification) ==
        false
      ) {
        classifications.push({
          value: painting.classification,
          label: painting.classification,
        });
      }
    });

    const returnObj = {
      centuries: centuries,
      classifications: classifications,
      cultures: cultures,
    };
    return returnObj;
  };
  let newFilters = {};
  if (searchValue || selected) {
    newFilters = setFilters(paintings);

    centuries = newFilters.centuries;
    cultures = newFilters.cultures;
    classifications = newFilters.classifications;
  }

  const testFunc = (type, event) => {
    if (event == null) {
      setSelectOption({ [type]: "" });
    } else {
      setSelectOption({ [type]: event.value });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h4>Filter By:</h4>
        <div className="col">
          <Select
            defaultValue={null}
            isClearable
            isSearchable
            placeholder={"Century / Millennium"}
            onChange={(event) => {
              testFunc("century", event);
            }}
            options={centuries}
          />
        </div>
        <div className="col">
          <Select
            defaultValue={null}
            isClearable
            isSearchable
            placeholder={"Culture / Country"}
            onChange={(event) => {
              testFunc("culture", event);
            }}
            options={cultures}
          />
        </div>
        <div className="col">
          <Select
            defaultValue={null}
            isClearable
            isSearchable
            placeholder={"Object Type / Material"}
            onChange={(event) => {
              testFunc("classification", event);
            }}
            options={classifications}
          />
        </div>
      </div>
    </div>
  );
};

export default ReactFilter;
