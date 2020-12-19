// Exports a function that returns an object with text matching the input query string
module.exports = (query: string) =>
  query
    ? {
        $text: { $search: query },
      }
    : {};
