import { getTrandingMoviesPreview, getCategoriesPreview } from './main.js';

searchFormBtn.addEventListener('click',()=>{
    location.hash ='#search=';
});

trendingBtn.addEventListener('click', ()=>{
    location.hash ='#trends';
});

arrowBtn.addEventListener('click', ()=>{
    location.hash = '#home';
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

    
}

function homePage(){
    console.log('home!!');

    headerSection.classList.remove('header-container');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    comingSection.classList.remove('inactive');

    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');   
    movieDetailSection.classList.add('inactive');


    getCategoriesPreview();
getTrandingMoviesPreview();
}

function categoriesPage(){
    console.log('category!!');
    headerSection.classList.remove('header-container');
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
}
function searchPage(){
    console.log('search!!');

    headerSection.classList.remove('header-container-long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    headerTitle.classList.add('inactive');
    comingSection.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');   
    movieDetailSection.classList.add('inactive');
    
    
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
    

}