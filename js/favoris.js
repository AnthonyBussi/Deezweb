'use strict';
// on récupère les infos contenues dans le localStorage
let storageDataIds = localStorage.getItem("deezweb_anthony_04_12");
let idTracksList = JSON.parse(storageDataIds);

const favoritesList = document.querySelector("#favorites-list");

if(localStorage.length === 0) {
    const $alertNoFav = document.querySelector("#messageIfNoFavorite");
    $alertNoFav.innerHTML = "Vous n'avez pas encore de titres favoris, dépêchez-vous d'en ajouter !";
}
else {
    for (let i = 0; i < idTracksList.length; i++) {

        window.fetch(`https://api.deezer.com/track/${idTracksList[i]}`)
        .then(response => response.json())
        .then(result => {

            favoritesList.innerHTML = `
                <li id="track_nb${i}">
                    <div>
                        <img src="${result.album.cover_small}">
                        <a href="titre.html?id=${result.id}">${result.title}</a> \&nbsp
                        (<a href="album.html?id=${result.album.id}">${result.album.title}</a>) -\&nbsp
                        <a href="artiste.html?id=${result.artist.id}">${result.artist.name}</a>
                    </div>
                    <button id="removeFavorite">
                        <i class="fas fa-heart-broken"></i>
                    </button>
                </li>
            `;
        })
    };
}