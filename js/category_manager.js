const fetchBestMoviesByCategory = function (category) {
    let urlBestMovieByCategory;
    if (category == "all") {
        urlBestMovieByCategory = apiUrl + "?sort_by=-imdb_score,-votes&page_size=7";
    }
    else {
        urlBestMovieByCategory = apiUrl + `?genre=${category}&page_size=7&sort_by=-imdb_score,-votes`;
    }
    fetch(urlBestMovieByCategory)
        .then(response => response.json())
        .then(data => {
            loadMoviesFromCategory(category, data.results);
        })
        .catch(err => console.log('Erreur: ' + err));
}


const loadMoviesFromCategory = function (category, results) {
    document.getElementById(`button-left-${category}`).classList.add('visibility-hidden');
    document.getElementById(`category-${category}`).classList.remove('display-none');
    for (var i = 0; i < numberMovieByCategory; i++) {
        document.getElementById(`category-${category}`).getElementsByTagName("img")[i].src = results[i].image_url;
        document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[i].id = results[i].id;
    }
}

