import connectDB from "../middleware/mongoose";
import User from '../../models/User'; // Correct model import

const handler = async (req, res) => {
  try {
    // Fetch users from the User model
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

export default connectDB(handler);