import dbConnect from "../middleware/mongoose";// utility to connect to MongoDB
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  // Only accept POST requests for form submission
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await dbConnect();

      // Destructure the incoming data
      const { name, email, message, userId } = req.body;

      // Create a new contact entry with userId
      const newContact = new Contact({
        name,
        email,
        message,
        userId: userId || null // Save the userId from the frontend
      });

      // Save the contact to MongoDB
      await newContact.save();

      // Respond with a success message
      res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'There was an error submitting your message.' });
    }
  } else {
    // If the request method is not POST
    res.status(405).json({ error: 'Method not allowed' });
  }
}
