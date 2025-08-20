//Import modules/packages
const express = require("express");
const morgan = require("morgan");
const { catchError } = require("./lib/routeMethods");
const forumDBI = require("./lib/forum_api");
const session = require("express-session");
const store = require("connect-loki");
const flash = require("express-flash");
const config = require("./lib/config");

//Import routes
const home = require("./routes/home");
const post = require("./routes/post");
const comment = require("./routes/comment");
const signIn = require("./routes/sign-in");

//Set constants
const app = express();
const HOST = config.HOST;
const PORT = config.PORT;
const LokiStore = store(session);

//Settings & configuation
app.set("view engine", "pug");
app.set("views", "views");

//Initial middlewear
app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    cookie: {
      httpOnly: true,
      maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in millseconds
      path: "/",
      secure: false,
    },
    name: "ls-forum-session-id",
    resave: false,
    saveUninitialized: true,
    secret: config.SECRET,
    store: new LokiStore({}),
  })
);
app.use(flash());

//Set db api
app.use((req, res, next) => {
  res.locals.store = new forumDBI(req.session);
  next();
});

//Preserve session info
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.signedIn = req.session.signedIn;
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

//Get data used in all pages
app.use(
  catchError(async (req, res, next) => {
    app.locals.popularPosts = await res.locals.store.getPopularPosts();
    app.locals.tags = await res.locals.store.getTags();
    next();
  })
);

//Initial redirect
app.get("/", (req, res) => {
  res.redirect("/home");
});

//Routing middlewear
app.use("/home", home);
app.use("/post", post);
app.use("/comment", comment);
app.use("/sign-in", signIn);
app.all("*", (req, res) => {
  req.flash("error", "Invalid url, redirected to home");
  res.redirect("/home");
});

//Error handler
app.use((error, req, res, _next) => {
  console.log(error);
  res.status(404).render("error", { error: error });
});

app.listen(PORT, HOST, () => {
  console.log(`Server live on: ${HOST}:${PORT}`);
});
