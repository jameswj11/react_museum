import React, { useEffect, useRef } from "react";
import notFound from "../src/not-found.png";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Modal = ({ isOpen, setIsOpen, content, favorites, setFavorites }) => {
  let modalObj = [];
  let data = {};
  let additionalImages = [];

  const modalRef = useRef(null);
  const imageGalleryContainer = useRef(null);

  if (isOpen) {
    document.body.classList.add("body-modal-open");
  } else {
    document.body.classList.remove("body-modal-open");
  }

  if (Object.keys(content).length) {
    data = {
      title: content.title,
      maker: "",
      culture: content.culture,
      date: content.dated,
      labeltext: content.labeltext,
      classification: content.classification,
      creditline: content.creditline,
      provenance: content.provenance,
      copyright: content.copyright,
      link: content.url,
    };

    if (content.peoplecount > 0) {
      data.maker = content.people[0].name;
    }

    Object.keys(data).forEach((key, index) => {
      if (data[key] == undefined || data[key] == null || data[key] == "") {
        data[key] = "";
      }

      if (index < 5) {
        modalObj.push(
          <div key={key} className={"modal-" + key + "Container"}>
            <p className={"modal-" + key + "Text"}>{data[key]}</p>
          </div>
        );
      } else if (key == "link") {
        modalObj.push(
          <div key={key} className={"modal-" + key + "Container"}>
            <p className={"modal-" + key + "Text"}>
              <b>{key.charAt(0).toUpperCase() + key.slice(1) + ": "}</b>
              <a href={data[key]}>{data[key]}</a>
            </p>
          </div>
        );
      } else {
        modalObj.push(
          <div key={key} className={"modal-" + key + "Container"}>
            <p className={"modal-" + key + "Text"}>
              <b>{key.charAt(0).toUpperCase() + key.slice(1) + ": "}</b>
              {data[key] == "" ? "Unknown or None" : data[key]}
            </p>
          </div>
        );
      }
    });
  }

  // add additional images if available
  if (content.images && content.images.length > 0) {
    content.images.forEach((image, index) => {
      additionalImages.push({
        original: image.baseimageurl,
        thumbnail: image.baseimageurl + "?width=80",
      });
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

  // clean up css if maker is blank
  const cleanUpCss = () => {
    const makerText = Array.from(
      document.getElementsByClassName("modal-makerText")
    );
    if (makerText.length) {
      if (makerText[0].innerHTML == "") {
        makerText[0].parentElement.style.display = "none";
      } else {
        makerText[0].parentElement.style.display = "inline-block";
        makerText[0].style.marginRight = "10px";
      }
    }
  };

  useEffect(() => {
    cleanUpCss(isOpen);
    modalRef.current.scrollTop = 0;
    if (isOpen == false) {
      if (imageGalleryContainer.current.imageGallery.current) {
        imageGalleryContainer.current.imageGallery.current.style.display = 'none';
      }
    }
  }, [isOpen]);

  const imageLoaded = (e) => {
    if (imageGalleryContainer.current.imageGallery.current) {
      imageGalleryContainer.current.imageGallery.current.style.display = "initial";
    }
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
        <div className="modalData container" ref={modalRef}>
          <div className="row">
            <div
              className="modalImgContainer col p-5"
            >
              <ImageGallery
                ref={imageGalleryContainer}
                items={additionalImages}
                showNav={false}
                showPlayButton={false}
                onErrorImageURL={notFound}
                onImageLoad={(e) => {
                  imageLoaded(e);
                }}
              />
            </div>
            <div className="modalContentContainer col p-5">
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
    </div>
  );
};

export default Modal;
