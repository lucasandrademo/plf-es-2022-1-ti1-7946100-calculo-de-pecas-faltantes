const btnIncrementa$ = document.getElementById("btnIncrementa");
const btnDecrementa$ = document.getElementById("btnDecrementa");
const container = document.querySelector(".container");
const p$ = document.getElementById("pContador");

if (localStorage.getItem('produtos') === null) {
    localStorage.setItem('produtos', JSON.stringify([]));
} 

let pecas = JSON.parse(localStorage.getItem('pecas'));


function listarDadosNaTabelaDePecas(){

    for(let i = 0; i < pecas.length; i++){
        let divQuantificacao = document.createElement("DIV")
        let nomeP = document.createElement("P")
        let codigoP = document.createElement("P")
        let divQuantifica = document.createElement("DIV")
        let qtdeBttn1 = document.createElement("BUTTON")
        let qtdeP = document.createElement("P")
        let qtdeBttn2 = document.createElement("BUTTON")

        qtdeBttn1.setAttribute("ID", `incrementa_${pecas[i].codigo}`)
        qtdeBttn2.setAttribute("ID", `decrementa_${pecas[i].codigo}`)
        qtdeP.setAttribute("ID", `pContador_${pecas[i].codigo}`)
        

        let textoNome = document.createTextNode(`${pecas[i].nome}`);
        let textoCodigo = document.createTextNode(`${pecas[i].codigo}`);
        let textoqtde = document.createTextNode(`${pecas[i].qtde}`);
        let incremento = document.createTextNode(`+`)
        let decremento = document.createTextNode(`-`)
        
        divQuantificacao.appendChild(nomeP)
        divQuantificacao.appendChild(codigoP)
        divQuantificacao.appendChild(divQuantifica)

        divQuantifica.appendChild(qtdeBttn2)
        divQuantifica.appendChild(qtdeP)
        divQuantifica.appendChild(qtdeBttn1)

        nomeP.appendChild(textoNome)
        codigoP.appendChild(textoCodigo)
        qtdeBttn2.appendChild(decremento)
        qtdeBttn1.appendChild(incremento)
        qtdeP.appendChild(textoqtde)

        divQuantifica.className = "divQuantifica"
        divQuantificacao.className = "containerQuantificacao"
        nomeP.className = "paragrafoQuantifica"
        codigoP.className = "paragrafoQuantifica"
        qtdeBttn2.className = "btns"
        qtdeBttn1.className = "btns"
        qtdeP.className = "paragrafoContador"
        
        container.appendChild(divQuantificacao)

        qtdeBttn1.addEventListener("click", function(){
            
            pecas[i].qtde++
            qtdeP.innerHTML = pecas[i].qtde
        
            localStorage.setItem('pecas', JSON.stringify(pecas));
            
            });   
            
        qtdeBttn2.addEventListener("click", function(){

            pecas[i].qtde--
            
            if(pecas[i].qtde < 0) {
            
                pecas[i].qtde = 0
            
            
            }
            
            qtdeP.innerHTML = pecas[i].qtde
            localStorage.setItem('pecas', JSON.stringify(pecas));
            
        });



    }
}

listarDadosNaTabelaDePecas();



    


