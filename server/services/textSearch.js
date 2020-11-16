module.exports = (query) =>
  query
    ? {
        $text: { $search: query }
      }
    : {};
