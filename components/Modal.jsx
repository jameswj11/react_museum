import { useState } from "react";

const Modal = ({isOpen, setIsOpen, content, setContent, favorites, onNewFavorites}) => {
  let modalObj = [];
  let data = {};

  if (Object.keys(content).length) {
    data = {
      title: content.title,
      century: content.century,
      classification: content.classification,
      division: content.division,
      department: content.department,
      date: content.dated,
      culture: content.culture,
      creditline: content.creditline,
      copyright: content.copyright,
    };

    Object.keys(data).map((key) => {
      modalObj.push(
        <p key={key}>
          <b>{key + ": "}</b>
          {data[key]}
        </p>
      );
    });
  }

  let newFavorites = [];


  return (
    <div>
      <div
        className={isOpen ? "modalBG-open" : "modalBG-closed"}
        onClick={(event) => {
            if (event.target.className != "modalBG-open") return;
          setIsOpen(false);
        }}
      >
        <div className="modalData">
          <div className="modalImgContainer">
            <img
              className="modalImg"
              src={content.primaryimageurl}
              alt={content.title}
            />
          </div>
          <div className="modalContentContainer">
            {modalObj}
            <button
              id="saveToFavoritesBtn"
              className="saveToFavoritesBtn"
              onClick={(event) => {
                newFavorites = [...favorites, content]
                onNewFavorites(newFavorites)
              }}
            >
              Save To Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
