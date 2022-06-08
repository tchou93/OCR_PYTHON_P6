var cpt_carousel_0 = 0;
var cpt_carousel_1 = 0;
var cpt_carousel_2 = 0;
var cpt_carousel_3 = 0;
var tab_genre = ["Drama", "Family", "Romance", "Biography", "Crime", "History", "Adventure", "Fantasy", "Western", "Comedy"];

function display_by_index_increment(category, cpt_carousel) {
    var button_right = document.getElementById(`button-right-${category}`);
    var button_left = document.getElementById(`button-left-${category}`);
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel]].classList.add('display-none');
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel] + 4].classList.remove('display-none');

    window[cpt_carousel]++;
    if (window[cpt_carousel] == 1) {
        button_left.classList.remove('visibility-hidden');
    }
    if (window[cpt_carousel] == 3) {
        button_right.classList.add('visibility-hidden');
    }

}

function display_by_index_decrement(category, cpt_carousel) {
    var button_right = document.getElementById(`button-right-${category}`);
    var button_left = document.getElementById(`button-left-${category}`);
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel] - 1].classList.remove('display-none');
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel] + 3].classList.add('display-none');
    window[cpt_carousel]--;
    if (window[cpt_carousel] == 0) {
        button_left.classList.add('visibility-hidden');
    }
    if (window[cpt_carousel] == 2) {
        button_right.classList.remove('visibility-hidden');
    }
}

function click_left_best_movie(category, cpt_carousel) {
    var button = document.getElementById(`button-left-${category}`);
    button.addEventListener('click', function () {
        display_by_index_decrement(category, cpt_carousel);
    });
}

function click_right_best_movie(category, cpt_carousel) {
    var button = document.getElementById(`button-right-${category}`);
    button.addEventListener('click', function () {
        display_by_index_increment(category, cpt_carousel);
    });
}

function load_movies(category, results) {
    document.getElementById(`button-left-${category}`).classList.add('visibility-hidden');
    document.getElementById(`category-${category}`).classList.remove('display-none');
    for (var i = 0; i < 7; i++) {
        document.getElementById(`category-${category}`).getElementsByTagName("img")[i].src = results[i].image_url;
        document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[i].id = results[i].id;
    }
}

function add_best_movie() {
    var url = "http://localhost:8000/api/v1/titles/" + `?sort_by=-imdb_score,-votes`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("movie-best-tmp").classList.remove('display-none');
            document.getElementsByClassName("best-images")[0].getElementsByTagName("img")[0].src = data.results[0].image_url;
            document.getElementById("movie_best").innerHTML = data.results[0].title;
            document.getElementsByClassName("movie-best-description")[0].id = data.results[0].id;
        })
        .catch(err => console.log('Erreur: ' + err));
}


function add_seven_best_movies_by_category(category) {
    var url = "";
    if (category == "all") {
        url = "http://localhost:8000/api/v1/titles/" + "?sort_by=-imdb_score,-votes&page_size=7";
    }
    else {
        url = "http://localhost:8000/api/v1/titles/" + `?genre=${category}&page_size=7&sort_by=-imdb_score,-votes`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            load_movies(category, data.results);
        })
        .catch(err => console.log('Erreur: ' + err));
}

function add_modal_by_id_movie(id_movie) {
    var url = "http://localhost:8000/api/v1/titles/" + id_movie;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            afficher_modal(data);
        })
        .catch(err => console.log('Erreur: ' + err));
}

function afficher_modal(data) {
    var modal = document.getElementById('myModal');
    var close = document.getElementsByClassName("fa-xmark")[0];

    modal.style.display = "block";
    close.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementsByClassName('title')[0].innerHTML = data.title;
    document.getElementsByClassName('date')[0].innerHTML = data.date_published;
    document.getElementsByClassName('time')[0].innerHTML = data.duration + "min";
    document.getElementsByClassName('genre')[0].innerHTML = data.genres;
    document.getElementsByClassName('director')[0].innerHTML = data.directors;
    document.getElementsByClassName('actors')[0].innerHTML = data.actors;
    document.getElementsByClassName('modal-img')[0].src = data.image_url;


    if ((data.long_description).length < 10) {
        document.getElementsByClassName('modal-body-synopsis-content')[0].innerHTML = "-";
    }
    else {
        document.getElementsByClassName('modal-body-synopsis-content')[0].innerHTML = data.long_description;;
    }

    if (data.rated == "Not rated or unkown rating") {
        document.getElementsByClassName('rated')[0].innerHTML = "-";
    }
    else {
        document.getElementsByClassName('rated')[0].innerHTML = data.rated;
    }


    if (data.worldwide_gross_income == null) {
        document.getElementsByClassName('box_office_results_inter')[0].innerHTML = "-";
    }
    else {
        document.getElementsByClassName('box_office_results_inter')[0].innerHTML = data.worldwide_gross_income + " " + data.budget_currency;
    }

    if (data.usa_gross_income == null) {
        document.getElementsByClassName('box_office_results_domestic')[0].innerHTML = "-";
    }
    else {
        document.getElementsByClassName('box_office_results_domestic')[0].innerHTML = data.usa_gross_income + " " + data.budget_currency;
    }

    if (data.imdb_score == null) {
        document.getElementsByClassName('note_imdb')[0].innerHTML = "-";
    }
    else {
        document.getElementsByClassName('note_imdb')[0].innerHTML = data.imdb_score + "/10 (" + data.votes + " votes)";
    }
}

function click_movie() {
    var movies = document.getElementsByClassName(`card-movie`);
    Array.from(movies).forEach(movie => {
        movie.addEventListener('click', function () {
            add_modal_by_id_movie(movie.id);
        })
    });
}

function click_movie_best() {
    var movie_best = document.getElementsByClassName(`movie-best-description`);
    var more_info = document.getElementsByClassName("fa-circle-info");
    more_info[0].addEventListener('click', function () {
        add_modal_by_id_movie(movie_best[0].id);
    });
}

function init_categories() {
    let randomIndex = 0;
    for (var i = 0; i < 4; i++) {
        if (i == 0) {
            category = "all";
        }
        else {
            randomIndex = Math.floor(Math.random() * tab_genre.length);
            category = tab_genre[randomIndex];
            tab_genre.splice(randomIndex, 1);
        }
        document.getElementsByClassName('best-movies-category-wrapper')[i].id = "category-" + category.toLowerCase();
        document.getElementsByClassName('best-movies-category-title')[i].innerHTML = "Best " + category + " Movies";
        document.getElementsByClassName('fa-angles-left')[i].id = "button-left-" + category.toLowerCase();
        document.getElementsByClassName('fa-angles-right')[i].id = "button-right-" + category.toLowerCase();
        add_seven_best_movies_by_category(category.toLowerCase());
        click_right_best_movie(category.toLowerCase(), "cpt_carousel_" + i);
        click_left_best_movie(category.toLowerCase(), "cpt_carousel_" + i);
    }
    click_movie();
}

function init_best_movie() {
    add_best_movie();
    click_movie_best();
}

init_categories();
init_best_movie();
