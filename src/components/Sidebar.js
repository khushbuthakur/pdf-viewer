import React from "react";

import File from "./icons/File";
import FileUpload from "./icons/FileUpload";
import Book from "./icons/Book";
const SideBar = props => {
  return (
    <aside className="sidebar">
      <h2 className="title">
        <Book /> Reader Zone
      </h2>
      <h4 className="file-title">Files</h4>
      <ul className="pdf-list">
        {props.pdfArr.map(item => (
          <li
            key={item.id}
            onClick={() => {
              props.showPdf(item.id);
            }}
            className="list-items"
          >
            <File setClass={true} />
            <div className="file-name">
              <h4 className="left">{item.title}</h4>
              <h5 className="left"> {item.name}</h5>
            </div>
          </li>
        ))}
      </ul>

      <label className="file-upload" htmlFor="file-upload">
        <div className="input-file">
          <FileUpload /> Upload Files
        </div>
        <input
          type="file"
          id="file-upload"
          type="file"
          onChange={props.changeHandler}
          accept="application/pdf"
        />
      </label>
    </aside>
  );
};

export default SideBar;
