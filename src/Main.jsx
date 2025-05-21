import { useState, useEffect } from "react";
import "./style.css";
import Search from "../components/Search.jsx";
import Paintings from "../components/Paintings.jsx";
import NextPageNav from "../components/NextPageNav.jsx";
import Filter from "../components/Filter.jsx";
import Modal from "../components/Modal.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => {
  console.log("main loaded");
  const [paintings, setPaintings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState("");
  const [startFilters, setStartFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});
  const [selected, setSelected] = useState(false);
  const [searchByFilter, setSearchByFilter] = useState([]);
  const [numResults, setNumResults] = useState(0)

  const numResultsPerPage = 48;

  const searchPaintings = async (searchValue, currentPage, searchByFilter) => {
    const url = "https://api.harvardartmuseums.org/object?";

    const params = {
      apikey: process.env.API_KEY,
      q: searchValue,
      hasimage: 1,
      sort: "totalpageviews",
      sortorder: "desc",
      size: numResultsPerPage,
      page: currentPage,
    };

    if (searchByFilter.length > 0) {
      for (let i = 0; i < searchByFilter.length; i++) {
        let key = Object.keys(searchByFilter[i])[0];
        params[key] = searchByFilter[i][key];
      }
    }

    const response = await fetch(url + new URLSearchParams(params).toString());
    const responseJson = await response.json();

    if (responseJson.records) {
      showResults(responseJson);
    }
  };

  const searchFields = async () => {
    let returnObj = { century: {}, culture: {}, classification: {} };

    const params = {
      apikey: process.env.API_KEY,
      size: 999,
    };

    let centuryUrl = "https://api.harvardartmuseums.org/century?";
    let cultureUrl = "https://api.harvardartmuseums.org/culture?";
    let classificationUrl = "https://api.harvardartmuseums.org/classification?";

    const centuryReq = await fetch(
      centuryUrl + new URLSearchParams(params).toString()
    );
    const cultureReq = await fetch(
      cultureUrl + new URLSearchParams(params).toString()
    );
    const classificationReq = await fetch(
      classificationUrl + new URLSearchParams(params).toString()
    );

    const centuryJson = await centuryReq.json();
    const cultureJson = await cultureReq.json();
    const classificationJson = await classificationReq.json();

    centuryJson.records.map((century) => {
      returnObj.century[century.name] = century.objectcount;
    });

    cultureJson.records.map((culture) => {
      returnObj.culture[culture.name] = culture.objectcount;
    });

    classificationJson.records.map((classification) => {
      returnObj.classification[classification.name] =
        classification.objectcount;
    });

    setStartFilters(returnObj);
  };

  const showResults = (response) => {
    console.log("results:", response);

    // clean up records depending on image URL available
    response.records.forEach((painting) => {
      painting.favorite = false;
      painting.primaryimageurl
        ? (painting.imageAvailable = true)
        : (painting.imageAvailable = false);
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
    
    
    setPaintings(sortedResults);
    setNumPages(response.info.pages);
    setNumResults(response.info.totalrecords)
    
    
    console.log('TOTAL RECORDS:', response.info.totalrecords)
  };

  const showFavorites = (event) => {
    // to be fixed later and handled in component
    const faves = document.getElementById("favoriteGrid");
    const results = document.getElementById("resultsGrid");
    const pageNav = document.getElementById("pageNav");
    const viewText = document.getElementById("viewFavoritesText")

    if (faves.style.display == "none") {
      faves.style.display = "";
      results.style.display = "none";
      pageNav.style.display = "none";
      viewText.innerHTML = "Show Search Results"
      event.target.innerHTML = "Show Search";
    } else {
      faves.style.display = "none";
      results.style.display = "";
      pageNav.style.display = "";
      event.target.innerHTML = "Show Favorites";
      viewText.innerHTML = "Show Favorites"
    }
  };

  useEffect(() => {
    searchPaintings(searchValue, currentPage, searchByFilter);
    searchFields([]);
  }, [searchValue, currentPage, searchByFilter]);

  const setSelectOption = (output) => {
    let newSearchOptions = [...searchByFilter];

    if (newSearchOptions.some(filter => Object.keys(filter).includes(Object.keys(output)[0]))) {
      newSearchOptions.forEach((option) => {
        if ([Object.keys(option)[0]] == Object.keys(output)[0]) {
          option[Object.keys(option)[0]] = output[Object.keys(output)[0]];
        }
      })
    } else {
      newSearchOptions.push({[Object.keys(output)[0]]: output[Object.keys(output)[0]]})
    }

    setSearchByFilter(newSearchOptions);
    
    if (newSearchOptions.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row header">
          <h1>Explore the Harvard Museums</h1>
        </div>
        <div className="row searchContainer">
          <h4 className="searchTheCollection">Search the Collection</h4>
          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <Filter
          startFilters={startFilters}
          setSelectOption={setSelectOption}
          searchValue={searchValue}
          selected={selected}
          paintings={paintings}
          searchByFilter={searchByFilter}
        />
        <div className="row favoritesContainer">
          <div className="col">
            <h4 className="" id="viewFavoritesText">View Your Favorites</h4>
            <button
              type="button"
              className="btn btn-outline-secondary view-favorites-button"
              onClick={showFavorites}
            >
              Show Favorites
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="lineSeparator"></div>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          content={content}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <Paintings
          paintings={paintings}
          showFavorite={false}
          numResults={numResults}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setContent={setContent}
        />
        <Paintings
          paintings={favorites}
          showFavorite={true}
          numResults={numResults}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setContent={setContent}
        />
        <NextPageNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numPages={numPages}
          paintings={paintings}
          favorites={favorites}
        />
      </div>
    </div>
  );
};

export default Main;
