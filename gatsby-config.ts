import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';

dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `LetsTrawing`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: ['gatsby-plugin-sass'],
  pathPrefix: '/LetsTrawing',
};

export default config;
