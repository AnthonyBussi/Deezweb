'use strict';

// fonction utilisée pour convertir les durées qui sont obtenues en secondes en heures, minutes et secondes

function add0(number) {
    if (number < 10) {
        return "0" + number;
    } else {
        return number;
    }
  }

function convertTime(duration) {
    duration = Number(duration);

    let hh = add0(Math.floor(duration /3600));
    let mm = add0(Math.floor(duration % 3600 / 60));
    let ss = add0(Math.floor(duration % 3600 % 60));

    if (hh == 0) {
        return mm + ":" + ss;
    } else {
        return hh + ":" + mm + ":" + ss;
    }
}

function convertDate(date) {
    date = new Date;
    return date.toLocaleDateString("fr");
}

function switchFavorite() {
    let favoriteButton = document.querySelector('.favoriteButton');
    let track_List = localStorage.getItem('deezweb_tracksId');
    // console.log(track_List);
    // let trackId = this.result.id;
    let button = document.querySelector('.favoriteButton');
    console.log(trackId);

    //s'il n'y en a pas on crée un tableau | s'il y en a, on transforme la string en tableau
    track_List = track_List ? JSON.parse(track_List) : [];

    // si l'id est déjà dans le tableau on l'enlève, sinon on l'ajoute, et on modifie le style du bouton en fonction
    if (track_List.includes(trackId)) {
        track_List.splice(track_List.indexOf(trackId), 1);
        button.classList.remove('favorite');
    }
    else {
        track_List.push(trackId);
        button.classList.add("favorite");
    }

    localStorage.setItem('deezweb_tracksId', JSON.stringify(track_List)); //on enregistre dans localstorage
}

// changement de theme

// const themeBtn = document.querySelector("#theme-button");
// const body = document.querySelector('body');

// function changeTheme() {
//     body.classList.toggle("light-theme");
// }

// themeBtn.addEventListener("click", changeTheme);