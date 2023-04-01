import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [postName, setPostName] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/posts', { name: postName, content: postContent });
      const post = result.data;
      router.push('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>You need to sign in to create a post</p>
        <button
        onClick={() => signIn()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign in
      </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Create a new post</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="postName" className="block font-bold mb-2">Title:</label>
          <input
            id="postName"
            type="text"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="postContent" className="block font-bold mb-2">Content:</label>
          <textarea
            id="postContent"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
