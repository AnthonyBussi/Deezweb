'use strict';
let requestValue = document.querySelector("#request");
let orderSorting = document.querySelector("#orderBy");
let emptySearch = document.querySelector("#emptySearch");
let resultLength = document.querySelector("#resultLength");
let showAlbum = document.querySelector("#showAlbum");
let showArtist = document.querySelector("#showArtist");
let resultContainer = document.querySelector("#resultsContainer");
let searchError = document.querySelector('#search-error');

document.querySelector("#searchButton").addEventListener("click", () => {
    if (requestValue.value) {
        window.fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/search?q=${requestValue.value}&order=${orderSorting.value}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);

                const resultData = result.data;
                const resDataLength = resultData.length;

                //si recherche sans résultat ou mauvaise recherche
                if (resDataLength == 0) {
                    resultLength.innerHTML = "Aucun résultat";
                }
                else {
                //afficher nombre de résultats
                    if (resDataLength < 2) {
                        resultLength.innerHTML = `${resDataLength} Résultat`;
                    }
                    else {
                        resultLength.innerHTML = `${resDataLength} Résultats`;
                    }
                }

                resultContainer.innerHTML = ''; //le bloc se vide avant chaque recherche
                // searchError.innerHTML = ''; //h2 error se vide avant la recherche

                for (let i = 0; i < resDataLength; i++) {

                    let trackId = resultData[i].id;
                    let albumId = resultData[i].album.id;
                    let artistId = resultData[i].artist.id;

                    // on crée tout les éléments avec les classes et id nécessaires
                    let newResult = document.createElement("li");
                    newResult.classList.add("searchResult");
                    let newResultDetails = document.createElement("div");
                    newResultDetails.classList.add("detailsResult");
                    let newImage = document.createElement("img");
                    newImage.setAttribute("src", resultData[i].album.cover);
                    newImage.setAttribute("alt", resultData[i].album.title);
                    let newTitle = document.createElement("h3");
                    newTitle.innerHTML += `
                        ${resultData[i].title}
                    `;
                    let newArtistName = document.createElement("h4");
                    newArtistName.innerHTML += `
                        ${resultData[i].artist.name}
                    `;
                    let newAlbumTitle = document.createElement("p");
                    newAlbumTitle.innerHTML += `
                        ${resultData[i].album.title}
                    `;
                    let newTrackDuration = document.createElement("p");
                    newTrackDuration.innerHTML += `
                        ${convertTime(resultData[i].duration)}
                    `;
                    
                    const $favoriteButton = document.createElement('button');
                    $favoriteButton.setAttribute("id", "favoriteButton");
                    $favoriteButton.innerHTML += '<i class="far fa-heart"></i>';

                    let newResultLinks = document.createElement("div");
                    newResultLinks.classList.add("resultLinks");
                    let newResultLinkTrack = document.createElement("div");
                    newResultLinkTrack.classList.add("resultLink");
                    newResultLinkTrack.setAttribute("id", "listenTrack");
                    newResultLinkTrack.innerHTML += `
                        <a href="pages/titre.html?id=${trackId}">Ecouter un extrait</a>
                    `;
                    let newResultLinkAlbum = document.createElement("div");
                    newResultLinkAlbum.classList.add("resultLink");
                    newResultLinkAlbum.setAttribute("id", "showAlbum");
                    newResultLinkAlbum.innerHTML += `
                        <a href="pages/album.html?id=${albumId}">Voir l'album</a>
                    `;
                    let newResultLinkArtist = document.createElement("div");
                    newResultLinkArtist.classList.add("resultLink");
                    newResultLinkArtist.setAttribute("id", "showArtist");
                    newResultLinkArtist.innerHTML += `
                        <a href="pages/artiste.html?id=${artistId}">Voir l'artiste</a>
                    `;

                    // on insère les détails des résultats dans l'élément parent
                    newResultDetails.appendChild(newImage);
                    newResultDetails.appendChild(newTitle);
                    newResultDetails.appendChild(newImage);
                    newResultDetails.appendChild(newArtistName);
                    newResultDetails.appendChild(newAlbumTitle);
                    newResultDetails.appendChild(newTrackDuration);
                    
                    // on ajoute les 3 liens dans l'élément parent
                    newResultLinks.appendChild(newResultLinkTrack);
                    newResultLinks.appendChild(newResultLinkAlbum);
                    newResultLinks.appendChild(newResultLinkArtist);

                    // on insère les éléments dans la carte
                    newResult.appendChild(newResultDetails);
                    newResult.appendChild($favoriteButton);
                    newResult.appendChild(newResultLinks);

                    // on insère le nouveau résultat dans le container
                    resultContainer.appendChild(newResult);
                
                    // on ajoute les éléments au favoris au click
                    $favoriteButton.addEventListener("click", () => {
                        let track_List = localStorage.getItem('deezweb_tracksId');

                        //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
                        track_List = track_List ? JSON.parse(track_List) : [];

                        // si l'id est déjà dans le tableau on l'enlève, sinon on l'ajoute, et on modifie le style du bouton en fonction
                        if (track_List.includes(trackId)) {
                            track_List.splice(track_List.indexOf(trackId), 1);
                            $favoriteButton.style.cssText = "color: #FFFFFF";
                        }
                        else {
                            track_List.push(trackId);
                            $favoriteButton.style.cssText = "color: var(--favourite-color)"; 
                        }

                        localStorage.setItem('deezweb_tracksId', JSON.stringify(track_List)); //on enregistre dans localstorage
                    });
                }
            })
            .catch(err => {
                console.log("Une erreur inconnue est survenue");
            })
    }
    else {
        searchError.innerHTML = "<h2>Aucun résultat</h2>"; //gestion de l'erreur "recherche vide"
        resultContainer.innerHTML = '';
        resultLength.innerHTML = '';
    }
});

