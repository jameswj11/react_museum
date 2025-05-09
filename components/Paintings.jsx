const Paintings = (props) => {
  console.log('props.paintings:', props.paintings);
  let paintings = [];

  let sorted = props.paintings.sort()
  props.paintings.forEach((painting) => {
    let url = '';
    let imgObj;

    if (painting.primaryimageurl) {
      imgObj = <img src={painting.primaryimageurl + "?width=350"} className="img-fluid" alt='painting'></img>;
    } else {
      imgObj = <div className="imgNotAvailable"><p>Image Not Available</p></div>;
    }

    paintings.push(
    <div className='image-card'key={painting.id}>
      {imgObj}
      <h4>{painting.title}</h4>
      {painting.people ? <p>{painting.people[0].name} </p> : <br/>}
      {painting.dated ? <p>{painting.dated}</p> : <br />}
    </div>)
  })

  console.log('paintings:', paintings)

  return (   
    <div className="image-grid">
      {paintings}
    </div>
    )
};

export default Paintings;
