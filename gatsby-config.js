module.exports = {
  siteMetadata: {
    title: "Gatsby + Netlify CMS Starter",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/img/favicon.png",
      },
    },
    {
        resolve: `gatsby-plugin-google-gtag`,
        options: {
            // You can add multiple tracking ids and a pageview event will be fired for all of them.
            trackingIds: [
            "G-SR60NQ9CMJ", // Google Analytics / GA
            // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
            // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
            ],
            // This object gets passed directly to the gtag config command
            // This config will be shared across all trackingIds
            gtagConfig: {
            optimize_id: "G-SR60NQ9CMJ",
            anonymize_ip: true,
            cookie_expires: 0,
            },
            // This object is used for configuration specific to this plugin
            pluginConfig: {
            // Puts tracking script in the head instead of the body
            head: false,
            // Setting this parameter is also optional
            respectDNT: true,
            // Avoids sending pageview hits from custom paths
            exclude: [],
            },
        },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};