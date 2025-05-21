import React, { useState } from "react";

const Modal = ({ isOpen, setIsOpen, content, favorites, setFavorites }) => {
  let modalObj = [];
  let data = {};
  let additionalImages = [];

  if (isOpen) {
    document.body.classList.add("body-modal-open");
  } else {
    document.body.classList.remove("body-modal-open");
  }

  const updateImageUrl = (url) => {
    document.getElementsByClassName("modalImg")[0].src = url;
  };

  if (Object.keys(content).length) {
    data = {
      title: content.title,
      date: content.dated,
      maker: "",
      culture: content.culture,
      labeltext: content.labeltext,
      classification: content.classification,
      creditline: content.creditline,
      provenance: content.provenance,
      copyright: content.copyright,
    };

    if (content.peoplecount > 0) {
      data.maker = content.people[0].name
      if (content.people[0].displaydate) {
        data.maker += ', ' + content.people[0].displaydate
      }

      data.birthplace = content.people[0].birthplace;
      data.deathplace = content.people[0].deathplace;
    }

    Object.keys(data).forEach((key) => {
      if (data[key] == null || data[key] == "") {
        data[key] = "";
      }
    });

    Object.keys(data).forEach((key, index) => {
      if (index < 5) {
        modalObj.push(
          <div key={key}>
            <p>{data[key]}</p>
          </div>
        );
      } else {
        modalObj.push(
          <div key={key}>
            <p>
              <b>{key + ": "}</b>{data[key]}
            </p>
          </div>
        );
      }
    });
  }

  // add additional images if available
  if (content.images && content.images.length > 1) {
    content.images.forEach((image, index) => {
      additionalImages.push(
        <div
          className="additionalImageThumbnail"
          key={index}
          style={{'backgroundImage': 'url(' + image.baseimageurl + "?width=100" + ')'}}
          onClick={(e) => {
            e.stopPropagation();
            updateImageUrl(image.baseimageurl);
          }}
        ></div>
      );
    });
  }

  const handleSetFavorite = () => {
    let newFavorites = [];

    if (content.favorite === false) {
      // adding
      content.favorite = true;
      newFavorites = [...favorites, content];
    } else {
      //removing
      content.favorite = false;
      newFavorites = favorites.filter((item) => {
        return item.favorite == true;
      });
    }

    setFavorites(newFavorites);
  };

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
            <div className="additionalImageContainer">{additionalImages}</div>
          </div>
          <div className="modalContentContainer">
            {modalObj}
            <button
                type="button"
              id="saveToFavoritesBtn"
              className="btn btn-outline-dark btn-saveToFavoritesBtn"
              onClick={(event) => {
                handleSetFavorite();
              }}
            >
              {content.favorite == true
                ? "Remove From Favorites"
                : "Save To Favorites"}
            </button>
          </div>
          <button className="closeModalButton">X</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
