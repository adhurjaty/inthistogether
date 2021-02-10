import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/about-page.scss";

export const PdfPageTemplate = props => {
  const { page } = props;

  return (
    <article className="about">
        <div id="container">
            <div>
                <h1><a href={page.frontmatter.pdf}>{page.frontmatter.pdfLinkText}</a></h1>
            </div>
            <div>
                <img src={page.frontmatter.pdfImg} />
            </div>
        </div>
    </article>
  );
};

const PdfPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
      pdfImg,
      pdfLinkText,
    },
  } = page;

  return (
    <Layout footerData={footerData} navbarData={navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <PdfPageTemplate page={{ ...page, bodyIsMarkdown: false }} />
    </Layout>
  );
};

PdfPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PdfPage;

export const pdfPageQuery = graphql`
  query PdfPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        pdf
        pdfImg
        pdfLinkText
        seo {
          browserTitle
          title
          description
        }
      }
    }
  }
`;
