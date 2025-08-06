"use client"
import React, { useState, useCallback, useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import Placeholder from "@tiptap/extension-placeholder"
import { MdAddLink, MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatStrikethrough, MdFormatListBulleted, MdFormatListNumbered, MdLinkOff, MdFormatQuote, MdCode, MdUndo, MdRedo, MdOutlineImage } from "react-icons/md";
import { RiH1, RiH2, RiH3 } from "react-icons/ri";
const MenuBar = ({ editor }) => {
  const [_, setRefresh] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const updateHandler = () => {
      setRefresh((prev) => prev + 1);
    };
    editor.on("update", updateHandler);
    editor.on("selectionUpdate", updateHandler);
    return () => {
      editor.off("update", updateHandler);
      editor.off("selectionUpdate", updateHandler);
    };
  }, [editor]);
  if (!editor) return null;
  const getButtonClass = (isActive, isDisabled) => {
    return [
      "px-2 py-1 rounded-md text-lg transition-colors",
      isActive ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-100 text-gray-700 dark:text-gray-500",
      !isDisabled ? "hover:bg-gray-400 dark:hover:bg-gray-600" : "opacity-50 cursor-not-allowed",
    ].join(" ");
  };
  return (
    <div className="tiptap-toolbar flex flex-wrap gap-2 items-center border-b border-gray-200 px-4 py-2 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={getButtonClass(editor.isActive("bold"), !editor.can().chain().focus().toggleBold().run())}
      >
        <MdFormatBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={getButtonClass(editor.isActive("italic"), !editor.can().chain().focus().toggleItalic().run())}
      >
        <MdFormatItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={getButtonClass(editor.isActive("underline"), !editor.can().chain().focus().toggleUnderline().run())}
      >
        <MdFormatUnderlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={getButtonClass(editor.isActive("strike"), !editor.can().chain().focus().toggleStrike().run())}
      >
        <MdFormatStrikethrough />
      </button>
      {[1, 2, 3].map((level, i) => {
        const icons = [<RiH1 />, <RiH2 />, <RiH3 />];
        return (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={getButtonClass(editor.isActive("heading", { level }), false)}
          >
            {icons[i]}
          </button>
        );
      })}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={getButtonClass(editor.isActive("bulletList"), false)}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={getButtonClass(editor.isActive("orderedList"), false)}
      >
        <MdFormatListNumbered />
      </button>
      <button
        onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }
        }}
        disabled={!editor.can().chain().focus().setLink({ href: "" }).run()}
        className={getButtonClass(editor.isActive("link"), !editor.can().chain().focus().setLink({ href: "" }).run())}
      >
        <MdAddLink />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className={getButtonClass(false, !editor.isActive("link"))}
      >
        <MdLinkOff />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={getButtonClass(editor.isActive("blockquote"), false)}
      >
        <MdFormatQuote />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={getButtonClass(editor.isActive("codeBlock"), false)}
      >
        <MdCode />
      </button>
      <ImageUploadButton editor={editor} />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={getButtonClass(false, !editor.can().undo())}
      >
        <MdUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={getButtonClass(false, !editor.can().redo())}
      >
        <MdRedo />
      </button>
    </div>
  );
};
const ImageUploadButton = ({ editor }) => {
  const uploadImage = useCallback(
    async (event) => {
      const file = event.target.files[0]
      if (!file) {
        return
      }

      const newForm = new FormData()
      newForm.append("file", file)
      newForm.append("upload_preset", "bhos-debate-demo")
      const url = URL.createObjectURL(file)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_TEMP}/image/upload`, {
        method: "POST",
        body: newForm,
      });

      const imageURL = await response.json()
      editor.chain().focus().setImage({ src: imageURL.secure_url }).run()

      event.target.value = null
    },
    [editor]
  )
  return (
    <>
      <label
        className="px-2 py-1 rounded-md text-lg transition-colors bg-gray-200 dark:bg-gray-100 text-gray-700 dark:text-gray-500"
      >
        <MdOutlineImage />
        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          style={{ display: "none" }}
        />
      </label>
    </>
  )
}
export default function Tiptap({ title, setTitle, content, setContent, post }) {

  function noOpener(event) {
    if (event.target.tagName === 'A') {
      event.preventDefault()
    }
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        blockquote: false,
        link: false
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Blockquote,
      CodeBlock.configure(),
      Placeholder.configure({placeholder: "Start typing...",}),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    content: ``,
  })
  return (
    <>
      <div className="h-[calc(100vh-100px)] flex flex-col" style={{ margin: "0 auto", padding: 20 }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title goes here..." className="w-auto ml-4 mr-4 mb-4 text-bold font-bold text-2xl text-black border-2 border-gray-500 rounded placeholder-gray-500 dark:text-white dark:border-gray-400 focus:outline-none" type="text" />
        <MenuBar editor={editor} />
        <EditorContent editor={editor} spellCheck={false} className="tiptap blog-post flex-1 flex flex-col overflow-y-auto" />
        <button className="mt-0 h-10 mx-4 rounded font-bold bg-gray-400 dark:bg-gray-100 text-gray-800 dark:text-gray-600" onClick={post}>Post "{title}"</button>
      </div>
    </>
  )
}
