const express = require("express");
const router = express.Router();
const { requiresAuth, catchError, formatDate } = require("../lib/routeMethods");

const POSTS_PER_PAGE = 6;

function formatPosts(posts) {
  if (posts.length === 0) {
    posts = false;
  } else {
    //Formats date for display
    posts.forEach((post) => {
      formatDate(post);
    });
  }
  return posts;
}
function validatePage(page, totalPages) {
  if (isNaN(page)) {
    page = totalPages + 1;
  } else if (Number(page) < 1) {
    page = totalPages + 1;
  } else {
    page = Number(page);
  }
  return page;
}

//Render home page
router.get(
  "/",
  requiresAuth,
  catchError(async (req, res) => {
    // Get variables to be passed into views
    let totalPosts = Number(await res.locals.store.getTotalPosts());
    let totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    let page = req.query.page ? req.query.page : 1;
    page = validatePage(page, totalPages);
    let offset = POSTS_PER_PAGE * page - POSTS_PER_PAGE;
    let posts = await res.locals.store.getOffsetPosts(offset);

    if (!posts) throw new Error("Posts not found.");

    //Make sure that posts and their dates are formatted correctly
    posts = formatPosts(posts);

    //Passes page number and total pages to view for previous and next buttons for pagination
    res.render("home", {
      posts,
      page,
      totalPages,
      url: "/home" + req.path,
    });
  })
);

//Renders home page with a selected tag as a filter
router.get(
  "/filter/:tagName",
  requiresAuth,
  catchError(async (req, res) => {
    let tagName = req.params.tagName;
    let totalFilteredPosts = await res.locals.store.getTotalFilteredPosts(
      tagName
    );
    let totalPages = Math.ceil(totalFilteredPosts / POSTS_PER_PAGE);
    let page = req.query.page ? req.query.page : 1;
    page = validatePage(page, totalPages);
    let offset = POSTS_PER_PAGE * page - POSTS_PER_PAGE;
    let posts = await res.locals.store.getOffsetFilteredPosts(tagName, offset);

    if (!posts) throw new Error("Posts not found.");

    posts = formatPosts(posts);

    //Passes page number and total pages to view for previous and next buttons for pagination
    res.render("home", {
      posts,
      page,
      totalPages,
      url: "/home" + req.path,
    });
  })
);

//Renders all posts created by the current user
router.get(
  "/my-posts",
  requiresAuth,
  catchError(async (req, res) => {
    let totalUserPosts = await res.locals.store.getTotalUserPosts();
    let totalPages = Math.ceil(totalUserPosts / POSTS_PER_PAGE);
    let page = req.query.page ? req.query.page : 1;
    page = validatePage(page, totalPages);
    let offset = POSTS_PER_PAGE * page - POSTS_PER_PAGE;
    let posts = await res.locals.store.getUserOffsetPosts(offset);

    if (!posts) throw new Error("Posts not found.");

    posts = formatPosts(posts);

    //Passes page number and total pages to view for previous and next buttons for pagination
    res.render("home", {
      posts,
      page,
      totalPages,
      url: "/home" + req.path,
    });
  })
);

module.exports = router;
