
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
    `px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
      isActive 
        ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20' 
        : 'text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-600/70 backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50'
    }`;

  if (!editor) return null;

  return (
    <div className="relative">
      {/* Enhanced Toolbar */}
      <div className="flex gap-2 text-sm mb-4 p-3 bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-xl border border-gray-600/50">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={getButtonClass(editor.isActive('bold'))}
          >
            <span className="font-bold">B</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={getButtonClass(editor.isActive('italic'))}
          >
            <span className="italic">I</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={getButtonClass(editor.isActive('underline'))}
          >
            <span className="underline">U</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={getButtonClass(editor.isActive('bulletList'))}
          >
            <span className="text-lg">•</span>
          </button>
        </div>
        <div className="ml-auto flex items-center">
          <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30">
            Rich Text Editor
          </div>
        </div>
      </div>

      {/* Enhanced Editor Content */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
        <div className="relative bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm text-white rounded-xl border border-gray-600/50 focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-300">
          <EditorContent
            editor={editor}
            className="w-full min-h-[150px] max-h-[300px] overflow-y-auto p-4 outline-none text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;