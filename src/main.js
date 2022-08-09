import {API_KEY} from "./secrets.js";


const api = axios.create({
baseURL: 'https://api.themoviedb.org/3/',
headers: {
    'Content-Type': 'application/json;charset=utf-8',
},
params: {
    'api_key': API_KEY,
    'language': 'es-MX'
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

function createMovies(movies,container, lazyLoad= false){
    container.innerHTML = '';
    movies.forEach(movie => {
        

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click',()=> {
            location.hash= 'movie='+movie.id;
        });

        const movieImg = document.createElement('img');
              

        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
          );

          movieImg.addEventListener('error', () => {
            
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

function createCategories(categories, container){
    container.innerHTML='';
    categories.forEach(category => {
      

        const categoryContainer = document.createElement('div');
       
        const categoryTitle= document.createElement('h3');      
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+category.id);
        categoryTitle.addEventListener('click',() => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);


        

        
        

    });
}

// llamdos a la Api


async function getTrandingMoviesPreview(){
    const { data } = await api('trending/movie/day');  
        
    const movies = data.results;
    console.log({data, movies});

    const primero = movies[0];
    console.log(primero);

   createMovies(movies,trendingMoviesPreviewList, true);  
   

}

// pelicula popular reciente
async function getPopularMovies(){
    const { data } = await api('movie/popular');  
        
    const movies = data.results;
    console.log({data, movies});

    const primero = movies[0];
    console.log(primero);

//    createMovies(movies,trendingMoviesPreviewList);  


    const comingPreviewMoviesContainer = document.querySelector('#coming .comming-container')   

        const comingContainer = document.createElement('div');
        comingContainer.classList.add('comming-img-container');
        comingContainer.addEventListener('click',()=> {
            location.hash= 'movie='+primero.id;
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
    
       
        comingContainer.appendChild(movieImg);
        comingPreviewMoviesContainer.appendChild(comingContainer);
        



   

}


async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    
    // const data = await res.json();
        
    const categories = data.genres;

     createCategories(categories, categoriesPreviewList);

    
    
   

}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie',{
        params:{
            with_genres: id,
        }
    });
    
    
        
    const movies = data.results;
    console.log({data, movies});

    createMovies(movies,genericSection,true);

}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie',{
        params:{
            query,
        }
    });
    
    
        
    const movies = data.results;
    console.log({data, movies});

    createMovies(movies,genericSection);
}

async function getTrandingMovies(){
    const { data } = await api('trending/movie/day');  
        
    const movies = data.results;
    console.log({data, movies});

   createMovies(movies,genericSection);  
   

}
async function getDiscoverMovies(){
    const { data } = await api('discover/movie');  
        
    const movies = data.results;
    console.log({data, movies});

   createMovies(movies,genericSection);  
   

}


async function getMovieById(id){
    const { data : movie } = await api('movie/'+id);  

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

}

async function getMovieSimilar(id){
    const { data} = await api(`movie/${id}/similar`);  
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer, true);

}

// getCategoriesPreview();
// getTrandingMoviesPreview();
getPopularMovies();

export{getTrandingMoviesPreview, getCategoriesPreview,getMoviesByCategory,getMoviesBySearch,
    getTrandingMovies,getMovieById, getMovieSimilar,getDiscoverMovies};