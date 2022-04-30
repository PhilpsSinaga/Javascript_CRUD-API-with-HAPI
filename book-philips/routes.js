const {
  HandlerpostBook,
  HandlergetBook,
  HandlergetBookbyID,
  HandlerputBookID,
  handlerDeleteBook,
} = require('./handler');

const routes = [
  {
    // eslint-disable-next-line indent
    path: '/books',
    method: 'POST',
    handler: HandlerpostBook,
  },
  {
    path: '/books',
    method: 'GET',
    handler: HandlergetBook,
  },
  {
    path: '/books/{bookId}',
    method: 'GET',
    handler: HandlergetBookbyID,
  },
  {
    path: '/books/{bookId}',
    method: 'PUT',
    handler: HandlerputBookID,
  },
  {
    path: '/books/{bookId}',
    method: 'DELETE',
    handler: handlerDeleteBook,
  },
];

module.exports = routes;
