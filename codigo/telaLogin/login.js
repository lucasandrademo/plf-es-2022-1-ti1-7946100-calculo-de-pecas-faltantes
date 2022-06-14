
let credenciais = [{

    nome: "admin",

    senha: "admin",

}, 

{

    nome: "jiraya",

    senha: "erosennin",
    
}

]

const btn$ = document.getElementById("button");


// no primeiro if, no lugar do link, colocar o diretorio da pagina peças faltantes

btn$.addEventListener("click", function(){

    const user$ = document.getElementById("user").value;
    const pass$ = document.getElementById("pass").value;


    if(credenciais[0].nome == user$ && credenciais[0].senha == pass$){

        window.location.href = "../TelasPeçasFaltantes/index.html";
    }
    else if(credenciais[1].nome == user$ && credenciais[1].senha == pass$){

        window.location.href = "https://youtu.be/StPJhWmfzjU";
    }
    else
    {

        alert("Usuário e/ou senha errados!");
    }

});

