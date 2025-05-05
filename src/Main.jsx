import {useState, useEffect} from 'react';
import "./style.css";
import Search from "../components/Search.jsx";
import Paintings from "../components/Collection.jsx";

const Main = () => {
    const [paintings, setPaintings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const searchPaintings = async(searchValue) => {
      // return;
      const url= `https://api.harvardartmuseums.org/object?apikey=df765b0b-5b18-4c03-ab7a-5538cf101bb3&q=${searchValue}&classification=26&sort=random&size=24`;
      const response = await fetch(url);
      const responseJson = await response.json()
      
      if (responseJson.records) {
        const parsedRecords = [];
        
        responseJson.records.forEach(element => {
          console.log(element.primaryimageurl)
          if (element.primaryimageurl) {
            if (element.primaryimageurl.length) {
              parsedRecords.push(element)
            }
          }
        }); 

        setPaintings(parsedRecords)
      }
      console.log('response json:', responseJson)
    }

    useEffect(()=>{
      searchPaintings(searchValue)
    }, [searchValue])

  return (
    <div>
      <h1>Explore the Harvard Museums</h1>
      <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Paintings paintings={paintings} />
    </div>
  );
};

export default Main;
