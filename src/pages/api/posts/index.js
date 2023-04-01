import { getAllPosts, createPost } from "@/database";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
    // Get all posts
    const posts = await getAllPosts()
    res.status(200).json(posts)
    break;
    case "POST":
    // Create a new post
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ message: "Missing post name" });
        return;
    }
    const post = await createPost(name);
    res.status(201).json(post);
    break;
    default:
      res.status(405).end();
  }
}
