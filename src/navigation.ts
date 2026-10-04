import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  groups: [
    {
      text: '信息板块',
      links: [
        {
          text: '信息中心',
          href: getBlogPermalink(),
        },
        {
          text: '社区中心',
          href: 'https://hono-bbs-9qj.pages.dev',
        },
      ],
    },
    {
      text: '数据板块',
      links: [
        {
          text: '工具中心',
          href: 'https://it-toolbox-19l.pages.dev/',
        },
        {
          text: '下载中心',
          href: getPermalink('/download'),
        },
      ],
    },
    {
      text: '凉宫数据',
      links: [
        {
          text: '人员介绍',
          href: getPermalink('/team'),
        },
        {
          text: '个人中心',
          href: 'https://users-manage-react.pages.dev/account?sessionId=',
        },
        {
          text: '关于我们',
          href: getPermalink('/about'),
        },
      ],
    },
  ],
};

export const footerData = {
  links: [
    {
      title: '产品中心',
      links: [
        { text: '开放平台', href: '#' },
        { text: '安全保障', href: '#' },
      ],
    },
    {
      title: '关于我们',
      links: [
        { text: '公司简介', href: '/about' },
        { text: '加入我们', href: '#' },
        { text: '人员介绍', href: '/team' },
      ],
    },
    {
      title: '联系方式',
      links: [
        {
          text: '邮箱联系',
          href: 'mailto:xuexiang@lianggong.dpdns.org',
        },
      ],
    },
  ],

  secondaryLinks: [
    {
      text: '隐私政策',
      href: getPermalink('/privacy'),
    },
  ],

  socialLinks: [
    {
      ariaLabel: 'GitHub',
      icon: 'tabler:brand-github',
      href: 'https://github.com/HSDCoffical',
    },
  ],

  footNote: `© ${new Date().getFullYear()} 凉宫数据 · 版权所有`,
};