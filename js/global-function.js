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

// changement de theme

// const themeBtn = document.querySelector("#theme-button");
// const body = document.querySelector('body');

// function changeTheme() {
//     body.classList.toggle("light-theme");
// }

// themeBtn.addEventListener("click", changeTheme);