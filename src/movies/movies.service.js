const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}


function isShowing() {
  return knex("movies_theaters as mt")
  .join("movies as m", "m.movie_id", "mt.movie_id" )
  .select("*")
  .where("is_showing", true)
  .groupBy("mt.movie_id");
}

function read(movie_id) {
  return knex("movies").where({ movie_id }).first();
}


function movieReviews(movieId) {
  return knex("reviews")
  .select("*")
  .where({ movie_id: movieId })
  .then((review) => {
    const criticInf = review.map((movie) => {
      return knex("critics")
      .select("*")
      .where({ critic_id: movie.critic_id })
      .then((res) => {
        movie.critic = res[0];
        return movie
      })
    })
    const listAllCritics = Promise.all(criticInf);
    return listAllCritics;
  })
}

module.exports = {
  list,
  isShowing,
  read,
  movieReviews
};
