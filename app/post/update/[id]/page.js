"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(5, "Title minimal harus 5 karakter.")
    .max(150, "Title maksimal 150 karakter.")
    .required("Title tidak boleh kosong."),
  description: Yup.string()
    .trim()
    .min(20, "Description minimal harus 20 karakter.")
    .max(500, "Description maksimal 500 karakter.")
    .required("Description tidak boleh kosong."),
  content: Yup.string()
    .min(50, "Content minimal harus 50 karakter.")
    .required("Content tidak boleh kosong."),
  tags: Yup.array()
    .of(Yup.string().trim())
    .max(5, "Maksimal 5 tag diperbolehkan."),
  published: Yup.boolean(),
});

export default function PostEdit() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!res.ok) throw new Error("Post not found.");
        const { post } = await res.json();
        setPost(post);
        setTagsInput(post.tags.join(", "));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Post</h1>

      <Formik
        initialValues={{
          title: post.title,
          description: post.description,
          content: post.content,
          tags: post.tags,
          published: post.published,
        }}
        validationSchema={PostSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formattedValues = {
              ...values,
              tags: tagsInput.split(",").map((tag) => tag.trim()),
            };

            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formattedValues),
            });

            if (!response.ok) throw new Error("Gagal mengupdate post");

            router.push("/post");
          } catch (error) {
            console.error("Error updating post:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg border">
            <div>
              <label>Title</label>
              <Field type="text" name="title" className="border p-2 w-full" />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>

            <div className="mt-4">
              <label>Description</label>
              <Field type="text" name="description" className="border p-2 w-full" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>

            <div className="mt-4">
              <label>Content</label>
              <Field as="textarea" name="content" className="border p-2 w-full h-32" />
              <ErrorMessage name="content" component="div" className="text-red-500" />
            </div>

            <div className="mt-4">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => {
                  setTagsInput(e.target.value);
                  setFieldValue("tags", e.target.value.split(",").map((tag) => tag.trim()));
                }}
                className="border p-2 w-full"
                placeholder="Enter tags separated by commas"
              />
              <ErrorMessage name="tags" component="div" className="text-red-500" />
            </div>

            <div className="mt-4 flex items-center">
              <Field type="checkbox" name="published" className="mr-2" />
              <label>Publish</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              {isSubmitting ? "Updating..." : "Update Post"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
