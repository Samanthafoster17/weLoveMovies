const knex = require("../db/connection");
const reduceProp = require("../utils/reduce-properties");

const reduceMovies = reduceProp("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"]
})

function list() {
  return knex("theaters as t")
  .join(
    "movies_theaters as mt",
    "mt.theater_id",
    "t.theater_id"
  )
  .join("movies as m", "m.movie_id", "mt.movie_id")
  .then(reduceMovies);
}

function theatersByMovieId(movieId) {
  return knex("theaters as t")
  .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
  .select("t.*", "is_showing", "movie_id" )
  .where({ movie_id: movieId })
}

module.exports = {
  list,
 theatersByMovieId,
};
