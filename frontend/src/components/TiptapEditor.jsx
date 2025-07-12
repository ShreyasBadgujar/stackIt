import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import Placeholder from '@tiptap/extension-placeholder';

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        listItem: false,
        underline: false,
      }),
      Underline,
      BulletList,
      ListItem,
      Placeholder.configure({
        placeholder: 'Describe your problem in detail...',
        emptyEditorClass:
          'text-gray-400 before:content-[attr(data-placeholder)] before:pointer-events-none before:h-0 before:float-left',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const getButtonClass = (isActive) =>
    `px-2 py-1 rounded font-medium ${
      isActive ? 'text-white bg-gray-600' : 'text-gray-400 hover:text-white'
    }`;

  if (!editor) return null;

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="flex gap-2 text-sm mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getButtonClass(editor.isActive('bold'))}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getButtonClass(editor.isActive('italic'))}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={getButtonClass(editor.isActive('underline'))}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={getButtonClass(editor.isActive('bulletList'))}
        >
          •
        </button>
        {/* <div className="ml-auto text-xs text-gray-400">Rich Text Editor</div> */}
      </div>

      {/* Editor content */}
      <div className="bg-gray-700 text-white rounded-lg border border-gray-600 focus-within:border-blue-500">
        <EditorContent
          editor={editor}
          className="w-full min-h-[150px] max-h-[300px] overflow-y-auto p-4 outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
