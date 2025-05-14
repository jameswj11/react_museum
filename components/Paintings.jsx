import notFound from "./not-found.png";
import Modal from "./Modal.jsx";
import { useState } from "react";

const Paintings = ({paintings, showFavorite, favorites, onNewFavorites}) => {
  let artObjects = [];
  let isFavoriteGrid;

  if (showFavorite === undefined) {
    isFavoriteGrid = false
  } else {
    isFavoriteGrid = true
  }

  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});

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
        className="image-card"
        key={painting.id}
        onClick={(event) => {
          if (!isOpen) {
            setContent(painting);
            setIsOpen(true);
          }
        }}
      >
        {imgObj}
        <div className="image-info">
          <h4>{painting.title}</h4>
          {painting.people ? <p>{painting.people[0].name} </p> : <br />}
          {painting.dated ? <p>{painting.dated}</p> : <br />}
        </div>
      </div>
    );
  });

  return (
    <div className="image-grid">
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={content}
        setContent={setContent}
        favorites={favorites}
        onNewFavorites={onNewFavorites}
      />
      <h2>{isFavoriteGrid ? "FAVORITES" : "ART"}</h2>
      {artObjects}
    </div>
  );
};

export default Paintings;
