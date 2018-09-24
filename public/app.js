import {snake} from './snake.js';
let blocksize = 25;
//new snake(blocksize, Math.floor(window.innerWidth / blocksize) - 1, Math.floor(window.innerHeight / blocksize) - 1 , 500, 100, 0.93);

new snake(25, 12, 12, 500, 200, 0.93);
//new snake(Math.floor(6 + Math.random() * 14), Math.floor(8 + Math.random() * 18), Math.floor(500 + Math.random() * 1000), Math.floor(50 + Math.random() * 250), 0.5 + Math.random() * 0.5);