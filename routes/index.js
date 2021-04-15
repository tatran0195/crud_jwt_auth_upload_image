const postsRoute = require("./posts");
const userRoute = require("./users");

const _routes = (app) => {
    app.use("/posts", postsRoute);
    app.use("/user", userRoute);
};

module.exports = _routes;
