const Modal = ({ isOpen, setIsOpen, content, favorites, setFavorites }) => {
  let modalObj = [];
  let data = {};

  if (Object.keys(content).length) {
    console.log(content)
    data = {
      title: content.title,
      maker: '',
      culture: content.culture,
      date: content.dated,
      labeltext: content.labeltext,
      classification: content.classification,
      creditline: content.creditline,
      provenance: content.provenance,
      copyright: content.copyright,
    };

    if (content.peoplecount > 0) {
        data.maker = content.people[0].name
=       data.displaydate = content.people[0].displaydate;
        data.birthplace = content.people[0].birthplace;
        data.deathplace = content.people[0].deathplace;
    }

    Object.keys(data).map((key) => {
      modalObj.push(
        <p key={key}>
          {data[key]}
        </p>
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

        return item.favorite == true
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
          </div>
          <div className="modalContentContainer">
            {modalObj}
            <button
              id="saveToFavoritesBtn"
              className="saveToFavoritesBtn"
              onClick={(event) => {
                handleSetFavorite();
              }}
            >
              {content.favorite == true
                ? "Remove From Favorites"
                : "Save To Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
