/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

document.addEventListener ("DOMContentLoaded", () => {

  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
    removeAdv() {
      const promoAdvImg = document.querySelectorAll(".promo__adv img");
      const promoAdvTitle = document.querySelectorAll(".promo__adv-title");
      promoAdvTitle[0].remove();
      promoAdvImg.forEach((item) => item.remove());
    },
    changeGenre(genreName) {
      const genre = document.querySelectorAll(".promo__genre");
      genre[0].textContent = `${genreName}`;
    },
    changePromoImg(path) {
      const img = document.querySelectorAll(".promo__bg");
      img[0].style.cssText = `background-image: url('../img/${path}');`;
    },
    movieList: document.querySelector(".promo__interactive-list"),

    changeMovies() {
      this.movieList.innerHTML = "";
      this.movies.sort();
      this.movies.forEach((film, index) => {
        this.movieList.innerHTML += `<li class="promo__interactive-item">
        ${index + 1}. ${film}
              <div class="delete"></div>
          </li>`;
      });
      document.querySelectorAll (".delete").forEach ((btn, i) => {
        btn.addEventListener ("click", () => {
          btn.parentElement.remove();
          movieDB.movies.splice (i, 1);
          movieDB.changeMovies()
        })
      });
    },
    cutFilmName () {
      this.movies.forEach ((film, index, arr) => {
        if (film.length > 21) {
          arr [index] = film.slice (0, 22) + "...";
        }
      })
    },

    form: document.querySelector ("form.add"),
    input: document.querySelector (".adding__input"),
    buttonConfirm: document.querySelector ('[data-button="confirm"]'),
    checkBox: document.querySelector ('[type="checkbox"]'),
    
    addMovie(event) {
      event.preventDefault();
      const newFilm = this.input.value;
      const favorite = this.checkBox.checked;
      if (newFilm) {
        if (favorite) {
          console.log ("Добавляем любимый фильм");
        }
        this.movies.push (newFilm);
        this.cutFilmName();
        this.changeMovies();
        this.form.reset();
      }
    },
  };
  
  
  movieDB.removeAdv();
  movieDB.changeGenre("драма");
  movieDB.changePromoImg("bg.jpg");
  movieDB.changeMovies();

  console.log (movieDB.input)
 
  movieDB.form.addEventListener ("submit", movieDB.addMovie.bind(movieDB));

});

