import notFound from "./not-found.png";

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
      <div
        className="collectionObject"
        key={painting.id}
        onClick={(event) => {
          if (!isOpen) {
            setContent(painting);
            setIsOpen(true);
          }
        }}
      >
        <div className="imageWrapper col">
          <span className="align-helper"></span>
          {imgObj}
        </div>
        <div className="image-info">
          <h4>{painting.title}</h4>
          {painting.people ? <p>{painting.people[0].name} </p> : <br />}
          {painting.dated ? <p>{painting.dated}</p> : <br />}
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div
        id={showFavorite ? "favoriteGrid" : "resultsGrid"}
        className="image-grid row"
        style={showFavorite ? { display: "none" } : { display: "" }}
      >
        <h2>{showFavorite ? "Favorites" : "Search Results"}</h2>
        {artObjects}
      </div>
    </div>
  );
};

export default Paintings;
