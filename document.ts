document.addEventListener('DOMContentLoaded', function() {
    // Lista de canciones TOP
    const topSongs = [
        {
            title: "ARKADIA RAP | KRONNO ZOMBER (Prod.Rotter Beats) | ( Videoclip Oficial )",
            artist: "Kronno Zomber",
            fileUrl: "musica/artistas/Kronno Zomber/music/ARKADIA RAP _ KRONNO ZOMBER (Prod.Rotter Beats) _ ( Videoclip Oficial ) - Kronno Zomber.mp3",
            youtubeUrl: "https://youtube.com/someYoutubeLink",
            spotifyUrl: "https://spotify.com/someSpotifyLink"
        }
    ];

    // Lista de canciones recientes
    const recentSongs = [
        {
            title: "DE NUEVO REMIX - DJ ARKEANO, H3CK0, SR TORTUGA",
            artist: "DJ ARKEANO",
            fileUrl: "musica/artistas/DJ ARKEANO/music/DE NUEVO REMIX - DJ ARKEANO, H3CK0, SR TORTUGA.mp3",
            youtubeUrl: "https://youtube.com/someYoutubeLink",
            spotifyUrl: "https://spotify.com/someSpotifyLink"
        }
    ];

    // Lista de canciones del catálogo, agrupadas por artista
    const catalog = {
        "Kronno Zomber": [
            {
                title: "ARKADIA RAP | KRONNO ZOMBER (Prod.Rotter Beats)",
                fileUrl: "musica/artistas/Kronno Zomber/music/ARKADIA RAP _ KRONNO ZOMBER.mp3",
                youtubeUrl: "https://youtube.com/someYoutubeLink",
                spotifyUrl: "https://spotify.com/someSpotifyLink"
            }
        ],
        "DJ ARKEANO": [
            {
                title: "DE NUEVO REMIX - DJ ARKEANO, H3CK0, SR TORTUGA",
                fileUrl: "musica/artistas/DJ ARKEANO/music/DE NUEVO REMIX.mp3",
                youtubeUrl: "https://youtube.com/someYoutubeLink",
                spotifyUrl: "https://spotify.com/someSpotifyLink"
            }
        ]
    };

    // Función para generar una lista de canciones
    function generateSongList(songs, containerId) {
        const songList = document.getElementById(containerId);
        songList.innerHTML = '';

        songs.forEach(song => {
            const songItem = document.createElement('li');
            songItem.className = 'song-item';
            songItem.innerHTML = `
                <div class="song-title">${song.title}</div>
                <div class="button-container">
                    <a href="${song.fileUrl}" download onclick="event.stopPropagation();">Descargar</a>
                    <button onclick="copyLink('${song.youtubeUrl}'); event.stopPropagation();">Copiar YouTube</button>
                    <button onclick="copyLink('${song.spotifyUrl}'); event.stopPropagation();">Copiar Spotify</button>
                </div>
            `;

            // Reproducir la canción solo si no se hace clic en los botones
            songItem.addEventListener('click', (e) => {
                if (!e.target.closest('.button-container')) {
                    playSong(song.fileUrl);
                }
            });

            songList.appendChild(songItem);
        });
    }

    // Función para mostrar las canciones del artista seleccionado en el catálogo
    function showArtistSongs(artistName) {
        const artistSongList = catalog[artistName];
        const artistNameHeader = document.getElementById('artistName');
        const artistSongsDiv = document.getElementById('artistSongs');
        artistNameHeader.textContent = artistName;
        artistSongsDiv.style.display = 'block';
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
        audioPlayer.style.display = 'block';
        audioPlayer.play();
    }

    // Generar listas para las secciones TOP y Recientes
    generateSongList(topSongs, 'topSongList');
    generateSongList(recentSongs, 'recentSongList');
});
