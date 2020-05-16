const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const moment = require('moment');


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(`${__dirname}/../build`))
const PORT = 3030;

let dataObj = {

}
fs.readFile( './server/dataObj.json', 'utf8', (err, data) => {
    if(err) {
        console.error('Error getting datafile');
    } else {
        if (data) {
            dataObj = JSON.parse(data)
        }
    }
})
app.get('/api/getLocations', (req, res, next) => {
    fs.readFile( './server/dataObj.json', 'utf8', (err, data) => {
        if(err) {
            console.error('Error getting datafile');
        } else {
            if (data) {
                dataObj = JSON.parse(data)
                res.status(200).send(data)
            }
        }
    })
})

app.post('/api/addLocation', (req, res, next) => {
    console.log(req.body);
    const {body} = req;
    const propName = `${body.x}_${body.y}_${body.name}`;
    const saveObj = {...dataObj, [propName]: body};
    dataObj = saveObj;
    fs.writeFile('./server/dataObj.json', JSON.stringify(saveObj), function (err) {
        if (err) return console.log('error writing file: ', err);
      });
      res.sendStatus(200)
})

app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/../build/index.html"))
  })

app.listen(PORT, () => console.log("listening on port: ", PORT))
