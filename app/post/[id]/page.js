"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Trash2, Edit, XCircle } from "lucide-react";

const PostDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false); // State modal konfirmasi

  useEffect(() => {
    if (!id) {
      setError("Invalid Post ID.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`);

        if (!res.ok) {
          throw new Error("Post not found.");
        }

        const { post } = await res.json();
        setPost(post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Function to delete post
  const handleDelete = useCallback(async () => {
    setShowConfirm(false); // Tutup modal sebelum eksekusi delete
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete post");
      }

      alert("Post deleted successfully");
      router.push("/post");
    } catch (error) {
      setError(error.message);
    }
  }, [id, router]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

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
            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mt-4">
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          {/* Update Button */}
          <button
            onClick={() => router.push(`/post/update/${id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center"
          >
            <Edit className="w-5 h-5 mr-2" /> Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setShowConfirm(true)} // Buka modal konfirmasi
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
          >
            <Trash2 className="w-5 h-5 mr-2" /> Delete
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Delete Post?</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)} // Tutup modal
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
