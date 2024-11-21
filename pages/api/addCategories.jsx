import Category from '../../models/Category';  

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { category_name } = req.body;
      const newCategory = new Category({ category_name });
      await newCategory.save();
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}