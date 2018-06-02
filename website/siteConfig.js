/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Open Cloud Community' /* title for your website */,
  tagline: 'Open Cloud Community | IBM Brazil',
  url: 'https://ibmcloudbrazil.github.io/' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: '',
  headerLinks: [
    {doc: 'sobre-01', label: 'Comunidades'},
    {doc: 'icp-treina-01', label: 'Treinamentos'},
    {page: 'help', label: 'Ajuda'},
    {blog: true, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/ibm-logo-white.png',
  footerIcon: 'img/ibm_logo.svg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#5392ff',
    secondaryColor: '#5392ff',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    'Open Cloud Community',
  organizationName: 'ibmcloudbrazil', // or set an env variable ORGANIZATION_NAME
  projectName: 'ibmcloudbrazil.github.io', // or set an env variable PROJECT_NAME,
  gaTrackingId: 'UA-116360064-1',
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  //gaTrackingId: 'UA-116360064-1'
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/facebook/test-site',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
};

module.exports = siteConfig;
