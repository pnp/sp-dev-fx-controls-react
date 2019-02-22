

export interface IRichTextEditorProps {
  value?: string;

  editorChanged: (content: string) => void;
}
