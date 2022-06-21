const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getPool } = require('./getPool');

// Devuelve la información pública de un usuario por su id
const getUserByEmail = async (email) => {
  let pool;

  try {
    pool = await getPool();

    const [result] = await pool.query(
      `
      SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con ese email', 404);
    }

    return result[0];
  } finally {
    if (pool) pool.release();
  }
};

// Devuelve la información pública de un usuario por su id
const getUserById = async (id, includeTweets = true) => {
  let pool;

  try {
    pool = await getPool();

    const [result] = await pool.query(
      `
      SELECT id, email, created_at FROM users WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con esa id', 404);
    }

    return result[0];
  } finally {
    if (pool) pool.release();
  }
};

// Crea un usuario en la base de datos y devuelve su id
const createUser = async (email, password) => {
  let pool;

  try {
    pool = await getPool();
    //Comprobar que no exista otro usuario con ese email
    const [user] = await pool.query(
      `
      SELECT id FROM users WHERE email = ?
    `,
      [email]
    );

    if (user.length > 0) {
      throw generateError(
        'Ya existe un usuario en la base de datos con ese email',
        409
      );
    }

    //Encriptar la password
    const passwordHash = await bcrypt.hash(password, 12);

    //Crear el usuario
    const [newUser] = await pool.query(
      `
      INSERT INTO users (email, password) VALUES(?, ?)
    `,
      [email, passwordHash]
    );

    //Devolver la id
    return newUser.insertId;
  } finally {
    if (pool) pool.release();
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
