import React from "react";
import Select from "react-select";

const ReactFilter = ({
  setSelectOption,
  startFilters,
  searchValue,
  paintings,
  selectValue
}) => {
  console.log("search value:", searchValue);
  let centuries = [];
  let classifications = [];
  let cultures = [];
  
  if (startFilters.century) {
    Object.keys(startFilters.century).forEach((key) => {
      centuries.push({ value: key, label: key });
    });

    Object.keys(startFilters.classification).forEach((key) => {
      classifications.push({ value: key, label: key })
    })

    Object.keys(startFilters.culture).forEach((key) => {
      cultures.push({ value: key, label: key })
    })
  }

  const setFilters = (paintings) => {
    centuries = [];
    classifications = [];
    cultures = [];

    
    paintings.forEach((painting) => {
      console.log('DATA ITEM:', painting)
      if (centuries.some((obj) => obj.value == painting.century) == false) {
        centuries.push({ value: painting.century, label: painting.century });
      }
      if (cultures.some((obj) => obj.value == painting.culture) == false) {
        cultures.push({ value: painting.culture, label: painting.culture });
      }
      if (classifications.some((obj) => obj.value == painting.classification) == false) {
        classifications.push({ value: painting.classification, label: painting.classification });
      }
    });
    
    const returnObj = {centuries: centuries, classifications: classifications, cultures: cultures}
    // console.log('return object:', returnObj)
    return returnObj;
  };
  console.log('select value:', selectValue)
  let newFilters = {}
  if (searchValue || selectValue) {
    newFilters = setFilters(paintings)
    console.log('new filters:', newFilters)

    centuries = newFilters.centuries;
    cultures = newFilters.cultures;
    classifications = newFilters.classifications;

    // console.log('NEW FILTERS ARE:', newFilters)
  }

  // let filterToUse
  // if (Object.keys(newFilters).length > 0) {
  //   filterToUse = newFilters
  // } else {
  //   filterToUse = startFilters
  // }

  // const selectInputs = Object.keys(filterToUse).map((type)=> {
  //   <Select defaultValue={null} onChange={testFunc('hello')} options={newFilters[type]} />
  // })
  
  const testFunc = (type, event)=> {
    console.log('aksdjlfsdkflj', type, event)
    // console.log('event:', 'centuries', centuries, 'cultures:', cultures)
    setSelectOption({[type]: event.value})
  }

  console.log("centuries:", centuries);
  

  return (
    <div>
      <Select
        defaultValue={null}
        onChange={(event)=> {testFunc('century', event)}}
        options={centuries}
      />
      <Select
        defaultValue={null}
        onChange={(event)=> {testFunc('culture', event)}}
        options={cultures}
      />
      <Select
        defaultValue={null}
        onChange={(event)=> {testFunc('classification', event)}}
        options={classifications}
      />
    </div>
  );
};

export default ReactFilter;
