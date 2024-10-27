import connectDB from "../../middleware/mongoose";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "PUT") {
    const { first_name, last_name, username, role } = req.body;

    try {
      const user = await User.findByIdAndUpdate(
        id,
        { first_name, last_name, username, role },
        { new: true }
      );
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default connectDB(handler);
