(function() {
    const apiKey = '8fe098fd26a1b240d687bf47d8ac5c5e';
    const baseUrl = 'https://api.themoviedb.org/3';
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    async function fetchAppleTVContent() {
        const response = await fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_networks=2552`);
        const data = await response.json();
        displayAppleContent(data.results);
    }

    function displayAppleContent(items) {
        const container = document.getElementById('apple-tv');
        container.innerHTML = '';

        const displayItems = items.slice(0, 10);

        displayItems.forEach(item => {
            const title = item.title || item.name;
            const itemId = item.id;

            const contentCard = document.createElement('div');
            contentCard.classList.add('card');
            contentCard.innerHTML = `
                <a href="tv.html?id=${itemId}">
                    <img src="${imageBaseUrl}${item.poster_path}" alt="${title}">
                    <div class="card-content">
                        <div class="title">${title}</div>
                    </div>
                </a>
            `;
            container.appendChild(contentCard);
        });
    }

    fetchAppleTVContent();
})();
