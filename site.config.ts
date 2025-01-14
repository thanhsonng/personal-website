import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '406e5335ccce413cbf28177b5937b115',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: undefined,

  // basic site info (required)
  name: 'Son Nguyen\'s Front-End Journey',
  domain: 'sonng.dev',
  author: 'Son Nguyen',

  // open graph metadata (optional)
  description: 'Son Nguyen\'s Front-End Journey',

  // social usernames (optional)
  twitter: 'thanhsonng211',
  github: 'thanhsonng',
  linkedin: 'thanhsonng',
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: 'https://personal-use-singapore.s3.ap-southeast-1.amazonaws.com/default-page-icon.png',
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,
  defaultSocialImageThumbnail: 'https://personal-use-singapore.s3.ap-southeast-1.amazonaws.com/default-page-cover.jpeg',

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: undefined,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  navigationStyle: 'custom'
  // navigationStyle: 'custom',
  // navigationLinks: [
  //   {
  //     title: 'About',
  //     pageId: 'f1199d37579b41cbabfc0b5174f4256a'
  //   },
  //   {
  //     title: 'Contact',
  //     pageId: '6a29ebcb935a4f0689fe661ab5f3b8d1'
  //   }
  // ]
})
