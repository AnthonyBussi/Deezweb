'use strict';
// on récupère l'id de l'artiste dans l'url
const paramIdArtist = window.location.search;
const urlParam = new URLSearchParams (paramIdArtist);
const artistId = urlParam.get("id");

const loader = document.querySelector("#loader");

const $artistInfo = document.querySelector("#artist-info");
const $artistAlbums = document.querySelector("#artist-albums-list");
const $artistTop = document.querySelector("#artist-top-list");

fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}`)
    .then(response => response.json())
    .then(result => {       
        // console.log(result); 
        document.title = result.name + " - Deezweb";
        
        loader.style.display = "none";
        
        $artistInfo.innerHTML += `
        <div id="info-container">
            <div id="info-artist">
                <h2>${result.name}</h2>
                <p>${result.nb_album} albums</p>
                <p>${result.nb_fan} fans</p>
                <a href="${result.link}" id="goOnDeezer" target="_blank">En savoir plus</a>
            </div>     
            <div id="picture-artist-container">
                <img src="${result.picture_big}" alt="${result.name}" id="picture-artist">
            </div>           
        </div>                
        `;
        
        // on ajoute la liste des albums de l'artiste
        fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}/albums`)
        .then(response => response.json())
        .then(result => {
            // console.log(result);

            for (let i = 0, albumList = result.data; i < result.data.length; i++) {

                let album = document.createElement("li");
                album.innerHTML += `
                <div class="album-info-container">
                    <div class="info-album">
                        <img src="${albumList[i].cover_medium}" alt="Couverture de l'album ${albumList[i].title}" id="cover-album">
                        <p>${albumList[i].title}</p>
                    </div>              
                </div>                
                `;
                $artistAlbums.appendChild(album);
            }

        });
        
        // on ajoute les meilleurs titres de l'artiste
        fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}/top`)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            for (let i = 0, topTracks = result.data; i < result.data.length; i++) {
                let track = document.createElement("li");
                track.innerHTML += `
                <div class="track-info-container">
                    <div class="info-track">
                        <audio controls src="${topTracks[i].preview}"></audio>
                        <a href="track.html?id=${topTracks[i].id}">${topTracks[i].title}</a>
                        <a href="album.html?id=${topTracks[i].album.id}">${topTracks[i].album.title}</a>
                        <p>${convertTime(topTracks[i].duration)}</p>
                    </div>              
                </div>  
                `;

                $artistTop.appendChild(track);
            }
        });
    })


