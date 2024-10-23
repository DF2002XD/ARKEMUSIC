// Lista de canciones TOP
const topSongs = [
    
];

// Lista de canciones recientes
const recentSongs = [
    
];

// Lista de canciones del catálogo, agrupadas por artista
const catalog = {
    "Kronno Zomber": [
        {
            title: "ARKADIA RAP | KRONNO ZOMBER (Prod.Rotter Beats)",
            fileUrl: "https://www.dropbox.com/scl/fi/5hdhphvpql27ka2xs34uf/ARKADIA-RAP-_-KRONNO-ZOMBER-Prod.Rotter-Beats-_-Videoclip-Oficial-Kronno-Zomber.mp3?rlkey=uaej1wng4bte55069fvf9yhi0&st=2naftioo&raw=1",
            youtubeUrl: "https://youtube.com/someYoutubeLink",
            spotifyUrl: "https://spotify.com/someSpotifyLink"
        },
	
    ],
    "DJLalitoArkeano": [
        {
            title: "DE NUEVO REMIX - DJ ARKEANO, H3CK0, SR TORTUGA",
            fileUrl: "musica/artistas/DJ ARKEANO/music/DE NUEVO REMIX.mp3",
            youtubeUrl: "https://youtube.com/someYoutubeLink",
            spotifyUrl: "https://spotify.com/someSpotifyLink"
        },

        {
            title: "ELECTRO KENET",
            fileUrl: "https://www.dropbox.com/scl/fi/5f03zxcwof350rr4sdeyr/ELECTRO-KENET.mp3?rlkey=z8zwuid74r4c29zjp2qd0ecr6&st=q76xxwzx&raw=1",
            filedownload:"https://www.dropbox.com/scl/fi/5f03zxcwof350rr4sdeyr/ELECTRO-KENET.mp3?rlkey=z8zwuid74r4c29zjp2qd0ecr6&st=q76xxwzx&dl=1",
            youtubeUrl: "https://youtube.com/someYoutubeLink",
            spotifyUrl: "https://spotify.com/someSpotifyLink"
        }
    ]
};

// Función para verificar si una canción ya está en la lista de TOP
function isSongInTop(song) {
    return topSongs.some(topSong => topSong.title === song.title);
}

// Filtrar las canciones recientes que no estén en TOP
const filteredRecentSongs = recentSongs.filter(song => !isSongInTop(song));

// Función para generar una lista de canciones
function generateSongList(songs, containerId) {
    const songList = document.getElementById(containerId);
    songList.innerHTML = '';

    songs.forEach(song => {
        const songItem = document.createElement('li');
        songItem.className = 'song-item';
        songItem.innerHTML = `
                <div class="song-title">${song.title}</div>
                <div class="button-container" style="display: none;">
                    <button class="button" onclick="downloadSong('${song.filedownload}')">Descargar</button>
                    <button class="button" onclick="copyLink('${song.youtubeUrl}'); event.stopPropagation();">Copiar YouTube</button>
                    <button class="button" onclick="copyLink('${song.spotifyUrl}'); event.stopPropagation();">Copiar Spotify</button>
                </div>
            `;

        // Reproducir la canción solo si no se hace clic en los botones
        songItem.addEventListener('click', (e) => {
            if (!e.target.closest('.button-container')) {
                playSong(song.fileUrl);
            }
        });

        // Mostrar los botones al pasar el ratón
        songItem.addEventListener('mouseenter', () => {
            songItem.querySelector('.button-container').style.display = 'flex';
        });

        songItem.addEventListener('mouseleave', () => {
            songItem.querySelector('.button-container').style.display = 'none';
        });

        songList.appendChild(songItem);
    });
}

// Función para descargar la canción
function downloadSong(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Función para mostrar las canciones del artista seleccionado en el catálogo
function showArtistSongs(artistName) {
    const artistSongList = catalog[artistName];
    const artistNameHeader = document.getElementById('artistName');
    const artistSongsDiv = document.getElementById('artistSongs');
    artistNameHeader.textContent = artistName;
    artistSongsDiv.style.display = 'block';

    // Construir la URL del canal de YouTube y establecerla como href del enlace
    var youtubeChannelName = artistName.replace(/ /g, ""); // Eliminar espacios en blanco del nombre del artista
    var youtubeChannelUrl = "https://www.youtube.com/@" + youtubeChannelName;
    youtubeLink.href = youtubeChannelUrl;
    
    generateSongList(artistSongList, 'artistSongList');
}

// Función para copiar el enlace
function copyLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert('Enlace copiado: ' + link);
    });
}

// Función para reproducir una canción
function playSong(songUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = songUrl;
    audioPlayer.play();
}

// Generar listas para las secciones TOP y Recientes, sin duplicar canciones
generateSongList(topSongs, 'topSongList');
generateSongList(filteredRecentSongs, 'recentSongList');
