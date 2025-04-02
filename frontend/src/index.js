import ReactDOM from 'react-dom/client';
import Main from './Main.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const api_URL = "https://www.rijksmuseum.nl/api/en/collection?key=KdQMz9Tk&hasImage=true";
// const new_api_URL = "https://data.rijksmuseum.nl/search/collection?type=painting"; awaiting response from Rijksmuseum about CORS issues

async function getData() {
    console.log('get data')
    try {
        const response = await fetch(api_URL, {
            method: 'get'
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        console.log('response:', response)
        handleData(result)
    } catch(err) {
        console.error(err)
    }
}

function handleData(data) {
    console.log('handle data:', data)
}

// getData()

root.render(
    <Main />
)