const { nanoid } = require('nanoid');
const products = require('./products');

const addProductHandler = (request, h) => {
  const { name, price, category } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, nama product tidak terlampir',
    });
    response.code(400);
    return response;
  }

  if (price === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, price tidak terlampir',
    });
    response.code(400);
    return response;
  }

  if (category === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, category tidak terlampir',
    });
    response.code(400);
    return response;
  }

  const newProducts = {
    name, price, category, id, insertedAt, updatedAt,
  };

  products.push(newProducts);

  const isSuccess = products.filter((p) => p.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Berhasil menambahkan product',
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan products',
  });
  response.code(500);
  return response;
};

const getAllProductsHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      products,
    },
  });
  response.code(200);
  return response;
};

const getDetailProductHandler = (request, h) => {
  const { productId } = request.params;

  if (productId === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menampilkan product, id produk tidak dilampirkan',
    });
    response.code(400);
    return response;
  }

  const product = products.filter((p) => p.id === productId)[0];
  if (product !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        products: product,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menampilkan product, id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editDetailProductsHandler = (request, h) => {
  const { productId } = request.params;
  const { name, price, category } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = products.findIndex((product) => product.id === productId);

  if (index !== -1) {
    products[index] = {
      ...products[index],
      name,
      price,
      category,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Berhasil mengubah product',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal mengubah product',
  });
  response.code(500);
  return response;
};

const deleteDetailProductHandler = (request, h) => {
  const { productId } = request.params;

  const product = products.findIndex((p) => p.id === productId);
  if (product !== -1) {
    products.splice(product, 1);
    const response = h.response({
      status: 'success',
      message: 'Berhasil menghapus product',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus products',
  });
  response.code(500);
  return response;
};

module.exports = {
  addProductHandler,
  getAllProductsHandler,
  getDetailProductHandler,
  editDetailProductsHandler,
  deleteDetailProductHandler,
};
