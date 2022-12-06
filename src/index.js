import './style.css';

import axios from 'axios';
import itemsCounter from './modules/counter';
import { getMovies } from './modules/request';
import { GetLikes } from './modules/request';

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

const updateLikes = async (ele) => {
  await axios.post('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XMHWey4za3iNnBFD5KUq/likes', { item_id: ele.id });
  displayMovie();
};

const links = document.querySelectorAll('nav li a');
  const resetLinks = () => {
    console.log(links);
    for (let i = 0; i < links.length; i += 1) {
      links[i].classList.remove('active');
    }
  };

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('shows')) {
    resetLinks();
    e.target.classList.add('active');
    main.innerHTML='';
    main.append(div);
  } else if (e.target.classList.contains('fa-heart')) {
    updateLikes(e.target);
    displayMovie();
    e.target.classList.add('heart');

  } else if (e.target.classList.contains('link')) {
    resetLinks();
    e.target.classList.add('active');
  }
});

displayMovie();

export default displayMovie;



