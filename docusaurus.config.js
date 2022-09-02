// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OU.LH',
  tagline: '长风破浪会有时，直挂云帆济沧海。',
  url: 'https://www.oulh.ml',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon1-1.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    //defaultLocale: 'en',
    //locales: ['en'],
	defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/oulh/oulh.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/oulh/oulh.github.io/tree/main/',
        },
		
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
	  
	  algolia: {
      // Algolia 提供的应用 ID
      appId: 'RCZTB3YFR0',

      //  公开 API 密钥：提交它没有危险
      apiKey: '9881ca3631c9d611a6368974d3f27993',

      indexName: 'oulh',

      // 可选：见下文
      contextualSearch: true,

      // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
      externalUrlRegex: 'external\\.com|domain\\.com',

      // 可选：Algolia 搜索参数
      searchParameters: {},

      // 可选：搜索页面的路径，默认启用（可以用 `false` 禁用）
      searchPagePath: 'search',

      // ……其他 Algolia 参数
    },
	  
	  docs: {
		  sidebar: {
			hideable: true,
		  },
	  },
      navbar: {
		 // 下拉页面时隐藏导航栏
		hideOnScroll: true,
        title: 'OU.LH',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
		// 用"."表示根目录docs
		  {
            type: 'doc',
            docId: 'itnotes/tree',
            position: 'left',
            label: '笔记',
          },
          {to: '/blog', label: '博客', position: 'left'},
		  
		  {
            type: 'doc',
            docId: 'others/baduanjin',
            position: 'right',
            label: '其他',
          },
		  // 下拉菜单
          {
            type: 'dropdown',
            position: 'right',
            label: '网址导航',
			items: [
			  {
				to: 'studynav',
                label: '学习相关',			
			  },
			  {
				to: 'resourcenav',
                label: '实用资源',			
			  },
			]
          },
		  /*
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },*/
		  
        ],
      },
      footer: {
        style: 'dark',
		/*
        links: [
		
          {
            title: 'Docs',
            items: [
              {
                label: '笔记',
                to: '/docs/itnotes',
              },
			  
            ],
          },
		  
          {
            title: '示例',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'This Site',
            items: [
			  {
                label: 'Doc 示例',
                to: '/docs/example/intro',
              },
			  { 
                html: `
				<span>Power by</span>
				<a href="https://docusaurus.io/zh-CN" target="_blank" >
                 Docusaurus
                </a>
				`,
              },
              { 
                html: `
				<span>Deploys by</span>
				<a href="https://www.netlify.com" target="_blank" >Netlify</a>
				<span>and</span>
				<a href="https://vercel.com/" target="_blank" >Vercel</a>
				`,
              },
			  
            ],
          },
        ],
		*/
        copyright: `Copyright © ${new Date().getFullYear()} 
		&ensp;本站由 <a href="https://docusaurus.io/zh-CN" target="_blank" >Docusaurus</a> 构建
		&ensp;部署于 <a href="https://www.netlify.com" target="_blank" >Netlify</a> 
		和 <a href="https://vercel.com/" target="_blank" >Vercel</a>

		<br><small>纸上得来终觉浅，绝知此事要躬行。</small>
		`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