fetch(`https://mycorsproxy-app.herokuapp.com/https://api.deezer.com/chart/`)
    .then(response => response.json())
    .then(result => {
        console.log(result);

        const resultData = result.data;
        const resDataLength = resultData.length;

        console.log(resDataLength);

        // //si recherche sans résultat ou mauvaise recherche
        // if (resDataLength == 0) {
        //     resultLength.innerHTML = "Aucun résultat";
        // }
        // else {
        // //afficher nombre de résultats
        //     if (resDataLength < 2) {
        //         resultLength.innerHTML = `${resDataLength} Résultat`;
        //     }
        //     else {
        //         resultLength.innerHTML = `${resDataLength} Résultats`;
        //     }
        // }

        // resultContainer.innerHTML = ''; //le bloc se vide avant chaque recherche
        // // searchError.innerHTML = ''; //h2 error se vide avant la recherche

        for (let i = 0; i < resDataLength; i++) {

            let trackId = resultData[i].id;
            let albumId = resultData[i].album.id;
            let artistId = resultData[i].artist.id;

            // on crée tout les éléments avec les classes et id nécessaires
            let newResult = document.createElement("li");
            newResult.classList.add("searchResult");
            let newResultDetails = document.createElement("div");
            newResultDetails.classList.add("detailsResult");
            let newImage = document.createElement("img");
            newImage.setAttribute("src", resultData[i].album.cover);
            newImage.setAttribute("alt", resultData[i].album.title);
            let newTitle = document.createElement("h3");
            newTitle.innerHTML += `
                ${resultData[i].title}
            `;
            let newArtistName = document.createElement("h4");
            newArtistName.innerHTML += `
                ${resultData[i].artist.name}
            `;
            let newAlbumTitle = document.createElement("p");
            newAlbumTitle.innerHTML += `
                ${resultData[i].album.title}
            `;
            let newTrackDuration = document.createElement("p");
            newTrackDuration.innerHTML += `
                ${convertTime(resultData[i].duration)}
            `;
            
            const $favoriteButton = document.createElement('button');
            $favoriteButton.setAttribute("id", "favoriteButton");
            $favoriteButton.innerHTML += '<i class="far fa-heart"></i>';

            let newResultLinks = document.createElement("div");
            newResultLinks.classList.add("resultLinks");
            let newResultLinkTrack = document.createElement("div");
            newResultLinkTrack.classList.add("resultLink");
            newResultLinkTrack.setAttribute("id", "listenTrack");
            newResultLinkTrack.innerHTML += `
                <a href="pages/titre.html?id=${trackId}">Ecouter un extrait</a>
            `;
            let newResultLinkAlbum = document.createElement("div");
            newResultLinkAlbum.classList.add("resultLink");
            newResultLinkAlbum.setAttribute("id", "showAlbum");
            newResultLinkAlbum.innerHTML += `
                <a href="pages/album.html?id=${albumId}">Voir l'album</a>
            `;
            let newResultLinkArtist = document.createElement("div");
            newResultLinkArtist.classList.add("resultLink");
            newResultLinkArtist.setAttribute("id", "showArtist");
            newResultLinkArtist.innerHTML += `
                <a href="pages/artiste.html?id=${artistId}">Voir l'artiste</a>
            `;

            // on insère les détails des résultats dans l'élément parent
            newResultDetails.appendChild(newImage);
            newResultDetails.appendChild(newTitle);
            newResultDetails.appendChild(newImage);
            newResultDetails.appendChild(newArtistName);
            newResultDetails.appendChild(newAlbumTitle);
            newResultDetails.appendChild(newTrackDuration);
            
            // on ajoute les 3 liens dans l'élément parent
            newResultLinks.appendChild(newResultLinkTrack);
            newResultLinks.appendChild(newResultLinkAlbum);
            newResultLinks.appendChild(newResultLinkArtist);

            // on insère les éléments dans la carte
            newResult.appendChild(newResultDetails);
            newResult.appendChild($favoriteButton);
            newResult.appendChild(newResultLinks);

            // on insère le nouveau résultat dans le container
            resultContainer.appendChild(newResult);
        
            // on ajoute les éléments au favoris au click
            $favoriteButton.addEventListener("click", () => {
                let track_List = localStorage.getItem('deezweb_tracksId');

                //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
                track_List = track_List ? JSON.parse(track_List) : [];

                // si l'id est déjà dans le tableau on l'enlève, sinon on l'ajoute, et on modifie le style du bouton en fonction
                if (track_List.includes(trackId)) {
                    track_List.splice(track_List.indexOf(trackId), 1);
                    $favoriteButton.style.cssText = "color: #FFFFFF";
                }
                else {
                    track_List.push(trackId);
                    $favoriteButton.style.cssText = "color: var(--favourite-color)"; 
                }

                localStorage.setItem('deezweb_tracksId', JSON.stringify(track_List)); //on enregistre dans localstorage
            });
        }
    })


