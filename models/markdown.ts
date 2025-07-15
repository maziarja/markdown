import { model, models, Schema, Document, Model } from "mongoose";

export interface MarkdownType extends Document {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

const markdownSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    content: {
      type: String,
      required: [true, "title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const Markdown: Model<MarkdownType> =
  models?.Markdown || model<MarkdownType>("Markdown", markdownSchema);

export default Markdown;
