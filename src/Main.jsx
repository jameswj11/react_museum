import { useState, useEffect } from "react";
import "./style.css";
import Search from "../components/Search.jsx";
import Paintings from "../components/Paintings.jsx";
import NextPageNav from "../components/NextPageNav.jsx";
import Filter from "../components/Filter.jsx";

const Main = () => {
  console.log('main loaded')
  const [paintings, setPaintings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState("");
  const [filterValue, setFilterValue] = useState({});
  const [startFilters, setStartFilters] = useState({});
  const [filterLabelOptions, setFilterLabelOptions] = useState({});

  const numResultsPerPage = 48;

  let apicalled = false;
  let filterFields = ["century", "culture", "classification"];
  let startingFilters = {
    "century" : {},
    "culture" : {},
    "classification" : {}
  }


  const setFilterOptions = (response) => {
    const options = {century: {}, culture: {}, classification: {}};
    response.map((response) => {
      Object.keys(options).map((option) => {
        if (options[option][response[option]]) {
          options[option][response[option]]++;
        } else {
          options[option][response[option]] = 1;
        }
      })
    })
  }

  const searchPaintings = async (searchValue, currentPage, filterValue) => {
    const filters = document.getElementsByTagName('Select')
    const newfilterValue = {"culture" : "berber", "century" : "1st century"}
    const url = "https://api.harvardartmuseums.org/object?";
    const params = {
      apikey: "df765b0b-5b18-4c03-ab7a-5538cf101bb3",
      q: searchValue,
      hasimage: 1,
      // sort: "totalpageviews",
      sortorder: "desc",
      size: numResultsPerPage,
      page: currentPage
    };

    if (Object.keys(filterValue).length) {
      Object.keys(filterValue).map((x) => {
        params[x] = filterValue[x]
      })
    }

    const response = await fetch(url + new URLSearchParams(params).toString());
    const responseJson = await response.json();

    if (responseJson.records) {
      showResults(responseJson);
      // setFilterOptions(responseJson.records)
    }
  };

  const searchFields = async () => {
    let returnObj = {};

    const params = {
      apikey: "df765b0b-5b18-4c03-ab7a-5538cf101bb3",
      size: 999
    }
    
    let centuryUrl = 'https://api.harvardartmuseums.org/century?'
    let cultureUrl = 'https://api.harvardartmuseums.org/culture?'
    let classificationUrl = 'https://api.harvardartmuseums.org/classification?'

    const centuryReq = await fetch(centuryUrl + new URLSearchParams(params).toString())
    const cultureReq = await fetch(cultureUrl + new URLSearchParams(params).toString())
    const classificationReq = await fetch(classificationUrl + new URLSearchParams(params).toString())

    const centuryJson = await centuryReq.json();
    const cultureJson = await cultureReq.json();
    const classificationJson = await classificationReq.json();

    returnObj.century = centuryJson.records
    returnObj.culture = cultureJson.records
    returnObj.classification = classificationJson.records

    setStartFilters(returnObj)
  };

  const showResults = (response) => {
    // shuffle response records
    const shuffleArray = (array) => {
      for (let i = array - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i + 1);
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    };

    // clean up records depending on image URL available
    response.records.forEach((painting) => {
      if (painting.primaryimageurl) {
        painting.imageAvailable = true;
      } else {
        painting.imageAvailable = false;
      }
    });

    let sortedResults = response.records.sort((a, b) => {
      if (a.imageAvailable < b.imageAvailable) {
        return 1;
      } else if (a.imageAvailable > b.imageAvailable) {
        return -1;
      } else {
        return 0;
      }
    });

    apicalled = true;

    setPaintings(sortedResults);
    setNumPages(response.info.pages);
  };

  useEffect(() => {
    searchPaintings(searchValue, currentPage, filterValue);
    searchFields([])
  }, [searchValue, currentPage, filterValue]);

  return (
    <div>
      <h1>Explore the Harvard Museums</h1>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setFilterValue={setFilterValue}
        setCurrentPage={setCurrentPage}
      />
      <Filter
        paintings={paintings}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        startFilters={startFilters}
        searchValue={searchValue}
      />
      <Paintings paintings={paintings} />
      <NextPageNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numPages={numPages}
        paintings={paintings}
      />
    </div>
  );
};

export default Main;
