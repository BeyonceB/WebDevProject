import { getAllComments, createComment } from "../../../../../database";

export default async function handler(req, res) {
  const { postId } = req.query;

  switch (req.method) {
    case 'GET':
    // Get all comments for a post
    const comments = await getAllComments(postId)
    res.status(200).json(comments)
    break;
    case "POST":
    // Create a new comment
    const { text, userName } = req.body;
    if (!text || !userName) {
        res.status(400).json({ message: "Missing comment text or user name" });
        break;
    }
    const newComment = await createComment(text, postId, userName);
    res.status(201).json(newComment)
    break;
    default:
      res.status(405).end();
  }
}
