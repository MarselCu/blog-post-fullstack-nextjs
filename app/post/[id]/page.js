import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PostDetail = async ({ params }) => {
  if (!params?.id) {
    return <div className="text-center mt-10 text-red-600">Invalid Post ID.</div>;
  }

  // Fetch post detail
  const res = await fetch(`http://localhost:3000/api/posts/${params.id}`);
  
  if (!res.ok) {
    return <div className="text-center mt-10 text-red-600">Post not found.</div>;
  }

  const { post } = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/post" className="flex items-center text-blue-600 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Link>

      {/* Post Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 border max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-600 mt-2">{post.description}</p>
        
        <div className="mt-4 text-gray-800">{post.content}</div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mt-4">
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
