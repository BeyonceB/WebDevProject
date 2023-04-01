import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function UpdatePost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`)
        .then(response => setPost(response.data))
        .catch(error => setError(error.message));
    }
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleUpdate = event => {
    event.preventDefault();
    axios.put(`/api/posts/${id}`, post)
      .then(() => router.push(`/posts/${id}`))
      .catch(error => setError(error.message));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={post.title || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block font-bold mb-2">Content:</label>
          <textarea
            id="content"
            name="content"
            value={post.content || ''}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
