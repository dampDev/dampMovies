import { getTrandingMoviesPreview, getCategoriesPreview } from './main.js';

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
    getCategoriesPreview();
getTrandingMoviesPreview();
}

function categoriesPage(){
    console.log('category!!');
}
function movieDetailPage(){
    console.log('movie!!');
}
function searchPage(){
    console.log('search!!');
    
}
function trendsPage(){
    console.log('Trends!!');
}