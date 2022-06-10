/* Function asynchronous used to get data (best movie sorted by imdb_score and votes ) from API and to
display header section correctly */
const fetchBestMovie = function () {
    let urlBestMovie = apiUrl + `?sort_by=-imdb_score,-votes`;
    fetch(urlBestMovie)
        .then(response => response.json())
        .then(data => {
            document.getElementById("best-movie-id").classList.remove('display-none');
            document.getElementById("best-movie__cover").src = data.results[0].image_url;
            document.getElementById("best-movie__description-title").innerHTML = data.results[0].title;
            document.getElementsByClassName("best-movie__description")[0].id = data.results[0].id;
            fetch(data.results[0].url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("best-movie__description-synopsis").innerHTML = data.description;
                })
                .catch(err => console.log('Erreur: ' + err));

        })
        .catch(err => console.log('Erreur: ' + err));
}

/* Function used to manage click on button "more info", modal should appears*/
const movieInfosClick = function () {
    let bestMovie = document.getElementsByClassName(`best-movie__description`);
    let moreInfo = document.getElementsByClassName("fa-circle-info");
    moreInfo[0].addEventListener('click', function () {
        fetchMovieById(bestMovie[0].id);
    });
}