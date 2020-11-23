// Exports a function that returns an object with text matching the input query string
module.exports = function (query) {
    return query
        ? {
            $text: { $search: query }
        }
        : {};
};
