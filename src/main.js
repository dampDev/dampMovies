import { API_KEY } from "./secrets.js";
import {
    pageNav
} from './navigation.js';

let maxPages;

// Data 
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

function likedMovieList(){

    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    
    if (item){
        movies = item;
    } else{
        movies = {};
    }

    return movies;
}

function likeMovie(movie){
    // movie.id
    const likedMovies =   likedMovieList();
    console.log(likedMovies);

    if(likedMovies[movie.id]){
       likedMovies[movie.id] = undefined;
    }else{
       likedMovies[movie.id] = movie;

    }

    localStorage.setItem('liked_movies',JSON.stringify(likedMovies)); 
} 

// Utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }
    });
});

function createMovies(movies, container,
    { lazyLoad = false,
        clean = true,
    } = {},
) {

    if (clean) {
        container.innerHTML = '';
    }


    movies.forEach(movie => {


        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        

        const movieImg = document.createElement('img');


        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
        );
        movieImg.addEventListener('click', () => {
            getMoviePreview(movie.id);
            
        });
        movieImg.addEventListener('error', () => {
            //     movieImg.style.paddingTop = "50%";

            movieImg.style.paddingTop = "100px";
            movieImg.style.fontSize = "1.5rem";
            // movieImg.style.display= "none";

        });

        const moviebtn = document.createElement('button');
        moviebtn.classList.add('movieBtn');

        const likebtn = document.createElement('i');
        likebtn.classList.add('fa-regular');
        likebtn.classList.add('fa-heart');

        likedMovieList()[movie.id] && likebtn.classList.add('fa-solid')

        moviebtn.addEventListener('click', ()=>{
            likebtn.classList.toggle('fa-solid');
            likeMovie(movie);
        })



        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }


        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(moviebtn);
        moviebtn.appendChild(likebtn);

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

function createVideo(movies) {
    // console.log("video",movies);
    videoContainer.innerHTML = "";
    document.documentElement.scrollTop = 0;
    movies.forEach(movie => {

        const videoConten = document.createElement('iframe');
        videoConten.setAttribute('src', 'https://www.youtube.com/embed/' + movie.key);
        console.log("video", movie);
        videoContainer.appendChild(videoConten);

    });
}

function createCast(cast, lazyLoad = false) {

    maincastContainer.innerHTML = "";
    cast.forEach(cas => {

        const castcontent = document.createElement('div');
        castcontent.classList.add('castImg--container');

        const castImg = document.createElement('img');
        castImg.classList.add('castImg');
        castImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            'https://www.themoviedb.org/t/p/w240_and_h266_face/' + cas.profile_path);

        castImg.addEventListener('error', () => {
            castImg.setAttribute(
                lazyLoad ? 'data-img' : 'src',
                'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg');

            // castImg.style.paddingTop = "50px";
            // castImg.style.fontSize = "1.5rem";
            // castImg.style.width= "100px"
            // castImg.style.display= "none";

        });

        const namecast = document.createElement('p');
        namecast.classList.add('castName');
        const pnamecast = document.createTextNode(cas.name);

        if (lazyLoad) {
            lazyLoader.observe(castImg);
        }


        maincastContainer.appendChild(castcontent);
        castcontent.appendChild(castImg);
        castcontent.appendChild(namecast)
        namecast.appendChild(pnamecast);
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

async function getPopularMovieDetail(id){
    const { data: movie } = await api('movie/' + id);
    
    const popularPreviewMoviesContainer = document.querySelector('#popular .comming-container')
    popularPreviewMoviesContainer.innerHTML="";

    const popularContainer = document.createElement('div');
    popularContainer.classList.add('comming-img-container');
    popularContainer.addEventListener('click', () => {

     location.hash = 'movie=' + movie.id;
 });



    const movieImg = document.createElement('div');


    movieImg.classList.add('img-comming');
    // movieImg.setAttribute('alt', primero.title)
    // movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/'+ primero.backdrop_path);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path;
    movieImg.style.background = `
        
    linear-gradient(
        360deg,
        rgba(0,0,0,0.97)12.27%,
        rgba(0,0,0,0)49.17%
    ),
    url(${movieImgUrl})`;
    movieImg.style.backgroundPosition = "center";
    movieImg.style.backgroundRepeat = "no-repet"
    movieImg.style.backgroundSize = "cover";
    
   
    moviePoularTitle.textContent = movie.title;
    // movieDetailDescription.textContent = primero.overview;
    // movieDetailScore.textContent = primero.vote_average;
        console.log("generos de pelcula popular",movie.genre_ids);
    createCategories(movie.genres, moviePopularCategoriesList); 
    
    popularContainer.appendChild(movieImg);
    popularPreviewMoviesContainer.appendChild(popularContainer);
    
}
async function getPopularMovies() {
    const { data } = await api('movie/popular');
    
    const movies = data.results;
    console.log("populares",{ data, movies });

    var min = 0;
    var max = 19;

    var x = Math.floor(Math.random()*(max-min+1)+min);

console.log("aleatorio",x);
//2509



    const primero = movies[x];
    console.log("primero",primero.title);

    getPopularMovieDetail(primero.id);  



    
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

    maxPages = data.total_pages;
    console.log({ data, movies });
    function getPaginatedMoviesBySearch(query) {
    return async function (){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 70);
        const pageIsNotMax = page < maxPages;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page,
                }
            });
            
        
            const movies = data.results;
            console.log({ data, movies });
        
          
            createMovies(
                movies,
                genericSection,
                { lazyLoad: true, clean: false });
        }
    }
}

    createMovies(movies, genericSection, {lazyLoad:true});

}

