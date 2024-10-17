document.addEventListener('DOMContentLoaded', () => {
    const sectionTitles = document.querySelectorAll('.section-title img');
    sectionTitles.forEach(img => {
        img.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });

    const apiKey = '8fe098fd26a1b240d687bf47d8ac5c5e';
    const baseUrl = 'https://api.themoviedb.org/3';
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    let currentShowId;
    let mediaType;

    async function fetchTrendingMovies() {
        const response = await fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`);
        const data = await response.json();
        displayContent(data.results, 'movies');
    }

    async function fetchTrendingTVShows() {
        const response = await fetch(`${baseUrl}/trending/tv/week?api_key=${apiKey}`);
        const data = await response.json();
        displayContent(data.results, 'tvShows');
    }

    function displayContent(items, type) {
        const container = document.getElementById(type);
        container.innerHTML = '';

        const displayItems = items.slice(0, 10);

        displayItems.forEach(item => {
            const title = item.title || item.name;
            const itemId = item.id;

            const contentCard = document.createElement('div');
            contentCard.classList.add('card');
            contentCard.innerHTML = `
                <a href="${type === 'movies' ? `movie.html?id=${itemId}` : `tv.html?id=${itemId}`}">
                    <img src="${imageBaseUrl}${item.poster_path}" alt="${title}">
                    <div class="card-content">
                        <div class="title">${title}</div>
                    </div>
                </a>
            `;
            container.appendChild(contentCard);
        });
    }

    async function fetchTrending() {
        const response = await fetch(`${baseUrl}/trending/all/week?api_key=${apiKey}`);
        const data = await response.json();
        const randomShow = data.results[Math.floor(Math.random() * data.results.length)];
        displayTrending(randomShow);
    }

    async function displayTrending(show) {
        const backdrop = document.getElementById('backdrop');
        const logoImg = document.getElementById('logoImg');
        mediaType = show.media_type === 'movie' ? 'movie' : 'tv';
        currentShowId = show.id;
        backdrop.src = `https://image.tmdb.org/t/p/original${show.backdrop_path}`;

        const logoResponse = await fetch(`${baseUrl}/${mediaType}/${show.id}/images?api_key=${apiKey}`);
        const logoData = await logoResponse.json();
        const logo = logoData.logos.find(l => l.iso_639_1 === 'en' || l.iso_639_1 === 'original');

        if (logo) {
            logoImg.src = `https://image.tmdb.org/t/p/original${logo.file_path}`;
            logoImg.style.display = 'block';
        }

        const watchNowBtn = document.querySelector('.watch-now');
        watchNowBtn.href = mediaType === 'movie'
            ? `play.html?id=${currentShowId}`
            : `playTv.html?id=${currentShowId}`;
    }

    document.getElementById('detailsBtn').addEventListener('click', () => {
        const url = mediaType === 'movie' ? `movie.html?id=${currentShowId}` : `tv.html?id=${currentShowId}`;
        window.location.href = url;
    });

    async function init() {
        await fetchTrendingMovies();
        await fetchTrendingTVShows();
        await fetchTrending();
    }

    init();
});
