'use strict';

//on récupère les données du localStorage
let storageDataIds = localStorage.getItem('deezweb_tracksId');
let idTracksList = JSON.parse(storageDataIds);

for (let i = 0; i < idTracksList.length; i++) {

    window.fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/track/${idTracksList[i]}`) //infos de l'API
    .then(response => response.json())
    .then(result => {
        //création div parent #trackLike
        const favInfos = document.createElement('div');
        favInfos.setAttribute('id', `trackLike-${i}`);
        favInfos.setAttribute('class', "favorite-item");

        document.querySelector('#favorites-list').appendChild(favInfos); //on ajoute en HTML le tableau des titres likées
        favInfos.innerHTML = `
        
            <div id="trackTitle-${i}" class="favorite-track">
                <img src=${result.artist.picture} alt="" class="favorite-artist-picture"/>
                <div class="favorite-details">
                    <a href="track.html?id=${result.id}" class="favorite-title">${result.title}</a>
                    <a href="artist.html?id=${result.artist.id}" class="favorite-artist">${result.artist.name}</a>
                </div>
            </div>
        `;

        //ajout des boutons favoris
        const $favoriteButton = document.createElement('button');
        $favoriteButton.setAttribute('class', 'favorite-btn');
        $favoriteButton.innerHTML += '<i class="fas fa-heart"></i>';

        favInfos.appendChild($favoriteButton);

        //event au clic sur le bouton
        $favoriteButton.addEventListener("click", () => {
            let storageDataIds = localStorage.getItem('deezweb_tracksId');
            storageDataIds = JSON.parse(storageDataIds);

            //suppression du localStorage
            storageDataIds.splice(storageDataIds.indexOf(idTracksList[i]), 1);
            localStorage.setItem('deezweb_tracksId', JSON.stringify(storageDataIds));
            
            //suppression du DOM
            document.querySelector(`#trackLike-${i}`).remove();
        });

    });
}

