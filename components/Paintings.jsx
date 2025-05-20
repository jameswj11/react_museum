import notFound from "./not-found.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Paintings = ({
  paintings,
  showFavorite,
  favorites,
  isOpen,
  setIsOpen,
  setContent,
}) => {
  let artObjects = [];

  let artworks = paintings;

  artworks.forEach((painting) => {
    let url = "";
    let imgObj;

    if (painting.primaryimageurl) {
      imgObj = (
        <img
          src={painting.primaryimageurl + "?width=350"}
          onError={(e) => (e.currentTarget.src = notFound)}
          className="img-fluid"
          alt="painting"
        ></img>
      );
    } else {
      imgObj = <img src={notFound} className="img-fluid"></img>;
    }

    artObjects.push(
      <Col
        xl={4}
        xxl={3}
        sm={6}
        className="collectionObject"
        key={painting.id}
        onClick={(event) => {
          if (!isOpen) {
            setContent(painting);
            setIsOpen(true);
          }
        }}
      >
        <div className="imageWrapper">
          <span className="align-helper"></span>
          {imgObj}
        </div>
        <div className="image-info">
          <h4>{painting.title}</h4>
          {painting.people ? <p className="maker">{painting.people[0].name} </p> : null}
          {painting.dated ? <p className="date">{painting.dated}</p> : <br />}
        </div>
      </Col>
    );
  });

  return (
    <Container fluid>
      <Row
      className="gy-5"
        id={showFavorite ? "favoriteGrid" : "resultsGrid"}
        style={showFavorite ? { display: "none" } : { display: "" }}
      >
        <h2>{showFavorite ? "Favorites" : "Search Results"}</h2>
        {artObjects}
      </Row>
    </Container>
  );
};

export default Paintings;
