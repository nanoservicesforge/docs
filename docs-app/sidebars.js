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
  docsSidebar: [
    {
      type: 'doc', 
      id: 'docs/quickstart',
      label: 'Quickstart',
    },
    {
      type: 'category', 
      label: 'Package Management',
      items: [
        'docs/package-management/mapping-packages',
        'docs/package-management/packaging-nanoservices',
        'docs/package-management/declaring-nanoservices',
        'docs/package-management/useful-commands',
      ]
    },
    {
      type: 'category',
      label: 'Building a Nanoservice',
      items: [
        'docs/building/create',
        'docs/building/introduction',
        'docs/building/kernel_and_contracts',
        'docs/building/core',
        // 'docs/building/single_binary',
        'docs/building/http' // servers
        // packaging a nanoservice
        // installing a nanoservice
      ]
    },
    {
      type: 'category', 
      label: 'IO-Messaging',
      items: [
        'docs/iomessaging/introduction',
        'docs/iomessaging/building-a-kernel',
        'docs/iomessaging/receiving-messages',
        'docs/iomessaging/sending-messages',
        'docs/iomessaging/roadmap',
      ]
    },
    {
      type: 'category', 
      label: 'Concepts',
      items: [
        'docs/concepts/nanoservice',
        // 'docs/Concepts/kernel',
        // 'docs/Concepts/contract'
      ]
    }
  ],
};

export default sidebars;