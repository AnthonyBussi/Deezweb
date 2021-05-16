// fonction utilisée pour convertir les durées qui sont obtenues en secondes en minutes et secondes

function convertTime(duration) {
    duration = Number(duration);

    let min = Math.floor(duration % 3600 / 60);
    let sec = Math.floor(duration % 3600 % 60);

    return min + "'" + sec + "\"";
}