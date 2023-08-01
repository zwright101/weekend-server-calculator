let express = require('express');
let app = express();
const port = 5001;

app.use(express.json());

app.use(express.static('server/public'));

app.listen(port, function(){
    console.log('listening on port' , port);
})

let results = [];

let resultHistory = [];

app.get('/results' , (req, res) => {
    console.log('GET request for /results');
    res.send(results);
})

app.get('/history' , (req, res) => {
    console.log('GET request for results history');
    res.send(resultHistory);
})

app.post('/history' , (req, res) => {
    console.log('POST request for /history');
    let numbersToAdd = req.body;
    let newResult;

    if (numbersToAdd.operator === '+') {
        newResult = Number(numbersToAdd.number1) + Number(numbersToAdd.number2);
    }else if (numbersToAdd.operator === '-'){
        newResult = Number(numbersToAdd.number1) - Number(numbersToAdd.number2);
    }else if (numbersToAdd.operator === '*'){
        newResult = Number(numbersToAdd.number1) * Number(numbersToAdd.number2);
    }else if (numbersToAdd.operator === '/'){
        newResult = Number(numbersToAdd.number1) / Number(numbersToAdd.number2);
    }

    let calculation = `${numbersToAdd.number1} ${numbersToAdd.operator} ${numbersToAdd.number2} = ${newResult}`
    resultHistory.push(calculation);
    results.push(newResult);
    res.sendStatus(201);
})