const dbQuery = require("./db-query");
const bcrypt = require("bcrypt");

module.exports = class Forum {
  constructor(session) {
    this.username = session.username;
  }

  async getTotalPosts() {
    //This is the general format for each of the "getPosts" functions
    //Return the total amount of posts
    let result = await dbQuery("SELECT count(id) FROM posts");

    return result.rows[0].count;
  }

  async getOffsetPosts(offset) {
    //Return the specified six posts delimited by an offset
    let result = await dbQuery(
      "SELECT * FROM posts ORDER BY id DESC LIMIT 6 OFFSET $1",
      offset
    );
    let posts = result.rows;
    //Get the amount of comments that each post has and assign it to the post
    let result2 = await dbQuery(
      "SELECT post_id, count(id) FROM comments GROUP BY post_id"
    );
    let commentCounts = result2.rows;
    //Get tags and add them to each respective post
    let result3 = await dbQuery("SELECT * FROM posts_tags");
    let tags = result3.rows;

    posts.forEach((post) => {
      post.commentCount = commentCounts.filter(
        (count) => count.post_id === post.id
      )[0]
        ? commentCounts.filter((count) => count.post_id === post.id)[0].count
        : 0;
      post.tags = tags
        .filter((tag) => tag.post_id === post.id)
        .map((tagObj) => tagObj.tag_name);
    });

    return posts;
  }

  async getTotalFilteredPosts(tagName) {
    //Return the total amount of posts with a certain tag
    let result = await dbQuery(
      "SELECT count(id) FROM posts_tags WHERE tag_name = $1",
      tagName
    );

    return result.rows[0].count;
  }

  async getOffsetFilteredPosts(tagName, offset) {
    //Returns six posts with a certain tag based on the page number
    let result = await dbQuery(
      "SELECT * FROM posts WHERE id IN (SELECT post_id FROM posts_tags WHERE tag_name = $1) ORDER BY id DESC LIMIT 6 OFFSET $2",
      tagName,
      offset
    );
    let posts = result.rows;
    let result2 = await dbQuery(
      "SELECT post_id, count(id) FROM comments GROUP BY post_id"
    );
    let commentCounts = result2.rows;
    let result3 = await dbQuery("SELECT * FROM posts_tags");
    let tags = result3.rows;

    posts.forEach((post) => {
      post.commentCount = commentCounts.filter(
        (count) => count.post_id === post.id
      )[0]
        ? commentCounts.filter((count) => count.post_id === post.id)[0].count
        : 0;
      post.tags = tags
        .filter((tag) => tag.post_id === post.id)
        .map((tagObj) => tagObj.tag_name);
    });

    return posts;
  }

  async getTotalUserPosts() {
    //Returns the total amount of posts made by the current user
    let result = await dbQuery(
      "SELECT count(id) FROM posts WHERE username = $1",
      this.username
    );

    return result.rows[0].count;
  }

  async getUserOffsetPosts(offset) {
    //Returns six posts made by the user based on page number
    let result = await dbQuery(
      "SELECT * FROM posts WHERE username = $1 ORDER BY id DESC LIMIT 6 OFFSET $2",
      this.username,
      offset
    );
    let posts = result.rows;
    let result2 = await dbQuery(
      "SELECT post_id, count(id) FROM comments GROUP BY post_id"
    );
    let commentCounts = result2.rows;
    let result3 = await dbQuery("SELECT * FROM posts_tags");
    let tags = result3.rows;

    posts.forEach((post) => {
      post.commentCount = commentCounts.filter(
        (count) => count.post_id === post.id
      )[0]
        ? commentCounts.filter((count) => count.post_id === post.id)[0].count
        : 0;
      post.tags = tags
        .filter((tag) => tag.post_id === post.id)
        .map((tagObj) => tagObj.tag_name);
    });

    return posts.filter((post) => post.username === this.username);
  }

  async getPopularPosts() {
    //Returns the five posts marked as popular
    let result = await dbQuery(
      "SELECT * FROM posts WHERE popular = 't' LIMIT 5"
    );

    return result.rows;
  }

  async getPost(postId) {
    //Returns a specific post object
    let postResult = await dbQuery("SELECT * FROM posts WHERE id = $1", postId);
    //Gets comments and tags for post
    let commentResult = await dbQuery(
      "SELECT * FROM comments WHERE post_id = $1",
      postId
    );
    let tagsResult = await dbQuery(
      "SELECT tag_name FROM posts_tags WHERE post_id = $1",
      postId
    );
    let post = postResult.rows[0];
    //Assigns comments and tags to post
    post.comments = commentResult.rows;
    post.tags = tagsResult.rows.map((obj) => obj.tag_name);

    return post;
  }

  async createPost(postTitle, postContent) {
    //Adds a post to the database
    let result = await dbQuery(
      "INSERT INTO posts (title, content, username) VALUES ($1, $2, $3)",
      postTitle,
      postContent,
      this.username
    );

    return result.rowCount > 0;
  }

  async addComment(postId, comment) {
    //Adds a comment to the database
    let result = await dbQuery(
      `INSERT INTO comments (post_id, comment_text, username) VALUES ($1, $2, $3)`,
      postId,
      comment,
      this.username
    );

    return result.rowCount > 0;
  }

  async getTags() {
    //Returns all tags
    let result = await dbQuery("SELECT * FROM tags");

    return result.rows;
  }

  async getNewPostId() {
    //Returns postId of last post created, used for adding tags
    let result = await dbQuery("SELECT * FROM posts ORDER BY id DESC LIMIT 1");

    return result.rows[0].id;
  }

  async addTags(postId, postTags) {
    //Adds posts and tags to posts_tags table until all tags have been added
    let tagsAdded = 0;
    for (let i = 0; i < postTags.length; i++) {
      let result = await dbQuery(
        "INSERT INTO posts_tags (post_id, tag_name) VALUES ($1, $2)",
        postId,
        postTags[i]
      );

      if (result.rowCount > 0) tagsAdded += 1;
    }

    return tagsAdded === postTags.length;
  }

  async deletePost(postId) {
    //Removes a post and it's related data
    let result = await dbQuery(
      "DELETE FROM posts WHERE id = $1 AND username = $2",
      postId,
      this.username
    );

    return result.rowCount > 0;
  }

  async deleteComment(commentId) {
    //Removes a comment
    let result = await dbQuery(
      "DELETE FROM comments WHERE id = $1 AND username = $2",
      commentId,
      this.username
    );

    return result.rowCount > 0;
  }

  async updatePostTitle(postId, newTitle) {
    //Changes a post's title to a new title
    let result = await dbQuery(
      "UPDATE posts SET title = $1 WHERE id = $2 AND username = $3",
      newTitle,
      postId,
      this.username
    );

    return result.rowCount > 0;
  }

  async updatePostContent(postId, newContent) {
    //Changes a post's content to new content
    let result = await dbQuery(
      "UPDATE posts SET content = $1 WHERE id = $2 AND username = $3",
      newContent,
      postId,
      this.username
    );

    return result.rowCount > 0;
  }

  async updatePostTags(postId, newTags) {
    //Changes the specified tags on a post
    let deleteResult = await dbQuery(
      "DELETE FROM posts_tags WHERE post_id = $1",
      postId
    );
    if (!(deleteResult.rowCount > 0)) throw new Error("Tags not updated.");

    return await this.addTags(postId, newTags);
  }

  async getComment(commentId) {
    //Returns the specified comment
    let result = await dbQuery(
      "SELECT * FROM comments WHERE id = $1",
      commentId
    );

    return result.rows[0];
  }

  async updateComment(commentId, newText) {
    //Changes a comment's content
    let result = await dbQuery(
      "UPDATE comments SET comment_text = $1 WHERE id = $2 AND username = $3",
      newText,
      commentId,
      this.username
    );

    return result.rowCount > 0;
  }

  async existingUser(username, password) {
    //Authenticates a user login
    let result = await dbQuery(
      "SELECT password FROM users WHERE username = $1",
      username
    );

    if (result.rowCount === 0) return false;

    return bcrypt.compare(password, result.rows[0].password);
  }
};
