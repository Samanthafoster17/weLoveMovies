const knex = require("../db/connection");


function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedreview) {
   return knex('reviews')
    .where({ review_id: updatedreview.review_id })
    .update(updatedreview, "*")
    .then(() => {
      return knex("critics")
      .select("*")
      .where({ critic_id: updatedreview.critic_id })
      .first()
    })
}

function destroy(reviewId) {
   return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
