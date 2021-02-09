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

export const BTExplorersTemplate = ({
  title,
  content,
  bodyIsMarkdown = false,
}) => {
  return (
    <article className="btExplorers">
      <div className="container  btExplorers-container">
        <h1 className="btExplorers-title">{title}</h1>
        {/* {bodyIsMarkdown ? (
          <ReactMarkdown className="btExplorers-description" source={content} />
        ) : (
          <HTMLContent className="btExplorers-description" content={content} />
        )} */}
        <h1>Testing</h1>
        <a data-pin-do="embedBoard" data-pin-board-width="800" data-pin-scale-height="800" data-pin-scale-width="80" href="https://www.pinterest.com/inthistogetherevents/explorers/"></a>
      </div>
    </article>
    <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
  );
};

BTExplorersTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  meetups: PropTypes.array,
};

const BTExplorers = ({ data }) => {
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
      </Helmet>
    </Layout>
  );
};

BTExplorers.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BTExplorers;

export const BTExplorersQuery = graphql`
  query BTExplorers($id: String!) {
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
