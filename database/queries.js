const pool = require('./pool');

async function getAdmin(adminEmail) {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE users.email = $1;',
    [adminEmail]
  );

  return rows;
}

async function createAdmin(email, password, avatar = null, roles) {
  try {
    await pool.query(
      'INSERT INTO users (email, password, avatar, roles) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, password, avatar, roles]
    );
  } catch (err) {
    console.log(err);
  }
}

// exports
module.exports = {
  getAdmin,
  createAdmin,
};
