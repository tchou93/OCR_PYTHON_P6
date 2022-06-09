const movieClick = function () {
    let cardMovies = document.getElementsByClassName(`card-movie`);
    Array.from(cardMovies).forEach(cardMovie => {
        cardMovie.addEventListener('click', function () {
            fetchMovieById(cardMovie.id);
        })
    });
}

const movieInfosClick = function () {
    let bestMovie = document.getElementsByClassName(`movie-best-description`);
    let moreInfo = document.getElementsByClassName("fa-circle-info");
    moreInfo[0].addEventListener('click', function () {
        fetchMovieById(bestMovie[0].id);
    });
}

const fetchMovieById = function (id_movie) {
    let urlMovieById = apiUrl + id_movie;

    fetch(urlMovieById)
        .then(response => response.json())
        .then(data => {
            displayModal(data);
        })
        .catch(err => console.log('Erreur: ' + err));
}

const displayModal = function (data) {
    let modal = document.getElementById('myModal');
    let modalCross = document.getElementsByClassName("fa-xmark")[0];
    modal.style.display = "block";
    modalCross.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.getElementsByClassName('modal-img')[0].src = data.image_url;
    document.getElementsByClassName('title')[0].innerHTML = data.title;
    document.getElementsByClassName('genre')[0].innerHTML = data.genres;
    document.getElementsByClassName('date')[0].innerHTML = data.date_published;
    if (data.rated == "Not rated or unkown rating") { document.getElementsByClassName('rated')[0].innerHTML = "-"; }
    else { document.getElementsByClassName('rated')[0].innerHTML = data.rated; }
    if (data.imdb_score == null) { document.getElementsByClassName('note_imdb')[0].innerHTML = "-"; }
    else { document.getElementsByClassName('note_imdb')[0].innerHTML = data.imdb_score + "/10 (" + data.votes + " votes)"; }
    document.getElementsByClassName('director')[0].innerHTML = data.directors;
    document.getElementsByClassName('actors')[0].innerHTML = data.actors;
    document.getElementsByClassName('time')[0].innerHTML = data.duration + "min";
    document.getElementsByClassName('country')[0].innerHTML = data.countries;
    if ((data.long_description).length < 10) { document.getElementsByClassName('modal-body-synopsis-content')[0].innerHTML = "-"; }
    else { document.getElementsByClassName('modal-body-synopsis-content')[0].innerHTML = data.long_description; }
    if (data.worldwide_gross_income == null) { document.getElementsByClassName('box_office_results_inter')[0].innerHTML = "-"; }
    else { document.getElementsByClassName('box_office_results_inter')[0].innerHTML = data.worldwide_gross_income + " " + data.budget_currency; }
    if (data.usa_gross_income == null) { document.getElementsByClassName('box_office_results_domestic')[0].innerHTML = "-"; }
    else { document.getElementsByClassName('box_office_results_domestic')[0].innerHTML = data.usa_gross_income + " " + data.budget_currency; }
}




