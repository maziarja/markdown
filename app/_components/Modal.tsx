"use client";
import { MarkdownType } from "@/models/markdown";
import { Dispatch, SetStateAction } from "react";
import { deleteMarkdown } from "../_actions/deleteMarkdown";

type ModalProps = {
  markdown: MarkdownType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ markdown, setShowModal }: ModalProps) => {
  function handleDeleteMarkdown() {
    deleteMarkdown(markdown._id);
  }
  return (
    <>
      <div className="bg-modal-layout absolute h-full w-full"></div>
      <div className="bg-modal absolute top-[50%] left-[50%] m-4 flex w-[343px] translate-x-[-55%] translate-y-[-50%] flex-col gap-4 rounded-sm p-6">
        {markdown._id !== "686ed07197d7acc917298d82" ? (
          <>
            <h4>Delete this document?</h4>
            <p>
              Are you sure you want to delete the `{markdown.title}` document
              and its contents? This action cannot be reversed.
            </p>
            <div className="mt-2 flex items-center">
              <button
                onClick={handleDeleteMarkdown}
                className="bg-orange text-100 hover:bg-orange-hover cursor-pointer rounded-sm px-4 py-2 text-sm"
              >
                Confirm & Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-100 text-800 hover:bg-800 hover:text-100 ml-auto cursor-pointer rounded-sm px-4 py-2 text-sm ring-1 ring-500"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-base">This markdown cannot be deleted</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-100 text-800 hover:bg-800 hover:text-100 ml-auto cursor-pointer rounded-sm px-4 py-2 text-sm ring-1 ring-500"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Modal;
