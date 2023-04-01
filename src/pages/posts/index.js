import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getAllPosts } from '@/database';
import { useSession } from 'next-auth/react';

export default function Posts({ posts }) {
  const [postsData, setPostsData] = useState(posts);
  const { data: session } = useSession();

  useEffect(() => {
    axios.get('/api/posts').then((response) => {
      setPostsData(response.data);
    });
  }, []);

  const deletePostById = async (id) => {
    await axios.delete('/api/posts/' + id);
    setPostsData(postsData.filter((post) => post.id !== id));
  };

  const createPost = () => {
    if (!session) {
      // Redirect to login page or render a message
      return null;
    }

    // Render create post form
    return (
      <div>
        {/* Your create post form code here */}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Posts</h1>
      {createPost()}
      <ul className="w-full max-w-lg">
        {Array.isArray(postsData) &&
          postsData.map((post) => (
            <li key={post.id} className="border rounded-md p-4 mb-4 flex justify-between items-center">
              <Link href={`/posts/${post.id}`}>
                <div className="text-lg font-medium">{post.name}</div>
              </Link>
              <div className="flex items-center">
                <Link className="text-gray-600 hover:text-gray-800 mr-4" href={`/posts/${post.id}`}>
                  Comment
                </Link>
                <button onClick={() => deletePostById(post.id)} className="text-red-600 hover:text-red-800 mr-4">Delete</button>
                <Link href={`/posts/${post.id}/edit`}>
                  <div className="text-blue-600 hover:text-blue-800">Update</div>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
