import React from "react";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import styled from "styled-components";

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const Editor = ({ onChange, name, value }) => {
  
  return (
    <Wrapper>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        }}
        config={{
          // plugins: [Superscript],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "undo",
            "redo",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "link",
            "imageUpload",
            "|",
            "superscript",
            "subscript"
          ],
          link: {
            decorators: {
              addTargetToExternalLinks: {
                mode: "automatic",
                callback: (url) => /^(https?:)?\/\//.test(url),
                attributes: {
                  target: "_blank",
                },
              },
            },
          },
        }}
      />
    </Wrapper>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;
