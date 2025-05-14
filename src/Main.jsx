import { useState, useEffect } from "react";
import "./style.css";
import Search from "../components/Search.jsx";
import Paintings from "../components/Paintings.jsx";
import NextPageNav from "../components/NextPageNav.jsx";
import Filter from "../components/Filter.jsx";
import Modal from "../components/Modal.jsx";

const Main = () => {
  console.log("main loaded");
  const [paintings, setPaintings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState("");
  const [filterValue, setFilterValue] = useState({});
  const [startFilters, setStartFilters] = useState({});
  const [showFavorite, setshowFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [content, setContent] = useState({});

  console.log('FAVORITES FROM MAIN:', favorites)

  const numResultsPerPage = 48;

  const toggleModal = (data) => {
    console.log('toggleModal',)
  }

  const searchPaintings = async (searchValue, currentPage, filterValue) => {
    const filters = document.getElementsByTagName("Select");
    const newfilterValue = { culture: "berber", century: "1st century" };
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

    if (Object.keys(filterValue).length) {
      Object.keys(filterValue).map((x) => {
        params[x] = filterValue[x];
      });
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
  };

  const updateFavorites = (arr)=> {
    setFavorites(arr)
  }

  const showFavorites = () => {
    console.log('show favorites')
  }

  useEffect(() => {
    searchPaintings(searchValue, currentPage, filterValue);
    searchFields([]);
  }, [searchValue, currentPage, filterValue]);

  useEffect(() => {
    updateFavorites(favorites)
  }, [favorites])

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
      <button className="view-favorites-button" onClick={showFavorites}>View Favorites</button>
      <Paintings 
        paintings={paintings} 
        favorites={favorites}
        onNewFavorites={updateFavorites}
      />
      <Paintings 
        paintings={favorites}
        showFavorite={true}
      />
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
