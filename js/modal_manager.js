/* Function asynchronous used to get data (best movie find by id) from API and to
display header section correctly */
const fetchMovieById = function (id_movie) {
    let urlMovieById = apiUrl + id_movie;

    fetch(urlMovieById)
        .then(response => response.json())
        .then(data => {
            displayModal(data);
        })
        .catch(err => console.log('Erreur: ' + err));
}

/* Function used to display the modal with informations containing in data */
const displayModal = function (data) {
    let modal = document.getElementById('modal');
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
    document.getElementById('modal-image').src = data.image_url;
    document.getElementById('modal-title').innerHTML = data.title;
    document.getElementById('modal-genre').innerHTML = data.genres;
    document.getElementById('modal-date').innerHTML = data.date_published;
    document.getElementById('modal-director').innerHTML = data.directors;
    document.getElementById('modal-actors').innerHTML = data.actors;
    document.getElementById('modal-time').innerHTML = data.duration + "min";
    document.getElementById('modal-country').innerHTML = data.countries;

    if (data.rated == "Not rated or unkown rating") { document.getElementById('modal-rated').innerHTML = "-"; }
    else { document.getElementById('modal-rated').innerHTML = data.rated; }

    if (data.imdb_score == null) { document.getElementById('modal-note_imdb').innerHTML = "-"; }
    else { document.getElementById('modal-note_imdb').innerHTML = data.imdb_score + "/10 (" + data.votes + " votes)"; }

    if ((data.long_description).length < 10) { document.getElementById('modal-body-synopsis-content').innerHTML = "-"; }
    else { document.getElementById('modal-body-synopsis-content').innerHTML = data.long_description; }

    if (data.worldwide_gross_income == null) { document.getElementById('modal-box_office_results_inter').innerHTML = "-"; }
    else { document.getElementById('modal-box_office_results_inter').innerHTML = data.worldwide_gross_income + " " + data.budget_currency; }

    if (data.usa_gross_income == null) { document.getElementById('modal-box_office_results_domestic').innerHTML = "-"; }
    else { document.getElementById('modal-box_office_results_domestic').innerHTML = data.usa_gross_income + " " + data.budget_currency; }
}




