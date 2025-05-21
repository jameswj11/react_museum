import { useEffect } from "react";

const NextPageNav = (props) => {
  const maxPages = 5;
  const numPages = props.numPages;
  let pagesToDisplay;
  let currentPage = props.currentPage;

  if (numPages <= maxPages) {
    pagesToDisplay = new Array(numPages).fill("");
  } else {
    pagesToDisplay = new Array(maxPages).fill("");
  }

  const handlePageNavClick = (event) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (event.target.id == "prevPageButton") {
        currentPage--
    } else if (event.target.id == "nextPageButton") {
        currentPage++
    } else {
        if (props.currentPage != event.target.innerHTML) {
            currentPage = event.target.innerHTML;
        }
    }

    props.setCurrentPage(currentPage)
  }

  const checkActivePage = () => {
    const buttons = Array.from(document.getElementsByClassName('pageNavButton'))

    buttons.forEach((button) => {
        if (currentPage == button.innerHTML) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    })
  }
  
  checkActivePage()

  return (
    <div id="pageNav" className="row mt-5">
      <div className="col pageNavContainer">

        {/* previous page button if current page is not 1 */}
        {currentPage > 1 ? (
          <button
            id="prevPageButton"
            className="btn btn-outline-dark pageNavButton"
            onClick={(event) => {
              handlePageNavClick(event)
            }}
          >
            {"<"}
          </button>
        ) : null}

        {/* button for pages */}
        {pagesToDisplay.map((page, index) => (
          <button
            id="pageButton"
            className={
                "btn btn-outline-dark pageNavButton"
            }

            onClick={(event) => {
                handlePageNavClick(event)
              if (props.currentPage != event.target.innerHTML) {
                currentPage = event.target.innerHTML;
                props.setCurrentPage(currentPage);
              }
            }}
            key={index}
          >
            {currentPage <= 3 ? index + 1 : 
             currentPage > (numPages - 2) ? index + 3 :
             index + (currentPage - 2)}
          </button>
        ))}

        {/* next page button */}
        {currentPage < numPages ? (
          <button
            id="nextPageButton"
            className="btn btn-outline-dark pageNavButton"
            onClick={(event) => {
                handlePageNavClick(event)
              props.setCurrentPage(currentPage);
            }}
          >
            {">"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NextPageNav;
