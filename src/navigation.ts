import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '首页',
      href: getPermalink('/'),
    },
    {
      text: '信息中心',
      href: getBlogPermalink(),
    },
    {
      text: '关于我们',
      href: getPermalink('/about'),
    },
    {
      text: '社区',
      href: 'https://hono-bbs-9qj.pages.dev',
    },
  ],
  actions: [
    {
      text: '联系我们',
      href: 'mailto:xuexiang@lianggong.dpdns.org',
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
      ],
    },
    {
      title: '联系方式',
      links: [
        { text: '邮箱联系', href: 'mailto:xuexiang@lianggong.dpdns.org' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '隐私政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/HSDCoffical' },
  ],
  footNote: `© 2026 凉宫数据 · 版权所有`,
};