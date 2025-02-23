import Link from "next/link";
import React from "react";

const Post = async () => {
  const res = await fetch("http://localhost:3000/api/posts", {cache: "no-store"});
  const data = await res.json();

  const posts = data?.post || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">All Posts</h1>

      {/* Grid 2 columns */}
      <div className="grid md:grid-cols-2 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg p-5 border"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <Link
                href={`/post/${post._id}`}
                className="text-blue-600 font-semibold mt-4 inline-block"
              >
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Post;
