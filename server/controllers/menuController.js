const { pool } = require('../config/db');

const getMenuItems = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(`
      SELECT m.id, m.name, m.description, m.price, m.image_url, c.name AS category_name, c.slug AS category_slug
      FROM menu_items m
      INNER JOIN categories c ON c.id = m.category_id
      ORDER BY m.created_at DESC
    `);

    const formatted = rows.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      image: item.image_url,
      category: item.category_name,
      categorySlug: item.category_slug,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMenuItems };
