const dbConnection = require("./mongoConnection");

/* This will allow you to have on reference to each collection per app */
/* Feel free to copy and paste this */
const getCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await dbConnection();
            _col = await db.collection(collection);
        }
        return _col;
    };
};

/* Now, you can list your collections here: */
module.exports = {
    users: getCollectionFn("users"),
    posts: getCollectionFn("posts"),
    topics: getCollectionFn("topics"),
    course: getCollectionFn("course")
};
