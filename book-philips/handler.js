/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const buku = require('./buku');

const HandlerpostBook = (request, h) => {
  const id = `book : ${nanoid(16)}`;
  // eslint-disable-next-line no-unused-vars
  const databuku = request.payload;
  const finished = databuku.pageCount === databuku.readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  if (!databuku.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (databuku.readPage > databuku.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  buku.push({
    ...databuku, id, finished, insertedAt, updatedAt,
  });

  const insert = buku.find((book) => book.id === id);
  if (insert) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: buku[0].id },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const HandlergetBook = (request, h) => {
  const getDataBuku = buku.map((elm) => ({
    id: elm.id,
    name: elm.name,
    publisher: elm.publisher,
  }));
  return h.response({
    status: 'success',
    data: {
      books: getDataBuku,
    },
  });
};

const HandlergetBookbyID = (request, h) => {
  const { bookId } = request.params;
  // eslint-disable-next-line eqeqeq
  const getIdbuku = buku.find((elm) => elm.id === bookId);

  if (getIdbuku) {
    const response = h.response({
      status: 'success',
      data: {
        book: getIdbuku,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const HandlerputBookID = (request, h) => {
  const { bookId } = request.params;
  const getIdbuku = buku.find((elm) => elm.id === bookId);
  const databuku = request.payload;
  const finished = databuku.pageCount === databuku.readPage;

  if (!databuku.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (databuku.readPage > databuku.pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (getIdbuku) {
    const databaru = buku.map((elm) => {
      if (elm.id !== bookId) {
        return elm;
      }
      return {
        id: elm.id,
        ...databuku,
        finished,
        insertedAt: elm.insertedAt,
        updatedAt: new Date(),
      };
    });
    buku.splice(0, buku.length);
    databaru.forEach((elm) => buku.push(elm));
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const handlerDeleteBook = (request, h) => {
  const { bookId } = request.params;
  const index = buku.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    buku.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  HandlerpostBook,
  HandlergetBook,
  HandlergetBookbyID,
  HandlerputBookID,
  handlerDeleteBook,
};
