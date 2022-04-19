let nomeCantor=document.getElementById("cantor");
let nomeMusica=document.getElementById("musica");
let butaoPesquisar=document.getElementById("pesquisar");
let display=document.getElementById("r");

let letraOriginal=document.getElementById("letra-original");

let letraTraduzida=document.getElementById("letra-traduzida");

butaoPesquisar.addEventListener("click",main);

       
function fazGet(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function main() {
    var artist = nomeCantor.value;
    var song   = nomeMusica.value;
    let data = fazGet("https://api.vagalume.com.br/search.php"+ "?art=" + artist+ "&mus=" + song+ "&apikey={e08a0f4a0a3d63dee906a2ad02fd5851}");
    let resultado = JSON.parse(data);
    
    if(resultado.type == "exact" || resultado.type == "aprox")
    {

        var traduzida;
        var letra=`${resultado.mus[0].text}`;
        if(resultado.mus[0].translate==undefined)
        {
            traduzida="Não há tradução";
        }
        else{
            traduzida=resultado.mus[0].translate[0].text;
            
        }
        
        display.innerHTML="";
        letraOriginal.innerText=resultado.mus[0].name+"\n\n\n"+letra;
        letraTraduzida.innerText=traduzida;
    }
    else{
         display.innerHTML="Letra nao encontrada";
         letraOriginal.innerText="";
        letraTraduzida.innerText="";
    }
}