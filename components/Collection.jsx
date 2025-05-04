const Paintings = (props) => {
  return (
    <>    
    <div>
    {props.paintings.map((painting, index) => (
                <div className='image-card'key={painting.id}>
                    <img src={"https://ids.lib.harvard.edu/ids/view/" + painting.images[0].idsid} alt='painting'></img>
                </div>
            ))}
    </div>
    </>
    )
};

export default Paintings;
