const NextPageNav = (props) => {
    const maxPages = 5;
    const numPages = props.numPages;
    let pagesToDisplay;
    let currentPage = props.currentPage;

    let nextPage;
    let lastPage;

    console.log('current page', props.currentPage)

    if (numPages <= maxPages) {
        pagesToDisplay = new Array(numPages).fill('');
    } else {
        pagesToDisplay = new Array(maxPages).fill('');
    }

    return (
        <div>
            {
                currentPage > 1 ? <button onClick={(event) => {
                    currentPage--;
                    props.setCurrentPage(currentPage)
                }}>Last Page</button> : null
            }

            {pagesToDisplay.map((page, index) => (
                <button onClick={(event) => {
                    console.log('index:', index)
                    if (props.currentPage != event.target.innerHTML) {
                        currentPage = event.target.innerHTML;
                        props.setCurrentPage(currentPage)
                    }
                }} key={index}>
                    {
                        (currentPage <= 3) ? (index + 1)  : index + (currentPage - 2)
                    }
                </button>
            ))}

            {
                currentPage < numPages ? 
                <button onClick={(event) => {
                    console.log(props.info)
                    currentPage++;
                    props.setCurrentPage(currentPage)
                }}>Next Page</button>
                : null
            }
        </div>
    )
};

export default NextPageNav;