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

  const handleFilterChange = (type, event) => {
    if (event == null) {
      setSelectOption({ [type]: "" });
    } else {
      setSelectOption({ [type]: event.value });
    }
  };

  const toggleFilters = (event) => {
    const chevronUp = document.getElementById("chevronUp");
    const chevronDown = document.getElementById("chevronDown");

    const filterOptionContainer = document.getElementById(
      "filterOptionContainer"
    );
    if (filterOptionContainer.className == "row filterOptionContainer-show") {
      filterOptionContainer.className = "row filterOptionContainer-hide";
      chevronDown.style.display = "none";
      chevronUp.style.display = "initial";
    } else {
      filterOptionContainer.className = "row filterOptionContainer-show";
      chevronUp.style.display = "none";
      chevronDown.style.display = "initial";
    }
  };

  centuries.reverse();
  classifications.sort((a, b) => a.value.localeCompare(b.value));
  cultures.sort((a, b) => a.value.localeCompare(b.value));

  const filterIcon = Array.from(
    document.getElementsByClassName("toggleFiltersIcon")
  );

  const filterText = Array.from(
    document.getElementsByClassName("filterByText")
  );

  if (filterIcon.length) {
    filterIcon[0].addEventListener("mouseover", (event) => {
      filterText[0].style.textDecoration = "underline";
    });

    filterIcon[0].addEventListener("mouseout", (event) => {
      filterText[0].style.textDecoration = "none";
    })
  }

  return (
    <div className="filterByContainer">
      <div className="row">
        <h4
          className="filterByText col-6"
          onClick={(event) => {
            toggleFilters(event);
          }}
        >
          Filter By
        </h4>
        <div
          className="col-6 toggleFiltersIcon"
          onClick={(event) => {
            toggleFilters(event);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            id="chevronDown"
            className="chevron chevron-show"
            viewBox="0 4 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            id="chevronUp"
            fill="currentColor"
            class="chevron chevron-hide"
            viewBox="0 4 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
            />
          </svg>
        </div>
      </div>
      <div
        className="row filterOptionContainer-show"
        id="filterOptionContainer"
      >
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 filterSelect">
          <Select
            // className="filterSelect"
            defaultValue={null}
            isClearable
            isSearchable
            placeholder={"Century / Millennium"}
            onChange={(event) => {
              handleFilterChange("century", event);
            }}
            options={centuries}
          />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 filterSelect">
          <Select
            // className="filterSelect"
            defaultValue={null}
            isClearable
            isSearchable
            placeholder={"Culture / Country"}
            onChange={(event) => {
              handleFilterChange("culture", event);
            }}
            options={cultures}
          />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 filterSelect">
          <Select
            // className="filterSelect"
            defaultValue={null}
            isClearable
            isSearchable
            placeholder={"Object Type / Material"}
            onChange={(event) => {
              handleFilterChange("classification", event);
            }}
            options={classifications}
          />
        </div>
      </div>
    </div>
  );
};

export default ReactFilter;
