import { API_KEY } from "./secrets.js";


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        // 'language': 'es-MX'
    }
});

// Utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }
    });
});

function createMovies(movies, container, lazyLoad = false) {
    container.innerHTML = '';
    movies.forEach(movie => {


        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = 'movie=' + movie.id;
        });

        const movieImg = document.createElement('img');


        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
        );

        movieImg.addEventListener('error', () => {
            //     movieImg.style.paddingTop = "50%";

            movieImg.style.paddingTop = "100px";
            movieImg.style.fontSize = "1.5rem";
            // movieImg.style.display= "none";

        });



        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }


        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);


    });
}

function createCategories(categories, container) {
    container.innerHTML = '';
    console.log(categories);
    categories.forEach(category => {


        const categoryContainer = document.createElement('div');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);

    });
}

function createVideo(movies){
    console.log("video",movies);
    videoContainer.innerHTML="";
    movies.forEach(movie => {

    const videoConten = document.createElement('iframe');
    videoConten.setAttribute('src','https://www.youtube.com/embed/'+movie.key);
    console.log("video",movie);
    videoContainer.appendChild(videoConten);
    
});
}

// llamdos a la Api


async function getTrandingMoviesPreview() {
    const { data } = await api('trending/movie/day');

    const movies = data.results;
    console.log({ data, movies });

    const primero = movies[0];
    console.log(primero);

    createMovies(movies, trendingMoviesPreviewList, true);


}

// pelicula popular reciente
async function getPopularMovies() {
    const { data } = await api('movie/popular');

    const movies = data.results;
    console.log({ data, movies });

    const primero = movies[0];
    console.log(primero);

    //    createMovies(movies,trendingMoviesPreviewList);  


    const comingPreviewMoviesContainer = document.querySelector('#coming .comming-container')

    const comingContainer = document.createElement('div');
    comingContainer.classList.add('comming-img-container');
    comingContainer.addEventListener('click', () => {

        location.hash = 'movie=' + movie.id;
    });

   

    const movieImg = document.createElement('div');


    movieImg.classList.add('img-comming');
    // movieImg.setAttribute('alt', primero.title)
    // movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/'+ primero.backdrop_path);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + primero.backdrop_path;
    movieImg.style.background = `
        
    linear-gradient(
        180deg,
        rgba(0,0,0,0.35)19.27%,
        rgba(0,0,0,0)29.17%
    ),
    url(${movieImgUrl})`;
    movieImg.style.backgroundPosition= "center";
    movieImg.style.backgroundRepeat= "no-repet"
    movieImg.style.backgroundSize= "cover";


    comingContainer.appendChild(movieImg);
    comingPreviewMoviesContainer.appendChild(comingContainer);
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');

    // const data = await res.json();

    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);





}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });



    const movies = data.results;
    console.log({ data, movies });

    createMovies(movies, genericSection, true);

}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });



    const movies = data.results;
    console.log({ data, movies });

    createMovies(movies, genericSection);
}

async function getTrandingMovies() {
    const { data } = await api('trending/movie/day');

    const movies = data.results;
    console.log({ data, movies });

    createMovies(movies, genericSection);


}
async function getDiscoverMovies() {
    const { data } = await api('discover/movie');

    const movies = data.results;
    console.log({ data, movies });

    createMovies(movies, genericSection);


}
async function getMoviePreview(id) {
    const { data: movie } = await api('movie/' + id);
    moviePreviewDetailcontainer.innerHTML = "";

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
        location.hash = 'moviePreview=' + movie.id;
    });
    


    const movieImg = document.createElement('img');


    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src',
        'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieImg.addEventListener('error', () => {
        
        movieImg.style.paddingTop = "100px";
        movieImg.style.fontSize = "1.5rem";
       
    });
    const moviePreviewDiv = document.createElement('div')
    moviePreviewDiv.classList.add('moviePreviewContent');
    const movieTitlePreview = document.createElement('h2')
    const h2MovieTitlePreview = document.createTextNode(movie.title);

    const releaseDate=document.createElement('p')
    const pReleaseDate=document.createTextNode(movie.release_date)

    const movieOverviewPreview = document.createElement('p');
    const pMovieOverview=document.createTextNode(movie.overview);
       
    
    moviePreviewDetailcontainer.appendChild(movieContainer);
    movieContainer.appendChild(movieImg);   
    moviePreviewDetailcontainer.appendChild(moviePreviewDiv);
    moviePreviewDiv.appendChild(movieTitlePreview);
    movieTitlePreview.appendChild(h2MovieTitlePreview);
    moviePreviewDiv.appendChild(releaseDate);
    releaseDate.appendChild(pReleaseDate);
    moviePreviewDiv.appendChild(movieOverviewPreview);
    movieOverviewPreview.appendChild(pMovieOverview);
    
     
    



   

}


async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0,0,0,0.35)19.27%,
        rgba(0,0,0,0)29.17%
    ),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getMovieSimilar(id);
    getVideos(id)
    // createVideo(movie.id);

}

async function getMovieSimilar(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer, true);


}

async function getVideos(id){
const {data} = await api(`movie/${id}/videos`);
const videosMovie = data.results;

// console.log(videosMovie);
// videoContainer.innerHTML="";

// const videoConten = document.createElement('iframe');
// videoConten.setAttribute('src','https://www.youtube.com/embed/'+videosMovie[0].key);
// console.log("video",videosMovie[0].key);
// videoContainer.appendChild(videoConten);
createVideo(videosMovie);

}

// getCategoriesPreview();
// getTrandingMoviesPreview();
getPopularMovies();

export {
    getTrandingMoviesPreview, getCategoriesPreview, getMoviesByCategory, getMoviesBySearch,
    getTrandingMovies, getMovieById, getMovieSimilar, getDiscoverMovies, getMoviePreview
};