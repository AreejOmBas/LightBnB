const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const values = [email];

  const query = `SELECT * FROM users WHERE email = $1`;
  return pool.query(query, values)
    .then(res => res.rows[0] || null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const values = [id];

  const query = `SELECT * FROM users WHERE id = $1`;
  return pool.query(query, values)
    .then(res => res.rows[0] || null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const { name, email, password } = user;
  const values = [name, email, password];

  const query = `INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING *;`;
  return pool.query(query, values)
    .then(res => res.rows[0] || null);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {


  const values = [guest_id, limit];

  const query = `SELECT properties.*, reservations.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  JOIN reservations ON properties.id = reservations.property_id
  WHERE reservations.guest_id = $1 
  GROUP BY properties.id , reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;`;

  return pool.query(query, values)
    .then(res => res.rows || null);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // 1
  const values = [];
  // 2
  let query = `
 SELECT properties.*, avg(property_reviews.rating) as average_rating
 FROM properties
 LEFT JOIN property_reviews ON properties.id = property_id
 `;

  // 3
  if (options.city) {
    values.push(options.city);
    query += `WHERE LOWER(city) = LOWER($${values.length}) `;
  }

  if (options.owner_id) {
    values.push(options.owner_id)
    if (values.length > 1) {
      query += ` AND owner_id = $${values.length}`;
    } else {
      query += `WHERE owner_id = $${values.length}`;
    }
  }
  if (options.minimum_price_per_night || options.maximum_price_per_night) {
    values.push(options.minimum_price_per_night * 100);
    values.push(options.maximum_price_per_night * 100);
    if (values.length > 1) {
      query += ` AND cost_per_night BETWEEN $${values.length - 1} AND $${values.length}`;
    } else {
      query += `WHERE cost_per_night BETWEEN $${values.length - 1} AND $${values.length}`;
    }
  }

  if (options.minimum_rating) {
    values.push(options.minimum_rating)
    if (values.length > 1) {
      query += ` AND rating >= $${values.length}`;
    } else {
      query += `WHERE rating >= $${values.length}`;
    }
  }
  values.push(limit);
  query += `
 GROUP BY properties.id
 ORDER BY cost_per_night
 LIMIT $${values.length};
 `;
  return pool.query(query, values)
    .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const query = `INSERT INTO properties (
    title, description, number_of_bedrooms, number_of_bathrooms, parking_spaces, cost_per_night,  thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`
    const values = [...Object.values(property)];

    return pool.query(query, values)
    .then(res => res.rows || null);
}
exports.addProperty = addProperty;
