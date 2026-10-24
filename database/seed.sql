USE flavourhub_db;

INSERT INTO categories (name, slug, description) VALUES
('Pizza', 'pizza', 'Freshly baked stone-fired pizza favorites.'),
('Burger', 'burger', 'Juicy burgers with rich toppings and sides.'),
('Desserts', 'desserts', 'Sweet treats for every craving.')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description);

INSERT INTO menu_items (category_id, name, description, price, image_url, is_featured)
SELECT c.id, 'Delicious Pizza-1', 'Classic cheese burst with fresh vegetables and herbs.', 249.00, 'f1 (1).png', true
FROM categories c WHERE c.slug = 'pizza'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Delicious Pizza-1')
UNION ALL
SELECT c.id, 'Delicious Pizza-2', 'Loaded with mozzarella and garden toppings.', 395.00, 'f1.png', true
FROM categories c WHERE c.slug = 'pizza'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Delicious Pizza-2')
UNION ALL
SELECT c.id, 'Delicious Pizza-3', 'A pan-style favorite with rich tomato sauce.', 269.00, 'f3.png', true
FROM categories c WHERE c.slug = 'pizza'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Delicious Pizza-3')
UNION ALL
SELECT c.id, 'Burger-10', 'Grilled burger served with crunchy lettuce and sauces.', 204.00, 'b3.png', false
FROM categories c WHERE c.slug = 'burger'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Burger-10')
UNION ALL
SELECT c.id, 'Burger-11', 'Double stack burger with signature house sauce.', 296.00, 'b2.png', false
FROM categories c WHERE c.slug = 'burger'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Burger-11')
UNION ALL
SELECT c.id, 'Burger-12', 'Classic burger with cheddar and caramelized onions.', 202.00, 'b3.png', false
FROM categories c WHERE c.slug = 'burger'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Burger-12')
UNION ALL
SELECT c.id, 'Chocolate Lava', 'Warm molten center with decadent fudge.', 199.00, 'o2.jpg', true
FROM categories c WHERE c.slug = 'desserts'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Chocolate Lava')
UNION ALL
SELECT c.id, 'Brownie Delight', 'Brownie chunks finished with caramel drizzle.', 149.00, 'o1.jpg', true
FROM categories c WHERE c.slug = 'desserts'
AND NOT EXISTS (SELECT 1 FROM menu_items m WHERE m.category_id = c.id AND m.name = 'Brownie Delight');
