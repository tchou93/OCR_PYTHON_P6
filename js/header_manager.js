const fetchBestMovie = function () {
    let urlBestMovie = apiUrl + `?sort_by=-imdb_score,-votes`;
    fetch(urlBestMovie)
        .then(response => response.json())
        .then(data => {
            document.getElementById("best-movie-id").classList.remove('display-none');
            document.getElementsByClassName("best-movie__images")[0].getElementsByTagName("img")[0].src = data.results[0].image_url;
            document.getElementById("best-movie__description-title").innerHTML = data.results[0].title;
            document.getElementsByClassName("best-movie__description")[0].id = data.results[0].id;
        })
        .catch(err => console.log('Erreur: ' + err));
}

const movieInfosClick = function () {
    let bestMovie = document.getElementsByClassName(`best-movie__description`);
    let moreInfo = document.getElementsByClassName("fa-circle-info");
    moreInfo[0].addEventListener('click', function () {
        fetchMovieById(bestMovie[0].id);
    });
}