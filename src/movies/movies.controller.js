const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function movieExists(req, res, next) {
    const { movieId } = req.params;
  
    const movie = await service.read(Number(movieId));
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `ID does not match any movies.` });
  }


async function read(req, res) {
  res.json({ data: res.locals.movie })
}  

async function list(req, res) {
  const { is_showing } = req.query;
  const data = is_showing ? await service.isShowing() : await service.list();
  res.json({ data });
}

async function movieReviews(req, res) {
  const { movieId } = req.params;
  const data = await service.movieReviews(Number(movieId));
  res.json({ data });
}





module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  reviews: asyncErrorBoundary(movieReviews)
};
