import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import domtoimage from 'dom-to-image';
import removeImageBlanks from '../libs/cropImage.js';

export default class TextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty()
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    render() {
        const { editorState } = this.state;
        const stories = [];

        const dataURLtoFile = (dataurl, filename) => {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }

        const submitStory = () => {
            const storyTitle = document.getElementById("title").value;
            this.props.status.stories.concat(stories).forEach(story => {
                if (story.title.split(".png")[0] === storyTitle) {
                    alert(`Story with title ${storyTitle} already exist. Please use another title for the story.`);
                    throw `Story with title ${storyTitle} already exist. Please use another title for the story.`;
                }
            });
            domtoimage.toPng(document.querySelector("div.editorClassName"), { bgcolor: "white" })
                .then((dataUrl) => {
                    const img = new Image();
                    img.src = dataUrl;
                    img.onload = () => {
                        const trimmedImgData = removeImageBlanks(img);
                        const file = dataURLtoFile(trimmedImgData, storyTitle);
                        const formData = new FormData();
                        formData.append("file", file, `${storyTitle}.png`);
                        const xhr = new XMLHttpRequest();
                        xhr.open("POST", "http://localhost:8080/api/story");
                        xhr.send(formData);
                    };
                })
                .then(() => {
                    stories.push({ title: storyTitle });
                    alert("Successfully uploaded story.");
                })
                .catch((error) => {
                    console.error('oops, something went wrong!', error);
                });
        };

        const downloadStory = () => {
            const storyTitle = document.getElementById("title").value;
            domtoimage.toPng(document.querySelector("div.editorClassName"), { bgcolor: "white" })
                .then((dataUrl) => {
                    const img = new Image();
                    img.src = dataUrl;
                    img.onload = function () {
                        // avoid infinite loop
                        this.onload = () => { };
                        const trimmedImgData = removeImageBlanks(img);
                        img.src = trimmedImgData;
                        const a = document.createElement("a");
                        a.href = img.src;
                        a.download = (storyTitle ? storyTitle : "story") + ".png";
                        a.click();
                    };
                })
                .catch((error) => {
                    console.error('oops, something went wrong!', error);
                });
        };

        return (
            <div className="editor-main">
                <button className="download-button" onClick={downloadStory}>Download</button>
                <button className="submit-button" onClick={submitStory}>Submit</button>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}