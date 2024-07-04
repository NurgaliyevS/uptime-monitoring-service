import connectMongoDB from "@/backend/mongodb";
import User from "@/backend/user";

export default async function handler(req, res) {
  const { method } = req;

  await connectMongoDB();

  switch (method) {
    case "GET":
      try {
        // Check if a user ID is provided in the request URL
        const userId = req.query.id;
        if (userId) {
          // Find the user with the provided ID
          const user = await User.findById(userId);
          if (!user) {
            return res
              .status(404)
              .json({ success: false, message: "User not found" });
          }
          return res
            .status(200)
            .json({ success: true, message: "User found", data: user });
        } 
        // else {
        //   const users = await User.find().select('name image'); // Include only necessary fields
        //   return res.status(200).json({ success: true, message: "Users found", data: users });
        // }
      } catch (error) {
        if (error.kind === "ObjectId") {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    case "POST":
      try {
        const user = await User.create(req.body);
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: user,
        });
      } catch (error) {
        return res.status(400).json({ success: false, message: "Bad request" });
      }
    default:
      return res.status(400).json({ success: false, message: "Bad request" });
  }
}
