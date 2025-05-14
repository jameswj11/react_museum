import { useState } from "react";

const Modal = (props) => {
  let isOpen;
  let content = [];
  let modalContent = {};
  props.isOpen == true ? (isOpen = " open") : (isOpen = " closed");

  console.log("modal clicked", "content is:", props.content, "isOpen?", isOpen);

  console.log("toggling, open?", props.isOpen);
  //   if (!props.isOpen) {
  //     // handle document body
  //     const scrollY = window.scrollY;
  //     document.body.style.position = 'fixed';
  //     document.body.style.top = `-${scrollY}px`;
  //     document.body.style.width = '100%';
  //     document.body.classList.add('modal-open');

  //     props.setIsOpen(true)
  //   } else {
  //     const scrollY = parseInt(document.body.style.top || '0');
  //     document.body.style.position = '';
  //     document.body.style.top = '';
  //     document.body.style.width = '';
  //     document.body.classList.remove('modal-open');
  //     window.scrollTo(0, -scrollY);
  //     props.setIsOpen(true)
  //   }

  if (Object.keys(props.content).length) {
    console.log("should be content");
    modalContent = {
      title: props.content.title,
      century: props.content.century,
      classification: props.content.classification,
      division: props.content.division,
      department: props.content.department,
      date: props.content.dated,
      culture: props.content.culture,
      creditline: props.content.creditline,
      copyright: props.content.copyright,
    };

    Object.keys(modalContent).map((key) => {
      content.push(
        <p key={key}>
          <b>{key + ": "}</b>
          {modalContent[key]}
        </p>
      );
    });
  }

  console.log("content:", content, "modalContent:", modalContent);
  // set modal content

  return (
    <div>
      <div
        className={props.isOpen ? "modalBG-open" : "modalBG-closed"}
        onClick={(event) => {
            if (event.target.className != "modalBG-open") return;

            // console.log('event target:', event, 'this:', this)
          props.setIsOpen(false);
        }}
      >
        <div className="modalData">
          <div className="modalImgContainer">
            <img
              className="modalImg"
              src={props.content.primaryimageurl}
              alt={props.content.title}
            />
          </div>
          <div className="modalContentContainer">
            {content}
            <button
              id="saveToFavoritesBtn"
              className="saveToFavoritesBtn"
              onClick={(event) => {
                console.log("save to favorites");
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
