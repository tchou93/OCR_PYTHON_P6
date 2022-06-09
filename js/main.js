const initCategories = function () {
    for (var i = 0; i < numberMovieDisplayCarousel; i++) {
        if (i == 0) {
            category = "all";
        }
        else {
            //Choose 3 random categories
            const randomIndex = Math.floor(Math.random() * genresMovie.length);
            category = genresMovie[randomIndex];
            genresMovie.splice(randomIndex, 1);
        }

        //Add some informations on html
        document.getElementsByClassName('best-movies-category-wrapper')[i].id = "category-" + category.toLowerCase();
        document.getElementsByClassName('best-movies-category-title')[i].innerHTML = "Best " + category + " Movies";
        document.getElementsByClassName('fa-angles-left')[i].id = "button-left-" + category.toLowerCase();
        document.getElementsByClassName('fa-angles-right')[i].id = "button-right-" + category.toLowerCase();

        // Init all the movies in the category
        fetchBestMoviesByCategory(category.toLowerCase());
        // Add listeners for carousel 
        carouselClickRight(category.toLowerCase(), "cptCarousel" + i);
        carouselClickLeft(category.toLowerCase(), "cptCarousel" + i);
    }
    // Display the modal
    movieClick();
}

const initBestMovie = function () {
    fetchBestMovie();
    movieInfosClick();
}

initCategories();
initBestMovie();
