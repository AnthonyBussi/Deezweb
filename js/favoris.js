'use strict';

//on récupère les données du localStorage
let storageDataIds = localStorage.getItem('deezweb_tracksId');
let idTracksList = JSON.parse(storageDataIds);

for (let i = 0; i < idTracksList.length; i++) {

    window.fetch(`https://api.deezer.com/track/${idTracksList[i]}`) //infos de l'API
    .then(response => response.json())
    .then(result => {
        console.log(result);
        //création div parent #trackLike
        const favInfos = document.createElement('div');
        favInfos.setAttribute('id', `trackLike-${i}`);
        favInfos.setAttribute('class', "favorite-item");

        document.querySelector('#favorites-list').appendChild(favInfos); //on ajoute en HTML le tableau des titres likées
        favInfos.innerHTML = `
        
            <div id="trackTitle-${i}" class="favorite-track">
                <img src=${result.artist.picture} alt="" class="favorite-artist-picture"/>
                <div class="favorite-details">
                    <a href="titre.html?id=${result.id}" class="favorite-title">${result.title}</a>
                    <p class="favorite-artist">${result.artist.name}</p>
                </div>
            </div>
        `;

        //ajout des boutons favoris
        const $favoriteTrack = document.createElement('button');
        $favoriteTrack.setAttribute('class', 'favorite-btn');

        favInfos.appendChild($favoriteTrack);

        //event au clic sur le bouton
        $favoriteTrack.addEventListener("click", () => {
            let storageDataIds = localStorage.getItem('deezweb_tracksId');
            idTracksList = JSON.parse(storageDataIds);

            //suppression du localStorage
            storageDataIds.splice(storageDataIds.indexOf(idTracksList[i]), 1);
            localStorage.setItem('deezweb_tracksId', JSON.stringify(idTracksList));
            
            //suppression du DOM
            document.querySelector(`#trackLike-${i}`).remove();
        });

        // let trackLike = document.querySelector(`#trackLike-${i}`);
        // let trackTitle = document.querySelector(`#trackTitle-${i}`);
        // trackLike.insertBefore($favoriteTrack, trackTitle);
    });
}

