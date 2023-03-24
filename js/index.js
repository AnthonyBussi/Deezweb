'use strict';
let loader = document.querySelector("#loader");
// let requestValue = document.querySelector("#request");
// let orderSorting = document.querySelector("#orderBy");
// let emptySearch = document.querySelector("#emptySearch");
// let resultLength = document.querySelector("#resultLength");
// let showAlbum = document.querySelector("#showAlbum");
// let showArtist = document.querySelector("#showArtist");
// let resultContainer = document.querySelector("#resultsContainer");
// let searchError = document.querySelector('#search-error');

let topArtists = document.querySelector('#topArtists');
let topAlbums = document.querySelector('#topAlbums');
let topTracks = document.querySelector('#topTracks');
let topPlaylists = document.querySelector('#topPlaylists');
let topPodcasts = document.querySelector('#topPodcasts');

// document.querySelector("#searchButton").addEventListener("click", () => {
//     if (requestValue.value) {
//         window.fetch(`https://api.deezer.com/search?q=${requestValue.value}&order=${orderSorting.value}`)
//             .then(response => response.json())
//             .then(result => {
//                 console.log(result);

//                 const resultData = result.data;
//                 const resDataLength = resultData.length;

//                 //si recherche sans résultat ou mauvaise recherche
//                 if (resDataLength == 0) {
//                     resultLength.innerHTML = "Il n'y a aucun résultat";
//                 }
//                 else {
//                 //afficher nombre de résultats
//                     if (resDataLength < 2) {
//                         resultLength.innerHTML = `${resDataLength} résultat`;
//                     }
//                     else {
//                         resultLength.innerHTML = `${resDataLength} résultats`;
//                     }
//                 }

//                 resultContainer.innerHTML = ''; //le bloc se vide avant chaque recherche
//                 // searchError.innerHTML = ''; //h2 error se vide avant la recherche

//                 for (let i = 0; i < resDataLength; i++) {

//                     let trackId = resultData[i].id;
//                     let albumId = resultData[i].album.id;
//                     let artistId = resultData[i].artist.id;

//                     // on crée tout les éléments avec les classes et id nécessaires
//                     let newResult = document.createElement("li");
//                     newResult.classList.add("searchResult");
//                     let newResultDetails = document.createElement("div");
//                     newResultDetails.classList.add("detailsResult");
//                     let newImage = document.createElement("img");
//                     newImage.setAttribute("src", resultData[i].album.cover_medium);
//                     newImage.setAttribute("alt", resultData[i].album.title);

//                     let newTitle = document.createElement("a");
//                     newTitle.classList.add("track-title");
//                     newTitle.setAttribute("href", `pages/track.html?id=${trackId}`);
//                     newTitle.innerHTML += `
//                         ${resultData[i].title}
//                     `;

//                     let newArtistName = document.createElement("a");
//                     newArtistName.classList.add("artist-name");
//                     newArtistName.setAttribute("href", `pages/artist.html?id=${artistId}`);
//                     newArtistName.innerHTML += `
//                         ${resultData[i].artist.name}
//                     `;
//                     let newAlbumTitle = document.createElement("a");
//                     newAlbumTitle.classList.add("album-title");
//                     newAlbumTitle.setAttribute("href", `pages/album.html?id=${albumId}`)
//                     newAlbumTitle.innerHTML += `
//                         ${resultData[i].album.title}
//                     `;

//                     let newTrackDuration = document.createElement("p");
//                     newTrackDuration.classList.add("track-duration");
//                     newTrackDuration.innerHTML += `
//                         ${convertTime(resultData[i].duration)}
//                     `;
                    
//                     const $favoriteButton = document.createElement('button');
//                     $favoriteButton.setAttribute("id", "favoriteButton");
//                     $favoriteButton.innerHTML += '<i class="far fa-heart"></i>';                    

