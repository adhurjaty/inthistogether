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

export const BTTwitchCommandsTemplate = ({
  title,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="btTwitchCommands">
      <div className="container  btTwitchCommands-container">
        <h1 className="btTwitchCommands-title">{title}</h1>
        {bodyIsMarkdown ? (
          <ReactMarkdown className="btTwitchCommands-description" source={content} />
        ) : (
          <HTMLContent className="btTwitchCommands-description" content={content} />
        )}
      </div>
    </article>
  );
};

BTTwitchCommandsTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  meetups: PropTypes.array,
};

const BTTwitchCommands = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout footerData={data.footerData} navbarData={data.navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
        <script type="text/javascript" src="https://form.jotform.com/jsform/210320791799057"></script>
      </Helmet>
    </Layout>
  );
};

BTTwitchCommands.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BTTwitchCommands;

export const BTTwitchCommandsQuery = graphql`
  query BTTwitchCommands($id: String!) {
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
