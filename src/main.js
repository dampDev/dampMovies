import {API_KEY} from "./secrets.js"

async function getTrandingMoviesPreview(){
    const res = await fetch ('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY +'&language=es');
    
    const data = await res.json();
        
    const movies = data.results;
    console.log({data, movies});
    movies.forEach(movie => {
        const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');


        const movieImg = document.createElement('img');
        const h3title = document.createElement('h3');
        const voto_averege = document.createElement('p');
       

        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/'+ movie.poster_path);

        h3title.classList.add('title-movie');
        // h3title.setAttribute(movie.title);
        const h3titleText = document.createTextNode(movie.title);

        voto_averege.classList.add('vote-average-movie');

        
        
        const voto_averegeText = document.createTextNode(movie.vote_average);
        
       

        
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(h3title)
        movieContainer.appendChild(voto_averege);


       

      
        h3title.appendChild(h3titleText);
        voto_averege.appendChild(voto_averegeText);

        trendingPreviewContainer.appendChild(movieContainer);
        

    });
   

}

getTrandingMoviesPreview();