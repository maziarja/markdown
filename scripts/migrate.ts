import mongoose from "mongoose";

const markdownSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

async function migrate() {
  const oldUri = process.env.OLD_MONGODB_URI;
  const newUri = process.env.MONGODB_URI;

  if (!oldUri) throw new Error("OLD_MONGODB_URI is not set");
  if (!newUri) throw new Error("MONGODB_URI is not set");

  // ── Connect to old DB and fetch all documents ──
  console.log("Connecting to old database...");
  const oldConn = await mongoose.createConnection(oldUri).asPromise();
  const OldMarkdown = oldConn.model("Markdown", markdownSchema);
  const docs = await OldMarkdown.find().lean();
  console.log(`Found ${docs.length} documents in old database`);

  // ── Connect to new DB and insert ──
  console.log("Connecting to new database...");
  const newConn = await mongoose.createConnection(newUri).asPromise();
  const NewMarkdown = newConn.model("Markdown", markdownSchema);
  await NewMarkdown.insertMany(docs, { rawResult: false });
  console.log(`Migrated ${docs.length} documents to new database ✓`);

  await oldConn.close();
  await newConn.close();
}

migrate().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
