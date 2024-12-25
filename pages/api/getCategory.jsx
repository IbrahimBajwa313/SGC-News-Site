// /pages/api/getCategoryById.js
import Category from '../../models/Category';

export default async function handler(req, res) {
  const { id } = req.query; // Extract the category ID from the query parameter

  if (req.method === 'GET') {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Category ID is required',
      });
    }

    try {
      const category = await Category.findById(id); // Find the category by its ID

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }

      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
