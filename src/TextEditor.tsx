import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // Import the 'bubble' theme CSS
import "quill/dist/quill.core.css"; // Import the Quill core CSS
import TextEditorToolbar from "./TextEditorToolbar";

const TextEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");

  const quillRef = useRef(null);

  const modules = {
    toolbar: false, // Hide the default toolbar
  };

  const formats = ["bold", "italic"];

  const handleBoldClick = () => {
    const quill = quillRef.current.getEditor();
    quill.format("bold", !quill.getFormat().bold);
  };

  const handleItalicClick = () => {
    const quill = quillRef.current.getEditor();
    quill.format("italic", !quill.getFormat().italic);
  };

  const handleHighlightedClick = () => {
    const quill = quillRef.current.getEditor();
    const hasBackgroundColor = quill.getFormat()?.background;

    if (hasBackgroundColor) {
      quill.format("background", false);
      quill.format("color", false);
    } else {
      quill.format("background", "yellow");
      quill.format("color", "black");
    }
  };

  const handleImageClick = (url) => {
    const quill = quillRef.current.getEditor();
    // const url = prompt("Enter the image URL:");
    if (url) {
      quill.insertEmbed(quill.getSelection(true).index, "image", url);
    }

    // console.log({ change: quill?.editor?.delta, index });
  };

  // Configuration for the Quill editor
  // const modules = {
  //   toolbar: {
  //     container: [
  //       [{ header: "1" }, { header: "2" }],
  //       ["bold", "italic"],
  //       ["link", "image"],
  //     ],
  //   },
  // };

  // Handle changes in the editor's content
  const handleChange = (html) => {
    setEditorHtml((prev) => {
      console.log({ prev, html });
      return html;
    });
    // const change = quillRef.current.getEditor()?.getContents();
    // const editor = quillRef.current.getEditor()?.editor;
    // console.log({ change, html, editor });
  };

  return (
    <div className="text-editor">
      <TextEditorToolbar
        onBoldClick={handleBoldClick}
        onItalicClick={handleItalicClick}
        onImageInputChange={handleImageClick}
        onHighlight={handleHighlightedClick}
      />
      <ReactQuill
        ref={quillRef}
        value={editorHtml}
        onChange={handleChange}
        modules={{ ...modules, toolbar: formats }}
        theme="bubble"
        placeholder="Your message here"
      />
    </div>
  );
};

export default TextEditor;
