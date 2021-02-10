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

export const RedirectTemplate = ({
  title,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="btExplorers">
      <div className="container  btExplorers-container">
        <h1 className="btExplorers-title">{title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="btExplorers-description" source={content} />
        ) : (
          <HTMLContent className="btExplorers-description" content={content} />
        )}
      </div>
    </article>
  );
};

RedirectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};

const Redirect = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
    redirect_url
  } = page;

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
        <meta
            http-equiv="refresh"
            content={`0;url=${redirect_url}`}
        />
      </Helmet>
    </Layout>
  );
};

Redirect.propTypes = {
  data: PropTypes.object.isRequired,
  redirect_url: PropTypes.string.isRequired,
};

export default Redirect;

export const RedirectQuery = graphql`
  query Redirect($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        redirect_url
        seo {
          browserTitle
          title
          description
        }
      }
    }
  }
`;
