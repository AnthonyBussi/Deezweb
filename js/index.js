'use strict';
const $requestValue = document.querySelector("#request");
const $order = document.querySelector("#orderBy");
const $emptySearch = document.querySelector("#emptySearch");
const $resultLength = document.querySelector("#resultLength");
const $showAlbum = document.querySelector("#showAlbum");
const $showArtist = document.querySelector("#showArtist");
const $ctnr = document.querySelector("#resultsContainer");

document.querySelector("#searchButton").addEventListener("click", () => {
    $ctnr.innerHTML = "";
    $emptySearch.innerHTML = "";
    $resultLength.innerHTML = "";
    if($requestValue.value !== "") {
        fetch(`https://api.deezer.com/search?q=${$requestValue.value}&order=${$order.value}`)
        .then(response => response.json())
        .then(result => {

            // on affiche le nombre de résultat
            if (result.data.length == 0) {                
                $resultLength.innerHTML = "Aucun résultat <i class=\"far fa-frown\"></i>";
            } else if (result.data.length < 2){
                $resultLength.innerHTML = "1 résultat";
            } else {
                $resultLength.innerHTML = `${result.data.length} résultats`;
            }

            showResult(result.data);




        })
        .catch(err => {
            console.log("Une erreur inconnue est survenue");
        })
    }
    else {
        // Message d'erreur dans le cas où l'utilisateur fait une recherche sans saisir d'information
        $emptySearch.innerHTML = "Veuillez saisir une recherche !";
    }
});


const showResult = results => {
    results.forEach(result => { 
        $ctnr.innerHTML += `
        <li class="searchResult">
            <div class="detailsResult">
                <img src="${result.album.cover}" alt="${result.album.title} - Pochette de l'album">
                <h3>${result.title}</h3>
                <h4>${result.artist.name}</h4>
                <p>${result.album.title}</p>
                <p>Durée : ${convertTime(result.duration)}</p>
            </div>
            <button id="favoriteButton">
                <div class="icon">         
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 521 512"><path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268
                    c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514
                    c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482
                    s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514
                    C512,93.417,453.532,30,376,30z"/>
                </div>  
            </button>
            <div class="resultLinks">
                <div class="resultLink" id="listenTrack">
                    <a href="pages/titre.html?id=${result.id}">Ecouter un extrait</a>
                </div>
                <div class="resultLink" id="showAlbum">
                    <a href="pages/album.html?id=${result.album.id}">Voir l'album</a>
                </div>
                <div class="resultLink" id="showArtist">
                    <a href="pages/artiste.html?id=${result.artist.id}">Voir l'artiste</a>
                </div>
            </div>
        </li>
        `;
    });
}