/**
 * Mock API responses for V1 API testing
 * These fixtures represent typical V1 API response structures
 */

export const mockV1ContentItem = {
  contentID: 123,
  properties: {
    state: 2,
    modified: "2023-01-01T00:00:00.000Z",
    versionID: 456,
    referenceName: "test-content"
  },
  fields: {
    title: "Test Content Item",
    content: "This is test content",
    category: "Test Category"
  }
};

export const mockV1ContentList = {
  items: [
    {
      contentID: 123,
      properties: {
        state: 2,
        modified: "2023-01-01T00:00:00.000Z",
        versionID: 456,
        referenceName: "posts"
      },
      fields: {
        title: "First Post",
        content: "First post content"
      }
    },
    {
      contentID: 124,
      properties: {
        state: 2,
        modified: "2023-01-02T00:00:00.000Z",
        versionID: 457,
        referenceName: "posts"
      },
      fields: {
        title: "Second Post", 
        content: "Second post content"
      }
    }
  ],
  totalCount: 2
};

export const mockV1Page = {
  pageID: 789,
  name: "Test Page",
  path: "/test-page",
  menuText: "Test Page",
  pageTemplate: "Default",
  zones: {
    MainContentZone: [
      {
        item: {
          contentID: 123,
          properties: {
            state: 2,
            referenceName: "test-module"
          },
          fields: {
            title: "Test Module",
            content: "Module content"
          }
        }
      }
    ]
  },
  title: "Test Page Title",
  templateID: 1,
  redirectUrl: "",
  securePage: false,
  excludeFromOutputCache: false,
  visible: {
    menu: true,
    sitemap: true
  }
};

export const mockV1Gallery = {
  galleryID: 1,
  name: "Test Gallery",
  description: "Test gallery description",
  media: [
    {
      mediaID: 101,
      url: "https://example.com/image1.jpg",
      label: "Image 1"
    },
    {
      mediaID: 102,
      url: "https://example.com/image2.jpg", 
      label: "Image 2"
    }
  ]
};

export const mockV1SitemapFlat = {
  "/": {
    pageID: 1,
    name: "Home",
    path: "/",
    menuText: "Home",
    visible: {
      menu: true,
      sitemap: true
    }
  },
  "/about": {
    pageID: 2,
    name: "About",
    path: "/about", 
    menuText: "About",
    visible: {
      menu: true,
      sitemap: true
    }
  }
};

export const mockV1SitemapNested = [
  {
    pageID: 1,
    name: "Home",
    path: "/",
    menuText: "Home",
    visible: {
      menu: true,
      sitemap: true
    },
    children: [
      {
        pageID: 2,
        name: "About",
        path: "/about",
        menuText: "About", 
        visible: {
          menu: true,
          sitemap: true
        },
        children: []
      }
    ]
  }
];

export const mockV1SyncContent = {
  syncToken: 12345,
  items: [
    {
      contentID: 123,
      properties: {
        state: 2,
        modified: "2023-01-01T00:00:00.000Z",
        versionID: 456,
        referenceName: "posts"
      },
      fields: {
        title: "Sync Content Item",
        content: "Synced content"
      }
    }
  ]
};

export const mockV1SyncPages = {
  syncToken: 67890,
  items: [
    {
      pageID: 789,
      name: "Sync Page",
      path: "/sync-page",
      menuText: "Sync Page",
      visible: {
        menu: true,
        sitemap: true
      }
    }
  ]
};

export const mockV1UrlRedirections = [
  {
    url: "/old-page",
    destinationUrl: "/new-page",
    statusCode: 301
  },
  {
    url: "/another-old-page",
    destinationUrl: "/another-new-page", 
    statusCode: 302
  }
];

// Error responses
export const mockV1ErrorResponse = {
  error: "Bad Request",
  message: "Invalid request parameters",
  statusCode: 400
};

export const mockV1NotFoundResponse = {
  error: "Not Found",
  message: "The requested resource was not found",
  statusCode: 404
};
