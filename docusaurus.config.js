// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Factory+',
  tagline: 'Factory+ provides an open framework to standardise and simplify the way that data is extracted, transported, stored, processed, consumed and protected across a manufacturing organisation.',
  favicon: 'img/favicon.png',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Set the production url of your site here
  url: 'https://factoryplus.app.amrc.co.uk',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AMRC-FactoryPlus', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/AMRC-Factoryplus/documentation',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'AMRC Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            position: 'right',
            label: 'AMRC Connectivity Stack',
            href: 'https://github.com/AMRC-FactoryPlus/amrc-connectivity-stack',
          },
        ],
      },
      footer: {
        links: [
          {
            title: 'The Team',
            items: [
              {
                label: 'Alex Godbehere',
                href: 'https://www.linkedin.com/in/alex-godbehere-443495a8/',
              },
              {
                label: 'Arturs Grigals',
                href: 'https://www.linkedin.com/in/grigals/',
              },
              {
                label: 'Jon Hall',
                href: 'https://www.linkedin.com/in/jon-adam-hall/',
              },
              {
                label: 'Ben Morrow',
                href: 'mailto:factoryplus@amrc.co.uk',
              },
            ],
          },
          {
            title: 'The AMRC',
            items: [
              {
                label: 'Website',
                to: 'https://amrc.co.uk',
              },
              {
                label: 'Twitter',
                to: 'https://twitter.com/TheAMRC',
              },
            ],
          }
        ],
        copyright: `Copyright© (MIT) ${new Date().getFullYear()} University of Sheffield AMRC. Published on 5th April 2021, Updated on 5th April 2023.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
