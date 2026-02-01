'use client';

import { useEffect, useMemo } from 'react';
import type { ComponentType } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Bold, Code, Heading2, Italic, Link as LinkIcon, List, ListOrdered, Quote, Redo2, Strikethrough, Undo2 } from 'lucide-react';

import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useTranslate } from '../i18n';

interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface ToolbarButtonConfig {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  icon: ComponentType<{ className?: string }>;
  disabled?: boolean;
}

const emptyContent = ''; // helper to keep consistent empty state

export function RichTextEditor({
  id,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  className
}: RichTextEditorProps) {
  const t = useTranslate();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer nofollow',
          target: '_blank'
        }
      }),
      Placeholder.configure({
        placeholder: placeholder ?? t('richText.placeholder', 'Write the content...')
      })
    ],
    content: value || emptyContent,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const isEmpty = editor.isEmpty || !editor.getText().trim();
      onChange(isEmpty ? emptyContent : editor.getHTML());
    }
  });

  useEffect(() => {
    if (!editor) return;
    const normalizedValue = value || emptyContent;
    const current = editor.isEmpty ? emptyContent : editor.getHTML();
    if (current !== normalizedValue) {
      editor.commands.setContent(normalizedValue || emptyContent, false);
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor || !onBlur) return;
    const handler = () => onBlur();
    editor.on('blur', handler);
    return () => {
      editor.off('blur', handler);
    };
  }, [editor, onBlur]);

  const toolbarButtons = useMemo<ToolbarButtonConfig[]>(
    () => [
      {
        label: t('richText.bold', 'Bold'),
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive('bold'),
        disabled: !editor?.can().chain().focus().toggleBold().run()
      },
      {
        label: t('richText.italic', 'Italic'),
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive('italic'),
        disabled: !editor?.can().chain().focus().toggleItalic().run()
      },
      {
        label: t('richText.strikethrough', 'Strikethrough'),
        icon: Strikethrough,
        onClick: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive('strike'),
        disabled: !editor?.can().chain().focus().toggleStrike().run()
      },
      {
        label: t('richText.heading', 'Heading'),
        icon: Heading2,
        onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor?.isActive('heading', { level: 2 }),
        disabled: !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
      },
      {
        label: t('richText.bulletList', 'Bullet list'),
        icon: List,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive('bulletList'),
        disabled: !editor?.can().chain().focus().toggleBulletList().run()
      },
      {
        label: t('richText.orderedList', 'Ordered list'),
        icon: ListOrdered,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive('orderedList'),
        disabled: !editor?.can().chain().focus().toggleOrderedList().run()
      },
      {
        label: t('richText.blockquote', 'Quote'),
        icon: Quote,
        onClick: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive('blockquote'),
        disabled: !editor?.can().chain().focus().toggleBlockquote().run()
      },
      {
        label: t('richText.code', 'Code block'),
        icon: Code,
        onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
        isActive: editor?.isActive('codeBlock'),
        disabled: !editor?.can().chain().focus().toggleCodeBlock().run()
      },
      {
        label: t('richText.insertLink', 'Insert link'),
        icon: LinkIcon,
        onClick: () => {
          if (!editor) return;
          const previousUrl = editor.getAttributes('link').href as string | undefined;
          const url = window.prompt(t('richText.linkPrompt', 'Enter the URL'), previousUrl ?? '');
          if (url === null) {
            return;
          }
          if (url.trim() === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
        },
        isActive: editor?.isActive('link'),
        disabled: !editor
      }
    ],
    [editor, t]
  );

  const historyButtons = useMemo<ToolbarButtonConfig[]>(
    () => [
      {
        label: t('richText.undo', 'Undo'),
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
        disabled: !editor?.can().chain().focus().undo().run()
      },
      {
        label: t('richText.redo', 'Redo'),
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
        disabled: !editor?.can().chain().focus().redo().run()
      }
    ],
    [editor, t]
  );

  return (
    <div className={cn('rounded-md border border-input bg-background text-sm shadow-sm', className, disabled && 'opacity-70')}> 
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 p-2">
        {toolbarButtons.map((button) => (
          <ToolbarButton
            key={button.label}
            {...button}
            disabled={disabled || button.disabled}
          />
        ))}
        <div className="ml-auto flex items-center gap-2">
          {historyButtons.map((button) => (
            <ToolbarButton
              key={button.label}
              {...button}
              disabled={disabled || button.disabled}
            />
          ))}
        </div>
      </div>
      <EditorContent
        editor={editor}
        id={id}
        className={cn('tiptap px-3 py-2', disabled && 'pointer-events-none')}
      />
    </div>
  );
}

function ToolbarButton({ label, icon: Icon, isActive, onClick, disabled }: ToolbarButtonConfig) {
  return (
    <Button
      type="button"
      variant={isActive ? 'default' : 'outline'}
      size="sm"
      className="h-9 w-9 p-0"
      aria-label={label}
      aria-pressed={isActive}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
