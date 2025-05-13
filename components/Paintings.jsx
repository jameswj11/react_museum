import notFound from './not-found.png';
const Paintings = (props) => {
  console.log('paintings mounted')
  // console.log('props.paintings:', props.paintings);
  let paintings = [];

  let sorted = props.paintings.sort()
  props.paintings.forEach((painting) => {
    let url = '';
    let imgObj;

    
    if (painting.primaryimageurl) {
      imgObj = <img src={painting.primaryimageurl + "?width=350"} onError={e => e.currentTarget.src = notFound} className="img-fluid" alt='painting'></img>;
    } else {
      imgObj = <img src={notFound} className="img-fluid"></img>;
    }
    

    paintings.push(
    <div className='image-card'key={painting.id}>
      {imgObj}
      <div className="image-info">
      <h4>{painting.title}</h4>
      {painting.people ? <p>{painting.people[0].name} </p> : <br/>}
      {painting.dated ? <p>{painting.dated}</p> : <br />}
      </div>
    </div>)
  })

  return (   
    <div className="image-grid">
      {paintings}
    </div>
    )
};

export default Paintings;
