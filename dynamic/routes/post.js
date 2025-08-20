const express = require("express");
const router = express.Router();
const { requiresAuth, catchError, formatDate } = require("../lib/routeMethods");
const { body, validationResult } = require("express-validator");

//Render individual posts
router.get(
  "/view/:postId",
  requiresAuth,
  catchError(async (req, res) => {
    let postId = req.params.postId;
    let post = await res.locals.store.getPost(postId);
    formatDate(post);
    post.comments.forEach((comment) => formatDate(comment));

    res.render("post", {
      post,
    });
  })
);

//Render post creation page
router.get("/create", requiresAuth, (req, res) => {
  res.render("create");
});

//Validate user input and add post to database
router.post(
  "/create",
  requiresAuth,
  [
    body("postTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Post title must be included.")
      .isLength({ max: 100 })
      .withMessage("Post title can only be up to 100 characters long."),
    body("postContent")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Post body must be included."),
    body("postTags")
      .trim()
      .isLength({ min: 1 })
      .withMessage("You must include at least one tag"),
  ],
  catchError(async (req, res) => {
    let { postTitle, postContent, postTags } = req.body;
    //Make sure that user input tags have correct capitalization
    if (postTags) {
      postTags = postTags
        .trim()
        .split(", ")
        .map((tag) => tag[0].toUpperCase() + tag.slice(1).toLowerCase());
    }
    let allTags = await res.locals.store.getTags();
    let errors = validationResult(req);
    allTags = allTags.map((tagObj) => tagObj.tag_name);

    //Add custom error for tags that don't exist
    if (postTags[0]) {
      if (!postTags.every((tag) => allTags.includes(tag))) {
        errors.errors.push({
          value: "",
          msg: "One or more invalid tags. Please enter tags from the list on the bottom right.",
          param: "postTags",
          location: "body",
        });
      }
    }

    if (errors.isEmpty()) {
      //Add post then tags
      let postAdded = await res.locals.store.createPost(postTitle, postContent);
      if (!postAdded) throw new Error("Post not added.");

      let postId = await res.locals.store.getNewPostId();

      let tagsAdded = await res.locals.store.addTags(postId, postTags);
      if (!tagsAdded) throw new Error("Tags not added.");

      req.flash("success", "Post created!");
      res.redirect("/home");
    } else {
      //Add error messages to req then re-render page
      errors.array().forEach((err) => req.flash("error", err.msg));
      res.render("create", {
        flash: req.flash(),
        postTitle,
        postContent,
        postTags: postTags ? postTags.join(", ") : "",
      });
    }
  })
);

//Delete a post
router.post(
  "/delete/:postId",
  requiresAuth,
  catchError(async (req, res) => {
    let postId = req.params.postId;
    let deleted = await res.locals.store.deletePost(postId);

    if (!deleted) throw new Error("Post not deleted.");

    req.flash("success", "Post deleted!");
    res.redirect("/home");
  })
);

//Render edit post page
router.get(
  "/edit/:postId",
  requiresAuth,
  catchError(async (req, res) => {
    let postId = req.params.postId;
    let post = await res.locals.store.getPost(postId);
    post.tags = post.tags.join(", ");

    if (req.session.username !== post.username)
      throw new Error("Invalid edit request");

    res.render("edit-post", {
      post,
    });
  })
);

//Update post
router.post(
  "/edit/:postId",
  requiresAuth,
  [
    body("postTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Post title must be included.")
      .isLength({ max: 100 })
      .withMessage("Post title can only be up to 100 characters long."),
    body("postContent")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Post body must be included."),
    body("postTags").trim(),
  ],
  catchError(async (req, res) => {
    let postId = req.params.postId;
    let post = await res.locals.store.getPost(postId);
    let postTitle = req.body.postTitle || "";
    let postContent = req.body.postContent || "";
    let postTags = req.body.postTags
      ? req.body.postTags.trim().split(", ")
      : [""];
    let allTags = await res.locals.store.getTags();
    let errors = validationResult(req);
    allTags = allTags.map((tagObj) => tagObj.tag_name);

    //Adds custom error for non-existent tags
    if (postTags[0]) {
      if (!postTags.every((tag) => allTags.includes(tag))) {
        errors.errors.push({
          value: "",
          msg: "One or more invalid tags. Please enter tags from the list on the bottom right.",
          param: "postTags",
          location: "body",
        });
      }
    }

    //Updates each part of the post individually depending on whether is has been changed or not
    if (errors.isEmpty()) {
      if (postTitle !== post.title) {
        //updates title
        let updated = await res.locals.store.updatePostTitle(postId, postTitle);
        if (!updated) throw new Error("Post title not updated.");
      }
      if (postContent !== post.content) {
        //updates content
        let updated = await res.locals.store.updatePostContent(
          postId,
          postContent
        );
        if (!updated) throw new Error("Post content not updated.");
      }
      if (postTags[0]) {
        //updates tags
        let updated = await res.locals.store.updatePostTags(postId, postTags);
        if (!updated) throw new Error("Post content not updated.");
      }
      req.flash("success", "Post updated!");
      res.redirect(`/post/view/${postId}`);
    } else {
      //Re-renders page with flash message errors
      errors.array().forEach((err) => req.flash("error", err.msg));
      res.render("edit-post", {
        flash: req.flash(),
        post,
        postTitle,
        postContent,
        postTags: postTags.join(", "),
      });
    }
  })
);

module.exports = router;
