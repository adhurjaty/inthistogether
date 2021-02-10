import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isBefore from "date-fns/is_before";
import endOfDay from "date-fns/end_of_day"
import ReactMarkdown from "react-markdown";

import MeetupTemplate from "./meetup";
import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/past-meetups-page.scss";

export const NiceListTemplate = ({
  title,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="niceList">
      <div className="container  niceList-container">
        <h1 className="niceList-title">{title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="niceList-description" source={content} />
        ) : (
          <HTMLContent className="niceList-description" content={content} />
        )}
      </div>
    </article>
  );
};

NiceListTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  meetups: PropTypes.array,
};

const NiceList = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData}>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SR60NQ9CMJ"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SR60NQ9CMJ');
        </script>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
        <script type="text/javascript" src="https://form.jotform.com/jsform/203287743361053"></script>
      </Helmet>
    </Layout>
  );
};

NiceList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NiceList;

export const NiceListQuery = graphql`
  query NiceList($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
      }
    }
  }
`;
