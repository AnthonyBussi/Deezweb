'use strict';
// on récupère l'id de l'artiste dans l'url
const paramIdArtist = window.location.search;
const urlParam = new URLSearchParams (paramIdArtist);
const artistId = urlParam.get("id");

const $artistInfo = document.querySelector("#artist-info");

fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}`)
    .then(response => response.json())
    .then(result => {       
        console.log(result); 
        $artistInfo.innerHTML += `
        <div id="info-container">
            <div id="picture-artist-container">
                <img src="${result.picture_big}" alt="${result.name}" id="picture-artist">
            </div>
            <div id="info-artist">
                <h2>${result.name}</h2>
                <p>${result.nb_album} albums</p>
                <p>${result.nb_fan} fans</p>
                <a href="${result.link}" id="goOnDeezer" target="_blank">Voir sur Deezer</a>
            </div>                
        </div>                
        `;
    })


