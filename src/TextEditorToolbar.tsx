import { useRef } from "react";

const TextEditorToolbar = ({
  onBoldClick,
  onItalicClick,
  onImageInputChange,
  onHighlight,
}) => {
  const imageInput = useRef(null);

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        onImageInputChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="text-editor-toolbar"
      style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
    >
      <button onClick={onBoldClick} className="toolbar-button">
        Bold
      </button>
      <button onClick={onItalicClick} className="toolbar-button">
        Italic
      </button>
      <button
        className="toolbar-button"
        onClick={() => {
          imageInput.current.click();
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageInputChange}
          className="image-input"
          style={{ display: "none" }}
          ref={imageInput}
        />
        Image
      </button>
      <button className="toolbar-button" onClick={onHighlight}>
        High
      </button>
    </div>
  );
};

export default TextEditorToolbar;
