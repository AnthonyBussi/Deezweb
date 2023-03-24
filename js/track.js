'use strict';
// on récupère l'id de l'artiste dans l'url
const paramIdTrack = window.location.search;
const urlParam = new URLSearchParams (paramIdTrack);
const trackId = urlParam.get("id");

const loader = document.querySelector("#loader");

const $trackInfo = document.querySelector("#track-info");

fetch(`https://api.deezer.com/track/${trackId}`)
    .then(response => response.json())
    .then(result => {        
        document.title = result.title + " - Deezweb";
        
        loader.style.display = "none";
        
        console.log(typeof result.release_date);

        $trackInfo.innerHTML += `
        <div id="track-container">            
            <img src="${result.album.cover_medium}">
            <audio controls src="${result.preview}"></audio>
            <h2>${result.title}</h2>
            <div id="track-artist-info">
                <img src="${result.artist.picture_medium}" alt="Photo de ${result.artist.name}">
                <a href="artist.html?id=${result.artist.id}">${result.artist.name}</a>
            </div>
            <p>${convertTime(result.duration)}</p>
            <p>Titre tiré de l'album <a href="album.html?id=${result.album.id}"><span id="album-title">${result.album.title}</span></a></p>
            <p>${convertDate(result.release_date)}</p>
            <a href="${result.link}" id="goOnDeezer" target="_blank">Ecouter sur Deezer</a>                               
        </div>                
        `;
    })
