import { getPostById, updatePostById, deletePostById } from "@/database";

export default async function handler(req, res) {
  const postId = req.query.id;

  switch (req.method) {
    case "GET":
      // Get a single post by id
      const post = await getPostById(postId);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        break;
      }
      res.status(200).json(post);
      break;
    case "PATCH":
      // Update a post by id
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ message: "Missing post name" });
        break;
      }
      const updatedPost = await updatePostById(postId, name);
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        break;
      }
      res.status(200).json(updatedPost);
      break;
    case "DELETE":
      // Delete a post by id
      await deletePostById(postId);
      res.status(204).end();
      break;
    default:
      res.status(405).end();
      break;
  }
}
