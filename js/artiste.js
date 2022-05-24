'use strict';
// on récupère l'id de l'artiste dans l'url
const paramIdArtist = window.location.search;
const urlParam = new URLSearchParams (paramIdArtist);
const artistId = urlParam.get("id");

const loader = document.querySelector("#loader");

const $artistInfo = document.querySelector("#artist-info");
const $artistAlbums = document.querySelector("#artist-albums");
const $artistTop = document.querySelector("#artist-top");

fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}`)
    .then(response => response.json())
    .then(result => {       
        // console.log(result); 
        
        loader.style.display = "none";
        
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
        
        // on ajoute la liste des albums de l'artiste
        fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}/albums`)
        .then(response => response.json())
        .then(result => {
            // console.log(result);

            for (let i = 0, albumList = result.data; i < result.data.length; i++) {

                let album = document.createElement("div");
                album.innerHTML += `
                <div id="album-info-container">
                    <div id="cover-album-container">
                        <img src="${albumList[i].cover_medium}" alt="Couverture de l'album ${albumList[i].title}" id="cover-album">
                    </div>
                    <div id="info-album">
                        <p>${albumList[i].title}</p>
                    </div>              
                </div>                
                `;

                $artistAlbums.appendChild(album);

            }

        });
        
        // // on ajoute les meilleurs titres de l'artiste
        fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}/top`)
        .then(response => response.json())
        .then(result => {
            console.log(result);

            for (let i = 0, topTracks = result.data; i < result.data.length; i++) {
                let track = document.createElement("div");
                track.innerHTML += `
                <div id="album-info-container">
                    <div id="cover-album-container">
                        <img src="${topTracks[i].album.cover_medium}" alt="Couverture de l'album ${topTracks[i].title}" id="cover-album">
                    </div>
                    <div id="info-album">
                        <p>${topTracks[i].title}</p>
                    </div>              
                </div>  
                `;

                $artistTop.appendChild(track);

            }
        });
        
        // // on ajoute la liste des artistes similaires de l'artiste
        // fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/artist/${artistId}/related`)
        // .then(response => response.json())
        // .then(result => {
        //     console.log(result);
        // });
    })


