
/* Function used to manage the click left of carousel*/
const carouselClickLeft = function (category, cpt_carousel) {
    let leftButton = document.getElementById(`button-left-${category}`);
    leftButton.addEventListener('click', function () {
        carouselMoveLeft(category, cpt_carousel);
    });
}

/* Function used to manage the click right of carousel*/
const carouselClickRight = function (category, cpt_carousel) {
    let rightButton = document.getElementById(`button-right-${category}`);
    rightButton.addEventListener('click', function () {
        carouselMoveRight(category, cpt_carousel);
    });
}

/* Sub-function used to manage the click right of carousel*/
const carouselMoveRight = function (category, cpt_carousel) {
    let rightButton = document.getElementById(`button-right-${category}`);
    let leftButton = document.getElementById(`button-left-${category}`);
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel]].classList.add('display-none');
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel] + numberMovieDisplayCarousel].classList.remove('display-none');

    window[cpt_carousel]++;
    if (window[cpt_carousel] == 1) {
        leftButton.classList.remove('visibility-hidden');
    }
    if (window[cpt_carousel] == (numberMovieByCategory - numberMovieDisplayCarousel)) {
        rightButton.classList.add('visibility-hidden');
    }
}

/* Sub-function used to manage the click left of carousel*/
const carouselMoveLeft = function (category, cpt_carousel) {
    let rightButton = document.getElementById(`button-right-${category}`);
    let leftButton = document.getElementById(`button-left-${category}`);
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel] - 1].classList.remove('display-none');
    document.getElementById(`category-${category}`).getElementsByClassName("card-movie")[window[cpt_carousel] + (numberMovieDisplayCarousel - 1)].classList.add('display-none');
    window[cpt_carousel]--;
    if (window[cpt_carousel] == 0) {
        leftButton.classList.add('visibility-hidden');
    }
    if (window[cpt_carousel] == (numberMovieByCategory - numberMovieDisplayCarousel - 1)) {
        rightButton.classList.remove('visibility-hidden');
    }
}