import { useState } from "react";
import axios from "axios";
import { getAllComments } from "@/database";

export default function Post({ postId, comments: initialComments }) {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState(initialComments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", userName, text);
    // Send to the database (POST)

    const result = await axios.post(`/api/posts/${postId}/comments`, {
      userName,
      text,
    });
    const newComment = result.data;

    setComments([...comments, newComment]);
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Posts {postId}</h1>
      <ul className="mb-4">
        {comments.map((comment) => (
          <li key={comment.id} className="text-gray-700">
            {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Name"
          className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-2"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment"
          className="bg-gray-100 border border-gray-300 p-2 rounded-md mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  // This is always server side
  // From the server, we can connect to the database
  const postId = context.query.postId;
  const posts = await getAllComments(postId);
  return {
    props: {
      postId,
      comments: JSON.parse(JSON.stringify(posts)),
    },
  };
}
