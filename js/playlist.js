'use strict';
// on récupère l'id de l'artiste dans l'url
const paramIdTrack = window.location.search;
const urlParam = new URLSearchParams (paramIdTrack);
const playlistId = urlParam.get("id");

const loader = document.querySelector("#loader");

const $playlistInfo = document.querySelector("#playlist-info");

const $playlistTracks = document.querySelector("#playlist-tracks");
const $nbTracks = document.querySelector("#nb-tracks");
const $duration = document.querySelector("#duration");


fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/playlist/${playlistId}`)
    .then(response => response.json())
    .then(result => {        
        console.log(result);
        
        loader.style.display = "none";
        
        $playlistInfo.innerHTML += `  
            <div id="playlist-data">  
                <img src="${result.picture_medium}">
                <div>
                    <h2>${result.title}</h2>
                    <p class="description">${result.description}</p>
                    <p>Durée totale : ${convertTime(result.duration)}</p>
                    <p>${result.fans} fans</p>
                    <a href="${result.link}" id="goOnDeezer" target="_blank">Voir sur Deezer <i class="fas fa-arrow-right"></i></a>                                        
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

        // on affiche la durée totale de la playlist
        $duration.innerHTML += `
            <p>${convertTime(result.duration)}</p>
        `

        for(let i = 0, trackList = result.tracks.data; i < result.nb_tracks ; i++) {
             
            // Pour chaque chanson, on crée une balise li
             let track = document.createElement('li');
             track.classList.add("track");
             track.innerHTML = `
                <div>
                    <div class="track-info">
                        <img src="${trackList[i].album.cover_small}" alt="${trackList[i].title}">
                        <div>
                            <a href="track.html?id=${trackList[i].id}" class="track-title">${trackList[i].title}</a><span> - </span>
                            <a href="album.html?id=${trackList[i].album.id}" class="track-album">${trackList[i].album.title}</a><span> - </span>
                            <a href="artist.html?id=${trackList[i].artist.id}" class="track-artist">${trackList[i].artist.name}</a>
                        </div>
                    </div>
                    <span>${convertTime(trackList[i].duration)}</span>
                 </div>
             `;
 
             // on insère les balises li créées dans la liste #tracks-list
             document.querySelector('#playlist-tracks-list').appendChild(track);
        }


    })
