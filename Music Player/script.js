
    document.addEventListener("DOMContentLoaded", function () {
        const audio = document.getElementById("audio");
        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        const results = document.getElementById("results");

        async function fetchAndPlayMusic(trackId) {
            const trackUrl = `https://spotify23.p.rapidapi.com/tracks/?ids=${trackId}`;
            const trackOptions = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '8b1cf565f9msh3379f1ca0abc264p18d22ejsne23c95587b9f',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                    
                }
            };
            try {
                const response = await fetch(trackUrl, trackOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.tracks && data.tracks.length > 0) {
                    const trackData = data.tracks[0];
                    audio.src = trackData.preview_url;
                    audio.play();
                } else {
                    console.error("No track data found.");
                }
            } catch (error) {
                console.error(error);
            }
        }
        async function searchMusic(query) {
            const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '8b1cf565f9msh3379f1ca0abc264p18d22ejsne23c95587b9f',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();

                // console.log(data)
                // Clear previous results
                results.innerHTML = "";

                data.tracks.items.forEach((result) => {
                    console.log(data);
                    const listItem = document.createElement("li");
                    listItem.classList.add("search-result");

                    const trackName = result.data.name;

                    // Create an image element and set its source to a dummy image URL
                    const image = document.createElement("img");
                    image.src = "https://cdn.shopify.com/app-store/listing_images/a82167e02b45cadf681efc6c17c35f3a/icon/CMmMjb30lu8CEAE=.jpg"; // Replace with your dummy image URL
                    image.alt = "Track Image"; // Provide alt text for accessibility

                    listItem.appendChild(image);

                    // Create a div for the track name and apply responsive CSS
                    const nameDiv = document.createElement("div");
                    nameDiv.textContent = trackName;
                    nameDiv.classList.add("responsive-text"); // Add a CSS class for responsive text

                    listItem.appendChild(nameDiv);

                    // Create a div for track controls
                    const controlsDiv = document.createElement("div");
                    controlsDiv.style.display = "flex";
                    controlsDiv.style.marginLeft="20px"
                    controlsDiv.style.alignItems = "center";

                    // Create a play button
                    const playButton = document.createElement("button");
                    playButton.textContent = "Play";
                    playButton.style.backgroundColor="green";
                    playButton.style.borderRadius="5px"
                    playButton.addEventListener("click", () => {
                        const trackId = result.data.id;
                        fetchAndPlayMusic(trackId);
                    });

                    controlsDiv.appendChild(playButton);

                    // Create a pause button
                    const pauseButton = document.createElement("button");
                    pauseButton.textContent = "Pause";
                    pauseButton.style.backgroundColor="red"
                    pauseButton.style.borderRadius="5px"
                    pauseButton.addEventListener("click", () => {
                        audio.pause(); // Pause the audio
                    });

                    controlsDiv.appendChild(pauseButton);
                    // listItem.addEventListener("click", () => {
                    //     const trackId = result.data.id;
                    //     fetchAndPlayMusic(trackId);
                    // });
                    listItem.appendChild(controlsDiv);
                    results.appendChild(listItem);
                });

            } catch (error) {
                console.error(error);
            }
        }

        searchButton.addEventListener("click", () => {
            const query = searchInput.value;
            if (query.trim() !== "") {
                searchMusic(query);
            }
        });
    });

