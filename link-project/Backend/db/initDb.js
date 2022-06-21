require('dotenv').config();

const { getPool } = require('./getPool');

async function main() {
  let pool;

  try {
    pool = await getPool();

    console.log('Clearing tables...');

    await pool.query(`DROP TABLE (users, posts, votes)`);

    console.log('Creating new tables...');

    await pool.query(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20) UNIQUE NOT NULL,
        email VARCHAR(60) UNIQUE NOT NULL,
        bio VARCHAR(200),
        password VARCHAR(30) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    await pool.query(`CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(200) NOT NULL,
        url VARCHAR(200),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    await pool.query(`CREATE TABLE votes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        post_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  } catch (error) {
    console.error(error);
  } finally {
    if (pool) pool.release();
    process.exit();
  }
}

main();
