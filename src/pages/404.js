import React from "react";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import "../styles/404.scss";

const NotFoundPage = () => (
  <Layout>
    <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SR60NQ9CMJ"></script>
        <script dangerouslySetInnerHTML= {{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-SR60NQ9CMJ');`}} />  
      <title>Page Not Found</title>
    </Helmet>
    <div className="pageNotFound  container">
      <h1 className="pageNotFound-title">NOT FOUND</h1>
      <p className="pageNotFound-description">{`
(___________________________()6 \`-,
(   ______________________   /''"\`
//\\                      //\\
"" ""                     "" ""
      `}</p>
    </div>
  </Layout>
);

export default NotFoundPage;
