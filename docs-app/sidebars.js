/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  philosophySidebar: [{type: 'autogenerated', dirName: 'philosophy'}],
  docsSidebar: [
    {
      type: 'doc', 
      id: 'Docs/quickstart',
      label: 'Quickstart',
    },
    {
      type: 'category', 
      label: 'Package Management',
      items: [
        'Docs/Packages/mapping-packages',
        'Docs/Packages/packaging-nanoservices',
        'Docs/Packages/declaring-nanoservices',
        'Docs/Packages/useful-commands',
      ]
    },
    {
      type: 'category', 
      label: 'IO-Messaging',
      items: [
        'Docs/iomessaging/introduction',
        'Docs/iomessaging/building-a-kernel',
        'Docs/iomessaging/receiving-messages',
        'Docs/iomessaging/sending-messages',
        'Docs/iomessaging/roadmap',
      ]
    },
    {
      type: 'category', 
      label: 'Concepts',
      items: [
        'Docs/Concepts/nanoservice',
        // 'Docs/Concepts/kernel',
        // 'Docs/Concepts/contract'
      ]
    }
  ],
};

export default sidebars;
