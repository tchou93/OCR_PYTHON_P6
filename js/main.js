/* Choose between 3 category and init all the categories */
const initCategories = function () {
    for (var i = 0; i < numberOfCategories; i++) {
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
        document.getElementsByClassName('best-movies-category')[i].id = "category-" + category.toLowerCase();
        document.getElementsByClassName('best-movies-category__title')[i].innerHTML = "Best " + category + " Movies";
        document.getElementsByClassName('fa-angles-left')[i].id = "button-left-" + category.toLowerCase();
        document.getElementsByClassName('fa-angles-right')[i].id = "button-right-" + category.toLowerCase();

        // Init all the movies in the category
        fetchBestMoviesByCategory(category.toLowerCase());

        // Add listeners for carousel 
        carouselClickRight(category.toLowerCase(), "cptCarousel" + i);
        carouselClickLeft(category.toLowerCase(), "cptCarousel" + i);
        for (var j = numberMovieDisplayCarousel; j < numberMovieByCategory; j++) {
            // Display just 4 movies for carousel
            document.getElementById(`category-${category.toLowerCase()}`).getElementsByClassName("card-movie")[j].classList.add('display-none');
        }
    }
    // Display the modal
    movieClick();
}

/* Init the header */
const initBestMovie = function () {
    fetchBestMovie();
    movieInfosClick();
}

/* main program */
initCategories();
initBestMovie();
