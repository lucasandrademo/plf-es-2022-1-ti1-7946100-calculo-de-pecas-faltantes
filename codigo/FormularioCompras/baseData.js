const set = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));
const get = (name) => JSON.parse(localStorage.getItem(name));

var produtos = [
    {
        "id": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "cod": 'CA2',
        "desc": 'Cabine Trator',
        "tkt": 6
    },
    {
        "id": 'AXjAETSFuUK5pVQUwJbR3iFSK',
        "cod": 'CB2',
        "desc": 'Cabine Empilhadeira',
        "tkt": 6
    },
    {
        "id": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "cod": 'C42',
        "desc": 'Sistema Embreagem',
        "tkt": 3
    },
    {
        "id": '7WduClLpO6AUzylqMNmM2PRZe',
        "cod": 'CGD',
        "desc": 'Motor CC',
        "tkt": 9
    },
    {
        "id": '8iyCp1KTWImAOb1qaneSf6t0A',
        "cod": 'C9D',
        "desc": 'Motor CA',
        "tkt": 9
    }
]

var compras = [
    {
        "id": "CwsLQLd7tbrQkmmYnlJEoJtkR",
        "produto": 'IYfFhyYpSUIWGVjAnPUyWevza',
        "qtde": 92,
        "dtCompra": "2022-05-14",
        "dtEntrega": "2022-05-24"
    },
    {
        "id": "oEoSJ3Owmx3lmR98F39LAgvcp",
        "produto": 'QZ8NPsoeLhmbRT2MmrA4LiAbq',
        "qtde": 92,
        "dtCompra": "2022-04-14",
        "dtEntrega": "2022-05-10"
    }
]

var margemPadrao = 3
var produtos;

function selectOptions(obj, msg = '', showCod = true){
    let html = '';
    if(msg != ''){
        html += `<option value="" disabled selected hidden>${msg}</option>`;
    }
    obj.forEach(item => {
        html +=
        `<option value="${item.id}">
            ${showCod && item.cod + ' - '}
            ${item.desc}
        </option>`;
    });
    return html;
}

function setTemporario(){
    set('produtos', produtos);
    set('compras', compras);
    set('margemPadrao', margemPadrao);
}

$(document).ready(() => {
    setTemporario();
    produtos = get('produtos');
    setProdutosSelect();
    $('.bootstrap-table').css('width', '90%')
})

function setProdutosSelect(){
    const html = selectOptions(
        produtos,
        'Selecione um Produto'
    );
    $('.produtos-select').html(html);
}