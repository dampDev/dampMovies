import {
    getTrandingMoviesPreview, getCategoriesPreview, getMoviesByCategory, getMoviesBySearch,
    getTrandingMovies, getMovieById, getMovieSimilar, getDiscoverMovies, getMoviePreview,getPaginatedTrandingMovies
} from './main.js';

export let pageNav = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {

    location.hash = '#search=' + searchFormInput.value;


});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    history.back();
    // location.hash = '#home';
});

homeBtn.addEventListener('click', () => {
    location.hash = '#home';
});

discoverBtn.addEventListener('click', () => {
    location.hash = '#discover';
});

closeBtn.addEventListener('click', () => {
    mainPreviewDetailContainer.classList.add('inactive');
})


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

window.addEventListener('scroll', infiniteScroll, false);

function navigator() {
    console.log({ location });
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, { passive: false });
        infiniteScroll = undefined;
      }

    if (location.hash.startsWith('#trends')) {
        trendsPage();
        document.documentElement.scrollTop = 0;
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
        document.documentElement.scrollTop = 0;
    } else if (location.hash.startsWith('#movie=')) {
        // movieDetailPage();
        moviePreview();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
        document.documentElement.scrollTop = 0;
    } else if (location.hash.startsWith('#discover')) {
        discoverPage();
        document.documentElement.scrollTop = 0;
    } else if (location.hash.startsWith('#moviePreview=')) {
        document.documentElement.scrollTop = 0;
        movieDetailPage();
    }
    else {
        homePage();
    }

    document.body.scrollTop = 0;
    // document.documentElement.scrollTop=0;
    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false });
      }


}

function homePage() {
    console.log('home!!');
    mainPreviewDetailContainer.classList.add('inactive');
    mainContainerMovies.classList.remove('main-container');
    menuContainer.classList.remove('inactive');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    comingSection.classList.remove('inactive');

    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    categoriesPreviewList.classList.add('categoriesPreview-list');

    categoriesPreviewList.classList.remove('categoriesPreview-list--row');

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');


    getCategoriesPreview();
    getTrandingMoviesPreview();
}

function categoriesPage() {
    console.log('category!!');
    headerSection.classList.remove('header-container');
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    mainContainerMovies.classList.add('main-container')
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    categoriesPreviewList.classList.remove('categoriesPreview-list');
    categoriesPreviewList.classList.add('categoriesPreview-list--row');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);

}
function moviePreview() {
    mainPreviewDetailContainer.classList.remove('inactive')
    moviePreviewDetailcontainer.classList.remove('inactive')
    const [_, movieId] = location.hash.split('=');
    getMoviePreview(movieId);

}
function movieDetailPage() {
    console.log('movie!!');
    mainPreviewDetailContainer.classList.add('inactive');
    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    menuContainer.classList.add('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // '#movie', '231516'
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);


}
function searchPage() {
    console.log('search!!');
    mainPreviewDetailContainer.classList.add('inactive');
    headerSection.classList.remove('header-container-long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);


}
function trendsPage() {
    console.log('Trends!!');
    headerSection.classList.remove('header-container-long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrandingMovies();
    
    infiniteScroll = getPaginatedTrandingMovies;
   
    
                        

}

function discoverPage() {

    console.log('Discover!');

    mainPreviewDetailContainer.classList.add('inactive');
    headerSection.classList.remove('header-container-long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    categoriesPreviewList.classList.add('categoriesPreview-list');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.innerHTML = 'Tendencias';

    getDiscoverMovies();


}