import React, { Component } from "react";
import PdfViewer from "./components/PdfViewer";
import SideBar from "./components/Sidebar";
import EmptyPlaceholder from "./components/EmptyPlaceholder";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var fileReader,
  file,
  fileName,
  counter = 1;

let isLargeDevice = true;

if (window.innerWidth > 992 || window.outerWidth > 992) {
  isLargeDevice = true;
} else {
  isLargeDevice = false;
}
export default class componentName extends Component {
  state = {
    fileContent: null,
    upload: false,
    numPages: null,
    pageNumber: 1,
    pdfArr: [],
    showSideBar: false,
    activeId: 1
  };

  //file upload handler
  changeHandler = event => {
    try {
      if (typeof window.FileReader !== "function")
        throw "The file API isn't supported on this browser.";
      let input = event.target;
      if (!input)
        throw "The browser does not properly implement the event object";
      if (!input.files)
        throw "This browser does not support the `files` property of the file input.";
      if (!input.files[0]) return undefined;

      // if file type is not pdf do not accept it
      if (input.files[0].type === "application/pdf") {
        file = event.target.files[0];
        fileName = file.name;
        this.getFile(event);
      } else {
        throw "Please upload pdf files only";
      }
    } catch (error) {
      // show toast
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  // get original file in base64 format
  getFile = () => {
    fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = event => {
      // console.log(event);
      let prevPdfArr = [...this.state.pdfArr];
      let result = event.target.result;
      let title = `Document 0${counter}`;
      prevPdfArr = [
        ...prevPdfArr,
        { name: fileName, fileContent: result, id: counter, title: title }
      ];
      this.setState(
        {
          fileContent: result,
          upload: true,
          pdfArr: prevPdfArr,
          title: title,
          activeId: counter
        },
        () => {
          counter++;
          toast.success(
            "Hey, Cheers! Your file has been uploaded successfully.",
            {
              position: toast.POSITION.TOP_CENTER
            }
          );
          if (!isLargeDevice) {
            this.hideSideBar();
          }
        }
      );
    };
  };

  // show page numbers after doc is uploaded
  onDocumentLoadSuccess = document => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1
    });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  // show selected pdf
  showPdf = id => {
    let arr = this.state.pdfArr;
    let findPdfData = arr.find(item => item.id === id);
    this.setState(
      {
        fileContent: findPdfData.fileContent,
        title: findPdfData.title,
        activeId: id
      },
      () => {
        if (!isLargeDevice) {
          this.hideSideBar();
        }
      }
    );
  };

  toggleSideBar = () => {
    this.setState({
      showSideBar: !this.state.showSideBar
    });
  };

  // hide side bar on click of side content
  hideSideBar = () => {
    this.setState({
      showSideBar: false
    });
  };

  render() {
    const {
      pageNumber,
      numPages,
      fileContent,
      upload,
      pdfArr,
      title,
      showSideBar,
      activeId
    } = this.state;
    let data = {
      pageNumber,
      numPages,
      fileContent,
      title
    };
    // console.log(isLargeDevice);
    return (
      <div className="main-content">
        {!isLargeDevice && (
          <div className="menu" onClick={this.toggleSideBar}>
            <div className="menu_line menu_line_one" />
            <div className="menu_line menu_line_two" />
            <div className="menu_line menu_line_three" />
          </div>
        )}
        <SideBar
          changeHandler={this.changeHandler}
          showPdf={this.showPdf}
          pdfArr={pdfArr}
          showSideBar={showSideBar}
          isLargeDevice={isLargeDevice}
          activeId={activeId}
        />
        <main className="main" onClick={this.hideSideBar}>
          {upload ? (
            <PdfViewer
              data={data}
              onDocumentLoadSuccess={this.onDocumentLoadSuccess}
              previousPage={this.previousPage}
              nextPage={this.nextPage}
            />
          ) : (
            <EmptyPlaceholder />
          )}
        </main>
        <ToastContainer />
      </div>
    );
  }
}
