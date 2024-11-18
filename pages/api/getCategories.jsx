import Category from '../../models/Category';  

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await Category.find(); // Fetch all categories
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}