function getPaginatedMoviesByCategory(id) {
    return async function (){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 70);
        const pageIsNotMax = page < maxPages;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('discover/movie', {
                params: {
                    with_genres: id,
                    page,
                }
            
            });
            
        
            const movies = data.results;
            console.log({ data, movies });
        
          
            createMovies(
                movies,
                genericSection,
                { lazyLoad: true, clean: false });
        }
    }
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });



    const movies = data.results;
    console.log({ data, movies });
    maxPages = data.total_pages;

    createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {
    return async function (){
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 70);
        const pageIsNotMax = page < maxPages;
    
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page,
                }
            });
            
        
            const movies = data.results;
            console.log({ data, movies });
        
          
            createMovies(
                movies,
                genericSection,
                { lazyLoad: true, clean: false });
        }
    }
}

async function getTrandingMovies() {
    const { data } = await api('trending/movie/day');

    const movies = data.results;
    maxPages = data.total_pages;
    console.log(maxPages);
    // console.log({ data, movies });
    if (page = 1) {
        createMovies(movies, genericSection, { lazyLoad: true, clean: true });

    }



}

let page = pageNav;


async function getPaginatedTrandingMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 70);
    const pageIsNotMax = page < maxPages;

    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('trending/movie/day', {
            params: {
                page,
            },
        });
        const movies = data.results;
        createMovies(
            movies,
            genericSection,
            { lazyLoad: true, clean: false });
    }
}
async function getDiscoverMovies() {
    const { data } = await api('discover/movie');

    const movies = data.results;
    console.log({ data, movies });

    createMovies(movies, genericSection);


}

async function getMoviePreview(id) {
    const { data: movie } = await api('movie/' + id);
    
    console.log("detalle de pelicula",movie)
    const moviePreviewDetailSection= document.querySelector('.main-PreviewDetail');
    mainPreviewDetailContainer.classList.remove('inactive');
    
    moviePreviewDetailSection.innerHTML="";
    
    const spanMovie= document.createElement('span');
    const imovie = document.createElement('i');
    imovie.classList.add('fa-solid');
    imovie.classList.add('fa-circle-xmark');
    imovie.addEventListener('click',()=>{
        mainPreviewDetailContainer.classList.add('inactive');
    })

    

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
        location.hash = 'movie=' + movie.id;
        mainPreviewDetailContainer.classList.add('inactive');
    });



    const movieImg = document.createElement('img'); pageNav


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

    const releaseDate = document.createElement('p')
    const pReleaseDate = document.createTextNode(movie.release_date)

    const movieOverviewPreview = document.createElement('p');
    const pMovieOverview = document.createTextNode(movie.overview);

    moviePreviewDetailSection.appendChild(spanMovie);
    spanMovie.appendChild(imovie);
    moviePreviewDetailSection.appendChild(movieContainer);
    movieContainer.appendChild(movieImg);
    moviePreviewDetailSection.appendChild(moviePreviewDiv);
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
    // getVideos(id)
    getCast(id)
    // createVideo(movie.id);

}
async function getMovieSimilar(id) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer, true);


}
async function getVideos(id) {
    const { data } = await api(`movie/${id}/videos`);
    const videosMovie = data.results;

    createVideo(videosMovie);

}
async function getCast(id) {
    const { data } = await api(`movie/${id}/credits`);
    const castMovies = data.cast;



    createCast(castMovies, true);

}

function getLikedMovies(){
    const likedMovies = likedMovieList();
    console.log('favoritos',likedMovies);
    // {keys:'values', keys:'values'}
    const moviesArray = Object.values(likedMovies);
    createMovies(moviesArray,likedMoviesListContainer,{lazyLoad: true, clean:true});
    console.log(likedMovies);
}



export {
    getTrandingMoviesPreview, getCategoriesPreview, getMoviesByCategory, getMoviesBySearch,
    getTrandingMovies, getMovieById, getMovieSimilar, getDiscoverMovies, getMoviePreview, 
    getPaginatedMoviesBySearch,getPaginatedTrandingMovies,getPaginatedMoviesByCategory,getLikedMovies,
    getPopularMovies

};



console.log("page", page);