import React, { useState } from "react";
import tags from "../data/tags";

// const convertReactNativeToHtml = (input) => {
//     let output = input;
//     Object.keys(tags).forEach((rnElement) => {
//         const htmlElement = tags[rnElement];
//         const regex = new RegExp(`<${rnElement}(.*?)>`, "g");
//         output = output.replace(regex, `<${htmlElement}$1>`);
//         output = output.replace(
//             new RegExp(`</${rnElement}>`, "g"),
//             `</${htmlElement}>`
//         );
//     });
//     return output;
// };
const convertReactNativeToReactJS = (input) => {
    let output = input;

    // Define the mapping of React Native elements to ReactJS/HTML equivalents
    const tags = {
        View: "div",
        Text: "span", // Or 'p' depending on how you want the text
        Image: "img",
        ScrollView: "div", // With overflow:auto for scrollable content
        TextInput: "input[type='text']",
        Button: "button",
        TouchableOpacity: "button", // Can also be a div with a click handler and opacity style
        TouchableHighlight: "button", // Or div with a click handler and highlight effect
        FlatList: "ul", // For lists rendered with dynamic children
        SectionList: "ul", // For lists rendered with dynamic children and sections
        Modal: "dialog", // Or a custom modal component
        Picker: "select", // Standard dropdown, the options go inside <select>
        Switch: "input[type='checkbox']", // Styled as a toggle switch
        ActivityIndicator: "div", // Using CSS animations or a third-party spinner library
        ImageBackground: "div", // Can be replaced by a div with background-image
        SafeAreaView: "div", // Typically used for safe margins in iOS, but it's just a div on web
        StatusBar: "div", // Can be treated as a placeholder for styling
    };

    // 1. Replace React Native components with corresponding HTML/JSX elements
    Object.keys(tags).forEach((rnElement) => {
        const htmlElement = tags[rnElement];

        // Special case for Button (handle title and other props like onPress)
        if (rnElement === 'Button') {
            const regex = /<Button([^>]*)title="([^"]*)"([^\/]*)\/>/g;
            output = output.replace(regex, (match, attrs, title, rest) => {
                // Convert Button to <button> with title as inner text
                return `<button${attrs}>${title}</button>`;
            });
        }
        // Special case for Image (handle the 'source' prop)
        else if (rnElement === 'Image') {
            const regex = /<Image([^>]*)source=\{([^}]+)\}([^\/]*)\/>/g;
            output = output.replace(regex, (match, attrs, source, rest) => {
                // Convert Image to <img> with src prop (assume source is an object with uri)
                const srcMatch = /uri:\s*"([^"]+)"/.exec(source);
                const src = srcMatch ? srcMatch[1] : '';
                return `<img src="${src}"${attrs} />`;
            });
        }
        // Special case for FlatList and SectionList
        else if (rnElement === 'FlatList' || rnElement === 'SectionList') {
            const regex = new RegExp(`<${rnElement}([^>]*)>(.*?)</${rnElement}>`, 'gs');
            output = output.replace(regex, (match, attrs, children) => {
                // Convert FlatList or SectionList to <ul> or <ol> with dynamic rendering
                return `<ul${attrs}>${children}</ul>`;
            });
        }
        // Special case for Picker (handle options inside the select)
        else if (rnElement === 'Picker') {
            const regex = /<Picker([^>]*)>(.*?)<\/Picker>/g;
            output = output.replace(regex, (match, attrs, children) => {
                // Convert Picker to <select> tag with corresponding attributes
                // Replace <Picker.Item> with <option> tags
                const optionRegex = /<Picker\.Item([^>]*)label="([^"]*)" value="([^"]*)"\/>/g;
                const options = children.replace(optionRegex, (itemMatch, itemAttrs, label, value) => {
                    return `<option value="${value}"${itemAttrs}>${label}</option>`;
                });
                return `<select${attrs}>${options}</select>`;
            });
        }




        // General case for other tags like View, Text, etc.
        else {
            const openTagRegex = new RegExp(`<${rnElement}(.*?)>`, "g");
            const closeTagRegex = new RegExp(`</${rnElement}>`, "g");

            // Convert the opening and closing tags
            output = output.replace(openTagRegex, `<${htmlElement}$1>`);
            output = output.replace(closeTagRegex, `</${htmlElement}>`);
        }
    });

    // 2. Convert onPress to onClick (for ReactJS compatibility)
    const onPressRegex = /onPress=(["'])(.*?)\1/g;

    // Replace onPress with onClick
    output = output.replace(onPressRegex, (match, quote, action) => {
        return `onClick=${quote}${action}${quote}`;
    });

    // Fix for cases where TouchableOpacity has onPress (in addition to onClick)
    // We capture both direct onPress and nested onPress event handlers
    const onPressTouchableRegex = /onPress=(["'])(.*?)\1/g;

    // Replace all instances of onPress (including nested cases)
    output = output.replace(onPressTouchableRegex, (match, quote, action) => {
        return `onClick=${quote}${action}${quote}`;
    });

    return output;
};




export default function ReactNativeToHtmlConverter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleChange = (event) => {
        const userInput = event.target.value;
        setInput(userInput);
        setOutput(convertReactNativeToReactJS(userInput));
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">React Native to HTML Converter</h1>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Enter React Native JSX"
                className="w-full p-2 border rounded"
            />
            <div className="mt-4 p-2 border rounded bg-gray-100">
                <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
        </div>
    );
}
