const express = require("express");
const router = express.Router();
const { requiresAuth, catchError, formatDate } = require("../lib/routeMethods");
const { body, validationResult } = require("express-validator");

//Validate user input and add comment to database
router.post(
  "/add/:postId",
  requiresAuth,
  [
    body("comment")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Comment must include text."),
  ],
  catchError(async (req, res) => {
    let postId = req.params.postId;
    let comment = req.body.comment.replace("&", "!&");
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let added = await res.locals.store.addComment(postId, comment);
      if (!added) throw new Error("Comment not added.");

      req.flash("success", "Comment added!");
      res.redirect(`/post/view/${postId}`);
    } else {
      let post = await res.locals.store.getPost(postId);
      errors.array().forEach((err) => req.flash("error", err.msg));
      res.render("post", {
        post,
        flash: req.flash(),
      });
    }
  })
);

//Delete a comment
router.post(
  "/delete/:postId/:commentId",
  requiresAuth,
  catchError(async (req, res) => {
    let { commentId, postId } = req.params;
    let deleted = await res.locals.store.deleteComment(commentId);

    if (!deleted) throw new Error("Comment not deleted.");

    req.flash("success", "Comment deleted!");
    res.redirect(`/post/view/${postId}`);
  })
);

//Edit comment
router.get(
  "/edit/:postId/:commentId",
  requiresAuth,
  catchError(async (req, res) => {
    let { postId, commentId } = req.params;
    let post = await res.locals.store.getPost(postId);
    let comment = await res.locals.store.getComment(commentId);

    if (req.session.username !== comment.username)
      throw new Error("Invalid edit comment.");

    res.render("edit-comment", {
      post,
      comment,
    });
  })
);

//Post edit comment
router.post(
  "/edit/:postId/:commentId",
  requiresAuth,
  [
    body("comment")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Comment must include text."),
  ],
  catchError(async (req, res) => {
    let { postId, commentId } = req.params;
    let post = await res.locals.store.getPost(postId);
    let comment = await res.locals.store.getComment(commentId);
    let commentText = req.body.comment;
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      if (commentText !== comment.comment_text) {
        let updated = await res.locals.store.updateComment(
          commentId,
          commentText
        );
        if (!updated) throw new Error("Comment not updated.");
      }
      req.flash("success", "Comment updated!");
      res.redirect(`/post/view/${postId}`);
    } else {
      errors.array().forEach((err) => req.flash("error", err.msg));
      res.render("edit-comment", {
        post,
        comment,
        flash: req.flash(),
      });
    }
  })
);

module.exports = router;
