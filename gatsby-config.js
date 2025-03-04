module.exports = {
  siteMetadata: {
    title: `hyeonZIP`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/posts/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `completed-posts`,
        path: `${__dirname}/content/posts/completed`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `non-complated-posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-extract-image-attributes`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 80,
              maxWidth: 1000,
            },
          },
          {
            resolve: `gatsby-remark-images-insert-wrapper-attributes`,
            options: {
              setCssInWrapper: false,
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "a11y-dark",
              lineNumbers: true,
            },
          },
        ],
      },
    },

      
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/posts/images/avatar.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
