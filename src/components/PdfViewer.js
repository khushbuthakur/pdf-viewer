import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import File from "./icons/File";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const PdfViewer = props => {
  const { pageNumber, numPages, fileContent, title } = props.data;
  return (
    <div className="pdf-container">
      <h3 className="pdf-main-title">
        <File />
        {title}
      </h3>
      <Document
        file={fileContent}
        onLoadSuccess={props.onDocumentLoadSuccess}
        loading={<div className="skeleton" />}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages !== 1 && (
        <div className="btn-container">
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            className="button"
            type="button"
            disabled={pageNumber <= 1}
            onClick={props.previousPage}
          >
            Previous
          </button>
          <button
            className="button"
            type="button"
            disabled={pageNumber >= numPages}
            onClick={props.nextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
