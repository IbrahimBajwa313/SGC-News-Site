import connectDB from "../../middleware/mongoose";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "PUT":
      const { first_name, last_name, username, role } = req.body;
      try {
        const user = await User.findByIdAndUpdate(
          id,
          { first_name, last_name, username, role },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case "DELETE":
      try {
        // Check if the ID is provided
        if (!id) {
          return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Delete the user from the database
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
          return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: deletedUser });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
};

export default connectDB(handler);
