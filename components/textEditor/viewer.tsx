import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
export default function ContentsViewer({ contents }: { contents: string }) {
  return <Viewer initialValue={contents || ""} />;
}
