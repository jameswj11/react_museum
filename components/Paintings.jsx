import notFound from "../src/not-found.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Paintings = ({
  paintings,
  showFavorite,
  numResults,
  isOpen,
  setIsOpen,
  setContent,
}) => {
  let artObjects = [];

  let artworks = paintings;
  let favoriteText;
  let resultsText;

  const handleMouseClick = (painting)=> {
      if (!isOpen) {
        setContent(painting);
        setIsOpen(true);
      }
  }

  const handleError = (image => {
    image.src = notFound;
    image.style.opacity = 0.4
  })

  if (artworks.length == 0) {
    artObjects = <p>No results to display</p>
  } else {
    artworks.forEach((painting) => {
      let url = "";
      let imgObj;
      
      if (painting.primaryimageurl) {
        imgObj = (
          <img
          src={painting.primaryimageurl + "?width=400"}
          onError={(e) => {
            e.currentTarget.src = notFound;
          }}
          className="img-fluid"
          alt="painting"
          ></img>
        );
      } else {
        painting.primaryimageurl = notFound
        imgObj = <img src={notFound} className="img-fluid"></img>;
      }
      
      artObjects.push(
        <Col
        sm={6}
        xl={4}
        xxl={3}
        className="collectionObject gy-5"
        key={painting.id}
        >
        <div className="imageWrapper" onClick={()=> {handleMouseClick(painting)}}>
          <span className="align-helper"></span>
          {imgObj}
        </div>
        <div className="image-info">
          <b className="title" onClick={()=> {handleMouseClick(painting)}}>{painting.title}</b>
          {painting.people ? <p className="maker">{painting.people[0].name} </p> : null}
          {painting.dated ? <p className="date">{painting.dated}</p> : <br />}
        </div>
      </Col>
    );
  });
}

if (paintings.length == 1) {
  resultsText = ' Result'
  favoriteText = ' Favorite'
} else {
  resultsText =  ' Results'
  favoriteText = ' Favorites'
}

  return (
      <Row
        className="resultsGridRow"
        id={showFavorite ? "favoriteGrid" : "resultsGrid"}
        style={showFavorite ? { display: "none" } : { display: "" }}
      >
        <b className="showingResultsText">{showFavorite ? "Showing " + paintings.length + favoriteText : "Showing " + numResults + resultsText}</b>
        {artObjects}
      </Row>
  );
};

export default Paintings;
