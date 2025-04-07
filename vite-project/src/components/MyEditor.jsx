import React, { useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import tags from '../data/tags';

const MyEditor = ({ data, type }) => {
  const editorRef = useRef(null);

  const userReactNativeCode = `
     <View class="center">
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Hello React Native 👋</Text>
      <Button title="Click Me" />
    </View>
  `;
  const userReactNativeJSCode = `
 console.log("js code")
`
  const css = `.center {
    width:230px;
     display:flex;
     flex-direction: column;
     justify-content:center;
     align-items:center;
     height:400px;
  }`;
  const [jscode, setJsCode] = useState(userReactNativeJSCode);
  const [code, setCode] = useState(userReactNativeCode);
  const [csscode, setCsscode] = useState(css);
  const [flag, setFlag] = useState(false);

  const options = {
    selectOnLineNumbers: true,
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true,
  };

  const handleEditorChange = (newValue) => {
    if (type === 'css') {
      setCsscode(newValue);
    } else if (type === 'Structure') {
      setCode(newValue);

      if (newValue === '<') setFlag(true);

      if (flag) {
        if (newValue !== '<') {
          console.log(newValue);
        }
        if (newValue === '>') {
          setFlag(false);
        }
      }
    }
    else {
      setJsCode(newValue)
    }
  };

  const getLanguage = () => {
    if (type === 'css') return 'css';
    else if (type === 'js') return 'js';
    return 'Structure';
  };




  return (
    <div className="h-100 w-[65%]  bg-[#1e1e1e]">
      <MonacoEditor
        height="155%"
        language={getLanguage()}
        value={
          type === 'css'
            ? csscode
            : type === 'js'
              ? jscode
              : code
        }

        options={options}
        onChange={handleEditorChange}
        editorDidMount={(editor, monaco) => {
          editorRef.current = editor;
        }}
      />
      <div className="flex justify-end my-2 mr-5">
        <button
          onClick={() => data(code, csscode, jscode)}
          className="border px-2 rounded bg-blue-400 hover:bg-blue-300"
        >
          Run Code
        </button>
      </div>
    </div>
  );
};

export default MyEditor;
