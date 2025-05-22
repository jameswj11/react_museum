import React from "react";
import Select from "react-select";

const ReactFilter = ({
  setSelectOption,
  startFilters,
  searchValue,
  paintings,
  selected,
  searchByFilter
}) => {
  let centuries = [];
  let classifications = [];
  let cultures = [];
  let noFilter = true;


  searchByFilter.forEach(filter => {
    if (filter[Object.keys(filter)[0]] == '') {
      noFilter = true;
    } else {
      noFilter = false;
    }
  })

  const setNewFilters = () => {
    centuries = [];
    classifications = [];
    cultures = [];

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
  }

  if (noFilter && (searchValue.trim() == '' || searchValue == undefined)) {
    // default to starting filters
    setNewFilters()
  }


  const setFilters = (paintings) => {
    centuries = [];
    classifications = [];
    cultures = [];

    paintings.forEach((painting) => {
      if (painting.century && painting.culture) {
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
  if (searchValue.trim() != '' || noFilter == false) {
    newFilters = setFilters(paintings);
  } else if (searchValue.trim() == '' && noFilter == true) {
    setNewFilters()
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

  if (centuries) {
    centuries.reverse();
    classifications.sort((a, b) => a.value.localeCompare(b.value));
    cultures.sort((a, b) => a.value.localeCompare(b.value));
  }

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
            className="chevron chevron-hide"
            viewBox="0 4 16 16"
          >
            <path
              fillRule="evenodd"
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