//                     // on insère les détails des résultats dans l'élément parent
//                     newResultDetails.appendChild(newImage);
//                     newResultDetails.appendChild(newImage);
//                     newResultDetails.appendChild(newTitle);
//                     newResultDetails.appendChild(newArtistName);
//                     newResultDetails.appendChild(newAlbumTitle);
//                     newResultDetails.appendChild(newTrackDuration);

//                     // on insère les éléments dans la carte
//                     newResult.appendChild(newResultDetails);
//                     newResult.appendChild($favoriteButton);

//                     // on insère le nouveau résultat dans le container
//                     resultContainer.appendChild(newResult);
                
//                     // on ajoute les éléments au favoris au click
//                     $favoriteButton.addEventListener("click", () => {
//                         let track_List = localStorage.getItem('deezweb_tracksId');

//                         //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
//                         track_List = track_List ? JSON.parse(track_List) : [];

//                         // si l'id est déjà dans le tableau on l'enlève, sinon on l'ajoute, et on modifie le style du bouton en fonction
//                         if (track_List.includes(trackId)) {
//                             track_List.splice(track_List.indexOf(trackId), 1);
//                             $favoriteButton.style.cssText = "color: #FFFFFF";
//                         }
//                         else {
//                             track_List.push(trackId);
//                             $favoriteButton.style.cssText = "color: var(--favourite-color)"; 
//                         }

//                         localStorage.setItem('deezweb_tracksId', JSON.stringify(track_List)); //on enregistre dans localstorage
//                     });
//                 }
//             })
//             // .catch(err => {
//             //     console.log("Une erreur inconnue est survenue");
//             // })
//     }
//     else {
//         searchError.innerHTML = "<h2>Aucun résultat</h2>"; //gestion de l'erreur "recherche vide"
//         resultContainer.innerHTML = '';
//         resultLength.innerHTML = '';
//     }
// });

fetch(`https://api.deezer.com/chart/`)
    .then(response => response.json())
    .then(result => {

        loader.style.display = "none";

        const resTracks = result.tracks.data;
        const resTracksLength = resTracks.length;

        const resAlbums = result.albums.data;
        const resAlbumsLength = resAlbums.length;

        const resArtists = result.artists.data;
        const resArtistsLength = resArtists.length;

        console.log(resTracks);

        // Affichage des titres  à la une
        for (let i = 0; i < resTracksLength; i++) {
            topTracks.innerHTML += `
            <div class="top track">
                <a class="cover" href="pages/track.html?id=${resTracks[i].id}"><img src="${ resTracks[i].album.cover_medium }" alt=${ resTracks[i].artist.name }></a>
                <a class="title" href="pages/track.html?id=${resTracks[i].id}">${ resTracks[i].title_short }</a>
                <a class="artist" href="pages/artist.html?id=${resTracks[i].artist.id}">${ resTracks[i].artist.name }</a>
            </div>
            `;
        }

        // Affichage des albums à la une
        for (let i = 0; i < resAlbumsLength; i++) {
            topAlbums.innerHTML += `
            <div class="top album">                
                <a class="cover" href="pages/album.html?id=${ resAlbums[i].id }"><img src="${ resAlbums[i].cover_medium }" alt=${resAlbums[i].title} class="top-img"></a>
                <a class="title" href="pages/album.html?id=${ resAlbums[i].id }">${ resAlbums[i].title }</a>
                <a class="artist" href="pages/artist.html?id=${resAlbums[i].artist.id }">${ resAlbums[i].artist.name }</a>
            </div>
            `;
        }

        // Affichage des artistes à la une
        for (let i = 0; i < resArtistsLength; i++) {
            topArtists.innerHTML += `
            <div class="top artist">     
                <img src="${ resArtists[i].picture_medium }" alt=${ resArtists[i].name }>
                <div class="overlay">
                    <a class="artist" href="pages/artist.html?id=${resArtists[i].id}">${ resArtists[i].name }</a>
                </div>
            </div>
            `;
        }
    })


