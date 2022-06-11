const btnIncrementa$ = document.getElementById("btnIncrementa");
const btnDecrementa$ = document.getElementById("btnDecrementa");
const container = document.querySelector(".container");
const p$ = document.getElementById("pContador");




if (localStorage.getItem('produtos') === null) {
    localStorage.setItem('produtos', JSON.stringify([]));
} 

let produtos = JSON.parse(localStorage.getItem('produtos'));

let pecas = [{

    nome: "peça1",

    codigo: "2132983219",

    quantidade: 0,
}, 

{
    nome: "peça2",

    codigo: "71449832219",

    quantidade: 0,
    
},


]



function listarDadosNaTabelaDePecas(){

    for(let i = 0; i < pecas.length; i++){
        let divQuantificacao = document.createElement("DIV")
        let nomeP = document.createElement("P")
        let codigoP = document.createElement("P")
        let divQuantifica = document.createElement("DIV")
        let quantidadeBttn1 = document.createElement("BUTTON")
        let quantidadeP = document.createElement("P")
        let quantidadeBttn2 = document.createElement("BUTTON")

        quantidadeBttn1.setAttribute("ID", `incrementa_${pecas[i].codigo}`)
        quantidadeBttn2.setAttribute("ID", `decrementa_${pecas[i].codigo}`)
        quantidadeP.setAttribute("ID", `pContador_${pecas[i].codigo}`)
        

        let textoNome = document.createTextNode(`${pecas[i].nome}`);
        let textoCodigo = document.createTextNode(`${pecas[i].codigo}`);
        let textoQuantidade = document.createTextNode(`${pecas[i].quantidade}`);
        let incremento = document.createTextNode(`+`)
        let decremento = document.createTextNode(`-`)
        
        divQuantificacao.appendChild(nomeP)
        divQuantificacao.appendChild(codigoP)
        divQuantificacao.appendChild(divQuantifica)

        divQuantifica.appendChild(quantidadeBttn2)
        divQuantifica.appendChild(quantidadeP)
        divQuantifica.appendChild(quantidadeBttn1)

        nomeP.appendChild(textoNome)
        codigoP.appendChild(textoCodigo)
        quantidadeBttn2.appendChild(decremento)
        quantidadeBttn1.appendChild(incremento)
        quantidadeP.appendChild(textoQuantidade)

        divQuantifica.className = "divQuantifica"
        divQuantificacao.className = "containerQuantificacao"
        nomeP.className = "paragrafoQuantifica"
        codigoP.className = "paragrafoQuantifica"
        quantidadeBttn2.className = "btns"
        quantidadeBttn1.className = "btns"
        quantidadeP.className = "paragrafoContador"
        
        container.appendChild(divQuantificacao)

        quantidadeBttn1.addEventListener("click", function(){
            
            pecas[i].quantidade++
            quantidadeP.innerHTML = pecas[i].quantidade
        
            
            });   
            
        quantidadeBttn2.addEventListener("click", function(){

            pecas[i].quantidade--
            
            if(pecas[i].quantidade < 0) {
            
                pecas[i].quantidade = 0
            
            
            }
            
            quantidadeP.innerHTML = pecas[i].quantidade
            
        });



    }
}

listarDadosNaTabelaDePecas();



    


