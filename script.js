function playSong(songUrl) {
    var audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = songUrl;
    audioPlayer.play();
}

function showArtistSongs(artistName) {
    var artistSongsDiv = document.getElementById("artistSongs");
    var artistNameHeader = document.getElementById("artistName");
    var artistSongList = document.getElementById("artistSongList");
    var youtubeLink = document.getElementById("youtubeLink");
    artistNameHeader.textContent = artistName;
    artistSongList.innerHTML = ""; // Limpiar la lista de canciones del artista

    // Obtener todas las canciones del artista y agregarlas a la lista
    var songItems = document.getElementsByClassName("song-item");
    for (var i = 0; i < songItems.length; i++) {
        var songArtist = songItems[i].querySelector(".song-artist").textContent;
        if (songArtist === "Artista: " + artistName) {
            var songClone = songItems[i].cloneNode(true);
            songClone.classList.remove("song-item"); // Eliminar la clase para que no se comporte como un elemento clickeable
            songClone.style.position = "relative"; // Añadir posición relativa para que el enlace se posicione correctamente
            songClone.querySelector(".download-link").style.display = "none"; // Ocultar el enlace de descarga por defecto
            artistSongList.appendChild(songClone);
            songClone.style.display = "block"; // Mostrar la canción que estaba oculta
            songClone.style.marginBottom = "10px";
            songClone.style.padding = "10px";
            songClone.style.backgroundColor = "#f9f9f9";
            songClone.style.borderRadius = "15px";
            songClone.style.cursor = "pointer";



            // Clonar y añadir enlace de descarga
            var downloadLink = songClone.querySelector('.download-link');
            var songSrc = songItems[i].getAttribute('onclick').match(/'([^']+)'/)[1];
            downloadLink.href = songSrc;

            // Agregar el estilo :hover para la canción clonada
            songClone.addEventListener("mouseenter", function () {
                this.style.backgroundColor = "#e0e0e0";
                this.querySelector(".download-link").style.display = "block"; // Mostrar el enlace de descarga al pasar el ratón
            });

            // Cambiar el fondo cuando se quite el mouse de la canción clonada
            songClone.addEventListener("mouseleave", function () {
                this.style.backgroundColor = "#f9f9f9";
                this.querySelector(".download-link").style.display = "none"; // Ocultar el enlace de descarga al quitar el ratón
            });
            artistSongList.appendChild(songClone);
        }
    }

    // Construir la URL del canal de YouTube y establecerla como href del enlace
    var youtubeChannelName = artistName.replace(/ /g, ""); // Eliminar espacios en blanco del nombre del artista
    var youtubeChannelUrl = "https://www.youtube.com/@" + youtubeChannelName;
    youtubeLink.href = youtubeChannelUrl;

    artistSongsDiv.style.display = "block";
}



