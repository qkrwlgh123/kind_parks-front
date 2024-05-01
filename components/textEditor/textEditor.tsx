import { Editor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useRef } from "react";

export default function EditorBox({ setInputedText }: { setInputedText: any }) {
  //@ts-ignore
  const editorRef = useRef();
  const handleTextInput = () => {
    //@ts-ignore
    const data = editorRef.current!.getInstance().getHTML();
    setInputedText(data);
  };
  return (
    <div className="edit_wrap">
      <Editor
        initialValue=" "
        previewStyle="vertical"
        height="800px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language="ko-KR"
        //@ts-ignore
        ref={editorRef}
        hideModeSwitch={true}
        onChange={handleTextInput}
        plugins={[fontSize, colorSyntax]}
      />
    </div>
  );
}
