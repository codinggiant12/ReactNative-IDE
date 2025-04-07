// export const convertToReactJS = (input) => {
//   let output = input;

//   // Define the mapping of React Native elements to ReactJS/HTML equivalents
//   const tags = {
//     View: "div",
//     Text: "span", // Or 'p' depending on how you want the text
//     Image: "img",
//     ScrollView: "div", // With overflow:auto for scrollable content
//     TextInput: "input[type='text']",
//     Button: "button",
//     TouchableOpacity: "button", // Can also be a div with a click handler and opacity style
//     TouchableHighlight: "button", // Or div with a click handler and highlight effect
//     FlatList: "ul > li", // With dynamic rendering and mapping
//     SectionList: "ul > li", // With dynamic rendering and grouping sections
//     Modal: "dialog", // Or a custom modal component
//     Picker: "select > option", // Standard dropdown
//     Switch: "input[type='checkbox']", // Styled as a toggle switch
//     ActivityIndicator: "spinner", // Using CSS animations or a third-party spinner library
//   };

//   // 1. Replace React Native components with corresponding HTML/JSX elements
//   Object.keys(tags).forEach((rnElement) => {
//     const htmlElement = tags[rnElement];

//     // Special case for Button (handle title and other props like onPress)
//     if (rnElement === "Button") {
//       const regex = /<Button([^>]*)title="([^"]*)"([^\/]*)\/>/g;
//       output = output.replace(regex, (match, attrs, title, rest) => {
//         // Convert Button to <button> with title as inner text
//         return `<button${attrs}>${title}</button>`;
//       });
//     }
//     // Special case for Image (handle the 'source' prop)
//     else if (rnElement === "Image") {
//       const regex = /<Image([^>]*)source=\{([^}]+)\}([^\/]*)\/>/g;
//       output = output.replace(regex, (match, attrs, source, rest) => {
//         // Convert Image to <img> with src prop (assume source is an object with uri)
//         const srcMatch = /uri:\s*"([^"]+)"/.exec(source);
//         const src = srcMatch ? srcMatch[1] : "";
//         return `<img src="${src}"${attrs} />`;
//       });
//     }
//     // General case for other tags like View, Text, etc.
//     else {
//       const openTagRegex = new RegExp(`<${rnElement}(.*?)>`, "g");
//       const closeTagRegex = new RegExp(`</${rnElement}>`, "g");

//       // Convert the opening and closing tags
//       output = output.replace(openTagRegex, `<${htmlElement}$1>`);
//       output = output.replace(closeTagRegex, `</${htmlElement}>`);
//     }
//   });

//   // 2. Convert onPress to onClick (for ReactJS compatibility)
//   const onPressRegex = /onPress=(["'])(.*?)\1/g;

//   // Replace onPress with onClick
//   output = output.replace(onPressRegex, (match, quote, action) => {
//     return `onClick=${quote}${action}${quote}`;
//   });

//   // Fix for cases where TouchableOpacity has onPress (in addition to onClick)
//   // We capture both direct onPress and nested onPress event handlers
//   const onPressTouchableRegex = /onPress=(["'])(.*?)\1/g;

//   // Replace all instances of onPress (including nested cases)
//   output = output.replace(onPressTouchableRegex, (match, quote, action) => {
//     return `onClick=${quote}${action}${quote}`;
//   });

//   return output;
// };

// // export const convertToReactJS = (reactNativeCode) => {
// //   const myArray = reactNativeCode.split(" ");

// //   // console.log("reactNativeCode", myArray);
// //   // console.log("tags", tags);
// //   let reactJSCode = reactNativeCode
// //     .replace(
// //       /import \{ View, Text, Button \} from 'react-native';/g,
// //       "import React from 'react';"
// //     )
// //     .replace(/import \{ StyleSheet \} from 'react-native';/g, "")
// //     .replace(/View/g, "div")
// //     .replace(/Text/g, "div")
// //     .replace(/Button/g, "button")
// //     .replace(/title/g, "value");

// //   reactJSCode = reactJSCode.replace(
// //     /StyleSheet.create\((.*?)\);/g,
// //     (match, p1) => {
// //       const stylesObject = p1.trim();
// //       const convertedStyles = stylesObject
// //         .replace(/flex: 1/g, "display: flex")
// //         .replace(/justifyContent: 'center'/g, "justify-content: center")
// //         .replace(/alignItems: 'center'/g, "align-items: center")
// //         .replace(/style/g, "style");

// //       return `const styles = ${convertedStyles};`;
// //     }
// //   );

// //   return reactJSCode;
// // };
export const convertToReactJS = (input) => {
  let output = input;

  // Define the mapping of React Native elements to ReactJS/HTML equivalents
  const tags = {
    View: "div",
    Text: "span", // Or 'p' depending on how you want the text
    Image: "img",
    ScrollView: "div", // With overflow:auto for scrollable content
    TextInput: "input", // Fixed input[type='text']
    Button: "button",
    TouchableOpacity: "button",
    TouchableHighlight: "button",
    FlatList: "ul", // Will need mapping logic separately
    SectionList: "ul",
    Modal: "dialog",
    Picker: "select",
    Switch: "input[type='checkbox']",
    ActivityIndicator: "div", // Can be replaced with a spinner component
  };

  // 1. Replace React Native components with corresponding HTML/JSX elements
  Object.keys(tags).forEach((rnElement) => {
    const htmlElement = tags[rnElement];

    // Handle special cases for self-closing tags
    if (rnElement === "Image") {
      const regex = new RegExp(
        `<${rnElement}([^>]*)source=\\{([^}]+)\\}([^/]*)/?>`,
        "g"
      );
      output = output.replace(
        regex,
        (match, attrsBefore, source, attrsAfter) => {
          const srcMatch = /uri:\s*"([^"]+)"/.exec(source);
          const src = srcMatch ? srcMatch[1] : "";
          return `<img src="${src}" ${attrsBefore} ${attrsAfter} />`;
        }
      );
    }
    // Handle buttons separately (preserve attributes and convert title)
    else if (rnElement === "Button") {
      const regex = /<Button([^>]*)title="([^"]*)"([^\/]*)\/?>/g;
      output = output.replace(
        regex,
        (match, attrsBefore, title, attrsAfter) => {
          return `<button${attrsBefore} ${attrsAfter}>${title}</button>`;
        }
      );
    }
    // General case for replacing React Native components
    else {
      const openTagRegex = new RegExp(`<${rnElement}([^>]*)>`, "g");
      const closeTagRegex = new RegExp(`</${rnElement}>`, "g");

      // Convert the opening and closing tags while keeping attributes intact
      output = output.replace(openTagRegex, `<${htmlElement}$1>`);
      output = output.replace(closeTagRegex, `</${htmlElement}>`);
    }
  });

  // 2. Convert `onPress` to `onClick` while **preserving existing attributes**
  // output = output.replace(/onPress\s*=\s*{(.*?)}/g, `onClick={$1}`);

  output = output.replace(/onPress\s*=\s*\{([^}]*)\}/g, (match, fnBody) => {
    return `onClick={() => {${fnBody.trim()}}}`;
  });

  // 3. Convert `style=` to `className=` (for better ReactJS compatibility)
  output = output.replace(/style\s*=\s*\{(.*?)\}/g, `className={$1}`);

  return output;
};

export const convertCSS = (css) => {
  console.log(css);

  const styleTag = document.createElement("style");
  styleTag.id = "scoped-container";
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);
};

export const convertjs = (jscode) => {
  const scriptTag = document.createElement("script");

  scriptTag.innerHTML = `${jscode}`;
  document.head.appendChild(scriptTag);
};
