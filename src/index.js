import ReactDOM from 'react-dom/client';
import Main from './Main.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

fetchData()
function fetchData() {
    fetch("https://api.harvardartmuseums.org/object?apikey=df765b0b-5b18-4c03-ab7a-5538cf101bb3&hasimage=1&size=2&classification=26&sort=random")
    .then((response) => { return response.json()})
    .then((json) => {
        console.log(json)
    })
}

root.render(
    <div>
        <Main />
    </div>
)