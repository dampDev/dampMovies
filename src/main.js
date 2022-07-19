import {API_KEY} from "./secrets.js";


const api = axios.create({
baseURL: 'https://api.themoviedb.org/3/',
headers: {
    'Content-Type': 'application/json;charset=utf-8',
},
params: {
    'api_key': API_KEY,
}
});

async function getTrandingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    
    
        
    const movies = data.results;
    console.log({data, movies});
    movies.forEach(movie => {
        const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');


        const movieImg = document.createElement('img');
        // const h3title = document.createElement('h3');
        const voto_averege = document.createElement('p');
       

        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path);

        // h3title.classList.add('title-movie');
        // // h3title.setAttribute(movie.title);
        // const h3titleText = document.createTextNode(movie.title);

        voto_averege.classList.add('vote-average-movie');

        
        
        const voto_averegeText = document.createTextNode(movie.vote_average);
        
       

        
        movieContainer.appendChild(movieImg);
        // movieContainer.appendChild(h3title)
        movieContainer.appendChild(voto_averege);


       

      
        // h3title.appendChild(h3titleText);
        voto_averege.appendChild(voto_averegeText);

        trendingMoviesPreviewList.appendChild(movieContainer);
        

    });
   

}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    
    // const data = await res.json();
        
    const categories = data.genres;
    
    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');

        const categoryContainer = document.createElement('div');
       


        const categoryTitle= document.createElement('h3');
        
       

        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id','id'+category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);


        

        
        

    });
   

}

// getCategoriesPreview();
// getTrandingMoviesPreview();

export{getTrandingMoviesPreview, getCategoriesPreview};