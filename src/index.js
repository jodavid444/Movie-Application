import './style.css';
import itemsCounter from './modules/counter.js';
import { getMovies, GetLikes } from './modules/request.js';

const main = document.querySelector('main');
const div = document.querySelector('.movies');
const header = document.querySelector('.shows');
const body = document.querySelector('body');
let movies = [];

const displayMovie = async () => {
  movies = await getMovies();
  const likes = await GetLikes();
  const counter = itemsCounter(movies);
  header.innerHTML = 'Shows';
  header.innerHTML += ` (${counter})`;

  div.innerHTML = '';
  movies.forEach((movie, index) => {
    const likeVal = likes[index] !== undefined ? likes[index].likes : 0;
    div.innerHTML += `
<div class="movie" id="${movie.id}">
<img src="${movie.image.medium}" alt="${movie.name}">
<div class="likes">
<p class="like-p">${movie.name}</p>
<button class="like-button"><i class="far fa-heart fa-2x" id='heart-${movie.id}'></i></button>
</div>
<p>${likeVal} likes</p>
<button class="comment-button">Comment</button>
</div>`;
  });
};
const links = document.querySelectorAll('nav li a');
const resetLinks = () => {
  for (let i = 0; i < links.length; i += 1) {
    links[i].classList.remove('active');
  }
};

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('shows')) {
    resetLinks();
    e.target.classList.add('active');
    main.innerHTML = '';
    main.append(div);
  } else if (e.target.classList.contains('link')) {
    resetLinks();
    e.target.classList.add('active');
  }
});

displayMovie();

export default displayMovie;
