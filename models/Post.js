import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title tidak boleh kosong."],
      trim: true,
      minlength: [5, "Title minimal harus 5 karakter."],
      maxlength: [150, "Title maksimal 150 karakter."],
    },
    description: {
      type: String,
      required: [true, "Description tidak boleh kosong."],
      trim: true,
      minlength: [20, "Description minimal harus 20 karakter."],
      maxlength: [500, "Description maksimal 500 karakter."],
    },
    content: {
      type: String,
      required: [true, "Content tidak boleh kosong."],
      minlength: [50, "Content minimal harus 50 karakter."],
    },
    slug: {
      type: String,
      unique: true,
    },
    tags: {
      type: [String],
      validate: {
        validator: (val) => val.length <= 5,
        message: "Maksimal 5 tag diperbolehkan.",
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt & updatedAt
  }
);

// Middleware untuk generate slug otomatis
PostSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
