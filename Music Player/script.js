// You need to replace these with your own credentials
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

// Spotify API endpoints
const spotifyApiBaseUrl = 'https://api.spotify.com/v1';
const authUrl = 'https://accounts.spotify.com/api/token';

// Authenticate using client credentials
const getToken = async () => {
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token;
};

const audio = new Audio();
const playlist = document.getElementById('playlist');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');

// Function to play a track
const playTrack = (trackId) => {
    audio.src = `https://open.spotify.com/embed/track/${trackId}`;
    audio.play();
};

// Function to get a list of tracks
const getTracks = async () => {
    const token = await getToken();
    const response = await fetch(`${spotifyApiBaseUrl}/playlists/PLAYLIST_ID/tracks`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    const tracks = data.items;
    tracks.forEach((track) => {
        const listItem = document.createElement('li');
        listItem.textContent = track.track.name;
        listItem.addEventListener('click', () => playTrack(track.track.id));
        playlist.appendChild(listItem);
    });
};

playButton.addEventListener('click', () => audio.play());
pauseButton.addEventListener('click', () => audio.pause());

// Initialize the playlist
getTracks();
