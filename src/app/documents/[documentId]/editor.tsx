'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { useEditorStore } from '@/store/use-editor-store';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import { LineHeightExtension } from '@/extensions/line-height';
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import {Ruler} from './ruler'
import { useStorage } from '@liveblocks/react';
import { Threads } from './threads';
export const Editor = () => {
  const { setEditor } = useEditorStore();
  const leftMargin = useStorage(root => root.leftMargin);
  const rightMargin = useStorage(root => root.rightMargin);
  const liveblocks = useLiveblocksExtension()

  const editor = useEditor({
    immediatelyRender : false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          'focuse:outline-none print:border-0 border bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
        style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px`,
      },
    },
    extensions: [
      StarterKit.configure({
        history : false
      }),
      TaskList,
      Table,
      liveblocks,
      TableCell,
      TableHeader,
      LineHeightExtension.configure({
        types : ["heading", "paragraph"],
        defaultLineHeight : "normal",
      }),
      Image,
      ImageResize,
      TextAlign.configure({
        types : ["heading", "paragraph"]
      }),
      Underline,
      TextStyle,
      Highlight.configure({multicolor : true}),
      TableRow,
      Link.configure({
        openOnClick : false,
        autolink : true,
        defaultProtocol : "https"
      }),
      Color,
      FontFamily,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: ``,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FDFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler/>
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 ">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};
