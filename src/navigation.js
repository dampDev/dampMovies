import { getTrandingMoviesPreview, getCategoriesPreview,getMoviesByCategory,getMoviesBySearch,getTrandingMovies,getMovieById,getMovieSimilar } from './main.js';

searchFormBtn.addEventListener('click',()=>{
   
    location.hash = '#search=' + searchFormInput.value;
   

});

trendingBtn.addEventListener('click', ()=>{
    location.hash ='#trends';
});

arrowBtn.addEventListener('click', ()=>{
    history.back();
    // location.hash = '#home';
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator(){
    console.log({location});

    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        movieDetailPage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop=0;

    
}

function homePage(){
    console.log('home!!');
    mainContainerMovies.classList.remove('main-container')
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    comingSection.classList.remove('inactive');

    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    categoriesPreviewList.classList.add('categoriesPreview-list');

    categoriesPreviewList.classList.remove('categoriesPreview-list--row');

    genericSection.classList.add('inactive');   
    movieDetailSection.classList.add('inactive');


    getCategoriesPreview();
getTrandingMoviesPreview();
}

function categoriesPage(){
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

    const [_,categoryData]= location.hash.split('=');
    const [categoryId, categoryName]= categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);
    
}
function movieDetailPage(){
    console.log('movie!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');   
    movieDetailSection.classList.remove('inactive');

    // '#movie', '231516'
    const [_,movieId]= location.hash.split('=');
    getMovieById(movieId);
    

}
function searchPage(){
    console.log('search!!');

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

    const [_,query]= location.hash.split('=');
    getMoviesBySearch(query);
    
    
}
function trendsPage(){
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
    headerCategoryTitle.innerHTML= 'Tendencias';

    getTrandingMovies();
    

}