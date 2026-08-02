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
      text: '社区中心',
      href: 'https://hono-bbs-9qj.pages.dev',
    },
    // ↓ 新增这一行
    {
      text: '工具中心',
      href: 'https://it-toolbox-19l.pages.dev/',  // 替换为实际地址
    },
    {
      text: '关于我们',
      href: getPermalink('/about'),
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
  // ... 保持不变 ...
};