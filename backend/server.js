import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from 'path';

const PORT = process.env.PORT || 8888;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

app.get('/api', async (req, res) => {
    await getData()
    // res.send(data)
})


app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
})

async function getData() {
    const api_URL = "https://api.harvardartmuseums.org/object?apikey=df765b0b-5b18-4c03-ab7a-5538cf101bb3&hasimage=1&size=100&classification=26"

    try {
        const response = await fetch(api_URL, {
            method: 'get'
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        console.log(result)
        // const data = parseData(result)
        // return data;
    } catch(err) {
        console.error(err)
    }
    return 'hello from getData'
};

async function parseData(data) {
    const itemURL = data.orderedItems[0].id;
    // console.log('item:', item)
    try {
        const response = await fetch(itemURL, {
            method: 'get'
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        return result;
        console.log('response:', result)

    } catch(err) {
        console.error(err)
    }
}