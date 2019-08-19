import React from "react";
import PropTypes from "prop-types";
import favicon from "./static/images/gatsby-icon.png";

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossOrigin="anonymous"
          />
          <link rel="shortcut icon" href={favicon} />
          <script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0/dist/smooth-scroll.polyfills.min.js" />
          <script
            type="text/javascript"
            src="node_modules/auth0-js/build/auth0.js"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/alertifyjs@1.11.2/build/css/alertify.min.css"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/alertifyjs@1.11.2/build/css/themes/bootstrap.rtl.min.css"
          />
          <script src="//cdn.jsdelivr.net/npm/alertifyjs@1.11.2/build/alertify.min.js" />
          <link
            rel="stylesheet"
            type="text/css"
            href="./static/styles/style.css"
          />
          <base href="/" target="_blank" />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          {this.props.preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
};
