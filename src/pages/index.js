import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import isAfter from "date-fns/is_after";

import Layout from "../components/Layout";
import Map from "../components/Map";
import HeadshotPlaceholder from "../img/headshot-placeholder.svg";
import CustomLink from "../components/CustomLink";
import "../styles/home.scss";

export const HomePageTemplate = ({ home, upcomingEvent: upcomingEvent = null }) => {
  const presenters = upcomingEvent && upcomingEvent.showPresenters && upcomingEvent.presenters;
  const eventImg = upcomingEvent && upcomingEvent.eventImg
  const latitude = upcomingEvent && !upcomingEvent.virtual && parseFloat(upcomingEvent.location.mapsLatitude);
  const longitude = upcomingEvent && !upcomingEvent.virtual && parseFloat(upcomingEvent.location.mapsLongitude);
  const location_name = upcomingEvent && (upcomingEvent.virtual ? ("Virtual Event (".concat(upcomingEvent.stream.streamProvider, ")")) : (upcomingEvent.location.name));
  return (
    <>
      <section className="header">
        <div className="header-container  container">
          {home.headerImage && <img className="header-image" src={home.headerImage.image} alt={home.headerImage.imageAlt} />}
          {/* <h3 className="header-tagline">
            <span className="header-taglinePart">{home.title}</span>
          </h3> */}
        </div>
      </section>
      <section className="upcomingEvent  section">
        <div className="upcomingEvent-container  container">
          <h2 className="upcomingEvent-heading">{home.upcomingEventHeading}</h2>
          {upcomingEvent ? (
            <>
              <h3 className="upcomingEvent-title">{upcomingEvent.title}</h3>
              <p className="upcomingEvent-detail  upcomingEvent-detail--date">
                <span className="upcomingEvent-detailLabel">Date: </span>
                {upcomingEvent.formattedDate}
              </p>
              <p className="upcomingEvent-detail  upcomingEvent-detail--location">
                <span className="upcomingEvent-detailLabel">Location: </span>
                { upcomingEvent.virtual ? (
                  <a className="upcomingEvent-streamLink" href={upcomingEvent.stream.streamLink}>
                      {location_name}
                  </a> ) : (upcomingEvent.location.name)
                }
              </p>
              {presenters.length > 0 && (
                <div className="upcomingEvent-presenters">
                  {presenters.map(presenter => (
                    <div className="upcomingEvent-presenter" key={presenter.text}>
                      <img
                        className="upcomingEvent-presenterImage"
                        src={presenter.image ? presenter.image : HeadshotPlaceholder}
                        alt={presenter.image ? presenter.name : "Default headshot placeholder"}
                      />
                      <span className="upcomingEvent-presenterName">{presenter.name}</span>
                      <span className="upcomingEvent-presenterPresentationTitle">
                        {presenter.presentationTitle}
                      </span>
                      <p className="upcomingEvent-presenterDescription">{presenter.text}</p>
                    </div>
                  ))}
                </div>
              )}
              <img className="upcomingEvent-eventImg" 
                   src={eventImg} />
              { !upcomingEvent.virtual && (
              <>
                <p className="upcomingEvent-mapNote">{home.mapsNote}</p>
                <div className="upcomingEvent-mapWrapper">
                    <Map
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTxauB_VWpo0_8hWELlE3pN59uuHzxD-8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    link={upcomingEvent.location.mapsLink}
                    latitude={latitude}
                    longitude={longitude}
                    />
                </div>
              </>
              )}
            </>
          ) : (
            <a className="normal-link" 
                href={home.noUpcomingEventLink}>
                {home.noUpcomingEventText}
            </a>
          )}
        </div>
      </section>
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;
    let upcomingEvent = null;
    // Find the next event that is closest to today
    data.allMarkdownRemark.edges.every(item => {
      const { frontmatter: djEvent } = item.node;
      if (isAfter(djEvent.rawDate, new Date())) {
        upcomingEvent = djEvent;
        return true;
      } else {
        return false;
      }
    });
    return (
      <Layout footerData={footerData} navbarData={navbarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} upcomingEvent={upcomingEvent} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { presenters: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
            rawDate: date
            eventImg
            virtual
            showPresenters
            presenters {
              name
              image
              text
              presentationTitle
            }
            location {
              mapsLatitude
              mapsLongitude
              mapsLink
              name
            }
            stream {
              streamProvider
              streamChannel
              streamLink
            }
          }
        }
      }
    }
    ...LayoutFragment
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image
              imageAlt
            }
            upcomingEventHeading
            noUpcomingEventText
            noUpcomingEventLink
            mapsNote
            callToActions {
              firstCTA {
                heading
                subHeading
                linkType
                linkURL
              }
              secondCTA {
                heading
                subHeading
                linkType
                linkURL
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
