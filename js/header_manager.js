const fetchBestMovie = function () {
    let urlBestMovie = apiUrl + `?sort_by=-imdb_score,-votes`;
    fetch(urlBestMovie)
        .then(response => response.json())
        .then(data => {
            document.getElementById("movie-best-tmp").classList.remove('display-none');
            document.getElementsByClassName("best-images")[0].getElementsByTagName("img")[0].src = data.results[0].image_url;
            document.getElementById("movie_best").innerHTML = data.results[0].title;
            document.getElementsByClassName("movie-best-description")[0].id = data.results[0].id;
        })
        .catch(err => console.log('Erreur: ' + err));
}