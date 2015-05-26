import React, { Component, PropTypes } from "react";

// import NavBar from "../components/NavBar";
// import Footer from "../components/Footer";

// if (process.env.BROWSER) {
//   require("../style/Page.scss");
// }

class Page extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    // const { footer } = this.props;

     // <div className="Page">
     //    <div className="Page-header">
     //      <NavBar />
     //    </div>

     //    <div className="Page-body">
     //      { this.props.children }
     //    </div>

     //    { footer &&
     //      <div className="Page-footer">
     //        <Footer />
     //      </div> }

     //  </div>
    return (
      <div className="Page">
        { this.props.children }
      </div>
    );
  }

}

export default Page;
