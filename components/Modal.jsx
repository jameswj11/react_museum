import { useState } from "react";

const Modal = (props) => {
  let isOpen;
  let content = [];
  let modalContent = {};
  props.isOpen == true ? (isOpen = " open") : (isOpen = " closed");

  console.log("modal clicked", "content is:", props.content);

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
            <p><b>{key + ": "}</b>{modalContent[key]}</p>
        )
    });
  }

  console.log('content:', content, 'modalContent:', modalContent)
  // set modal content

  return (
    <div>
      <div className={"modalBG" + isOpen}>
        <div className="ModalData">
            <img src={props.content.primaryimageurl} alt={props.content.title} />
            {
                content
            }
        </div>
      </div>
    </div>
  );
};

export default Modal;
