import React, { useState, useEffect } from 'react';
import MyMonacoEditor from '../src/components/MyEditor';
import Output from './components/Output';
import { convertToReactJS } from './functions.js';
import { convertCSS } from './functions.js';
import { convertjs } from './functions.js';
import ReactNativeToHtmlConverter from './components/ReactNativeToHtmlConverter.jsx';
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';

const App = () => {
  const [editorCode, setEditorCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jscode, setJscode] = useState('')
  const [reactJSCode, setReactJSCode] = useState(null);

  // Callback function passed to child to get both code + css
  const handleEditorData = (code, css, js) => {
    setEditorCode(code);
    setCssCode(css);
    setJscode(js)
    console.log('JSX Code:', js);

  };

  // Convert to ReactJS whenever editorCode changes
  useEffect(() => {
    if (editorCode) {
      const convertedCode = convertToReactJS(editorCode);
      setReactJSCode(convertedCode);
      console.log('Converted ReactJS Code:', convertedCode);
    }
    if (cssCode) {
      // console.log('CSS Code:', cssCode);
      convertCSS(cssCode);

    }
    if (jscode) {
      convertjs(jscode)
    }
  }, [editorCode], [cssCode], [jscode]);

  // Render dynamic component from generated ReactJS code
  const renderDynamicComponent = () => {
    try {
      if (reactJSCode) {
        const codeWithoutImports = reactJSCode.replace(/^import .*;?/gm, '');
        const DynamicComponent = new Function('React', `
          return function() {
            return (${codeWithoutImports});
          }
        `)(React);
        return <DynamicComponent />;
      }
    } catch (error) {
      console.error("Error rendering dynamic component:", error);
    }
    return null;
  };

  return (
    <div className='h-dvh w-full pt-4'>
      <Header />
      <Content Data={handleEditorData} reactcode={reactJSCode} />

      {/* Render the dynamic component output */}
      <div className='p-4 border-t mt-4'>
        <h2 className='text-lg font-semibold text-white mb-2'>Preview</h2>
        <div className='p-4 bg-gray-100 rounded'>
          {renderDynamicComponent()}
        </div>
      </div>

      {/* Optionally include inline styles */}
      {cssCode && (
        <style>{cssCode}</style>
      )}
    </div>
  );
};

export default App;
