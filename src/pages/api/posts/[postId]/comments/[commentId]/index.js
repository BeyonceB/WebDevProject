import { getCommentById, updateCommentById, deleteCommentById } from "@/server/db/client";

export default async function handler(req, res) {
  const { commentId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a comment by ID
        const comment = await getCommentById(commentId);
        if (!comment) {
            res.status(404).json({ message: "Comment not found" });
        }
            break;
    case "PATCH":
      // Update a comment by ID
        const { text } = req.body;
        const updatedComment = await updateCommentById(commentId, text);
        if (!updatedComment) {
            res.status(404).json({ message: "Comment not found" });
        }
            break;
    case "DELETE":
      // Delete a comment by ID
        await deleteCommentById(commentId);
        res.status(204).end();
    default:
      res.status(405).end();
  }
}
