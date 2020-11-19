// Exports a function that returns an object with text matching the input query string
module.exports = (query) =>
  query
    ? {
        $text: { $search: query }
      }
    : {};
