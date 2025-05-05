const Paintings = (props) => {
  console.log(props.paintings)
  return (
    <>    
    <div>
    {props.paintings.map((painting, index) => (
                <div className='image-card'key={painting.id}>
                    <img src={painting.primaryimageurl + "?height=250&width=250"} alt='painting'></img>
                </div>
            ))}
    </div>
    </>
    )
};

export default Paintings;
