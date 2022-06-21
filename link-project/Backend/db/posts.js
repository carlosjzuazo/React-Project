const { generateError } = require('../helpers');
const { getPool } = require('./getPool');

const deletePostById = async (id) => {
  let pool;

  try {
    pool = await getPool();

    await pool.query(
      `
      DELETE FROM tweets WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (pool) pool.release();
  }
};

const getPostById = async (id) => {
  let pool;

  try {
    pool = await getPool();

    const [result] = await pool.query(
      `
          SELECT tweets.id, tweets.user_id, tweets.text, tweets.image, tweets.created_at, users.email FROM tweets LEFT JOIN users on tweets.user_id = users.id WHERE tweets.id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`El tweet con id: ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (pool) pool.release();
  }
};

const getPostsByUserId = async (id) => {
  let pool;

  try {
    pool = await getPool();

    const [result] = await pool.query(
      `
          SELECT tweets.*, users.email FROM tweets LEFT JOIN users on tweets.user_id = users.id WHERE tweets.user_id = ?
    `,
      [id]
    );

    return result;
  } finally {
    if (pool) pool.release();
  }
};

const getAllPosts = async () => {
  let pool;

  try {
    pool = await getPool();

    const [result] = await pool.query(`
        SELECT tweets.id, tweets.user_id, tweets.text, tweets.image, tweets.created_at, users.email FROM tweets LEFT JOIN users on tweets.user_id = users.id ORDER BY tweets.created_at DESC
    `);

    return result;
  } finally {
    if (pool) pool.release();
  }
};

const createPost = async (userId, text, image = '') => {
  let pool;

  try {
    pool = await getPool();

    const [result] = await pool.query(
      `
      INSERT INTO tweets (user_id, text, image)
      VALUES(?,?,?)
    `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (pool) pool.release();
  }
};

module.exports = {
  deletePostById,
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUserId,
};
