'use strict';
// on récupère l'id de l'album dans l'url
const paramIdAlbum = window.location.search;
const urlParam = new URLSearchParams (paramIdAlbum);
const albumId = urlParam.get("id");

const loader = document.querySelector("#loader");

const $albumInfo = document.querySelector("#album-info");
const $nbTracks = document.querySelector("#nb-tracks");

fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/album/${albumId}`)
    .then(response => response.json())
    .then(result => {        
        document.title = result.title + " - Deezweb";
        
        loader.style.display = "none";
        
        $albumInfo.innerHTML += `
        <div id="album-info-container">
            <div id="cover-album-container">
                <img src="${result.cover_big}" alt="Couverture de l'album ${result.title}" id="cover-album">
            </div>
            <div id="info-album">
                <h2>${result.title}</h2>
                <div id="album-artist-info">
                    <img src="${result.artist.picture_medium}" alt="${result.title} cover">
                    <a href="artist.html?id=${result.artist.id}">${result.artist.name}</a>                    
                </div>
                <a href="${result.link}" id="goOnDeezer" target="_blank">Ecouter sur Deezer</a>
            </div>              
        </div>                
        `;
        // on affiche le nombre de titres présents dans l'album
        if (`${result.nb_tracks}` == 1){            
            $nbTracks.innerHTML +=`
            <p>${result.nb_tracks} titre</p>
            `;
        } else {
            $nbTracks.innerHTML +=`
                <p>${result.nb_tracks} titres</p>
            `;
        }

        // On utilise une boucle pour récupérer et afficher toutes les chansons de l'album
        for (let i = 0, trackList = result.tracks.data; i < result.nb_tracks ; i++) {

            // Pour chaque chanson, on crée une balise li
            let track = document.createElement('li');
            track.innerHTML = `
                <a href="track.html?id=${trackList[i].id}">${trackList[i].title}</a>
                <span>${convertTime(trackList[i].duration)}</span>
            `;

            // on insère les balises li créées dans la liste #tracks-list
            document.querySelector('#tracks-list').appendChild(track);
        }
    })