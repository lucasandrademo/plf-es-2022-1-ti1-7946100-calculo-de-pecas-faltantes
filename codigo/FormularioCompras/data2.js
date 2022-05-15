import * as local from '../component/localStorage.js';

var dados = [
    {
        "id": 31,
        "cod": 'CA2',
        "desc": 'bagulho muito doido',
        "tkt": 6
    },
    {
        "id": 33,
        "cod": 'CB2',
        "desc": 'bagulho aleatorio 2',
        "tkt": 6
    },
    {
        "id": 51,
        "cod": 'C42',
        "desc": 'bagulho aleatorio 3',
        "tkt": 3
    },
    {
        "id": 4,
        "cod": 'CGD',
        "desc": 'bagulho aleatorio 4',
        "tkt": 9
    },
    {
        "id": 5,
        "cod": 'CGD',
        "desc": 'bagulho aleatorio 5',
        "tkt": 9
    }
]

var compras = [
    {
        "id": "CwsLQLd7tbrQkmmYnlJEoJtkR",
        "cod": "CA2",
        "desc": "bagulho muito doido",
        "qtde": 92,
        "dtCompra": "2022-05-14",
        "dtEntrega": "2022-05-24"
    },
    {
        "id": "oEoSJ3Owmx3lmR98F39LAgvcp",
        "cod": "CA2",
        "desc": "bagulho muito doido",
        "qtde": 92,
        "dtCompra": "2022-04-14",
        "dtEntrega": "2022-05-10"
    }
]

function setTemporario(){
    local.set('produtos', dados);
    local.set('compras', compras);
}

export {setTemporario}