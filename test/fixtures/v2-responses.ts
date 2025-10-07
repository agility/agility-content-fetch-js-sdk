/**
 * Mock API responses for V2 API testing
 * These fixtures represent typical V2 API response structures with proper data types
 */

export const mockV2ContentItem = {
  contentID: 123,
  properties: {
    state: 2,
    modified: new Date("2023-01-01T00:00:00.000Z"),
    versionID: 456,
    referenceName: "test-content"
  },
  fields: {
    title: "Test Content Item",
    content: "This is test content",
    category: "Test Category",
    publishDate: new Date("2023-01-01T00:00:00.000Z"),
    isActive: true,
    rating: 4.5
  }
};

export const mockV2ContentList = {
  items: [
    {
      contentID: 123,
      properties: {
        state: 2,
        modified: new Date("2023-01-01T00:00:00.000Z"),
        versionID: 456,
        referenceName: "posts"
      },
      fields: {
        title: "First Post",
        content: "First post content",
        publishDate: new Date("2023-01-01T00:00:00.000Z"),
        isActive: true,
        viewCount: 150
      }
    },
    {
      contentID: 124,
      properties: {
        state: 2,
        modified: new Date("2023-01-02T00:00:00.000Z"),
        versionID: 457,
        referenceName: "posts"
      },
      fields: {
        title: "Second Post",
        content: "Second post content",
        publishDate: new Date("2023-01-02T00:00:00.000Z"),
        isActive: true,
        viewCount: 89
      }
    }
  ],
  totalCount: 2
};

export const mockV2Page = {
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
            referenceName: "test-module",
            modified: new Date("2023-01-01T00:00:00.000Z")
          },
          fields: {
            title: "Test Module",
            content: "Module content",
            isVisible: true,
            sortOrder: 1
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
  },
  seo: {
    metaTitle: "Test Page SEO Title",
    metaDescription: "Test page SEO description",
    metaKeywords: "test, page, seo"
  }
};

export const mockV2Gallery = {
  galleryID: 1,
  name: "Test Gallery",
  description: "Test gallery description",
  media: [
    {
      mediaID: 101,
      url: "https://example.com/image1.jpg",
      label: "Image 1",
      size: 1024000,
      width: 1920,
      height: 1080,
      uploadDate: new Date("2023-01-01T00:00:00.000Z")
    },
    {
      mediaID: 102,
      url: "https://example.com/image2.jpg",
      label: "Image 2", 
      size: 2048000,
      width: 2560,
      height: 1440,
      uploadDate: new Date("2023-01-02T00:00:00.000Z")
    }
  ],
  createdDate: new Date("2023-01-01T00:00:00.000Z"),
  modifiedDate: new Date("2023-01-02T00:00:00.000Z")
};

export const mockV2SitemapFlat = {
  "/": {
    pageID: 1,
    name: "Home",
    path: "/",
    menuText: "Home",
    visible: {
      menu: true,
      sitemap: true
    },
    lastModified: new Date("2023-01-01T00:00:00.000Z"),
    priority: 1.0
  },
  "/about": {
    pageID: 2,
    name: "About",
    path: "/about",
    menuText: "About",
    visible: {
      menu: true,
      sitemap: true
    },
    lastModified: new Date("2023-01-02T00:00:00.000Z"),
    priority: 0.8
  }
};

export const mockV2SitemapNested = [
  {
    pageID: 1,
    name: "Home",
    path: "/",
    menuText: "Home",
    visible: {
      menu: true,
      sitemap: true
    },
    lastModified: new Date("2023-01-01T00:00:00.000Z"),
    priority: 1.0,
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
        lastModified: new Date("2023-01-02T00:00:00.000Z"),
        priority: 0.8,
        children: []
      }
    ]
  }
];

export const mockV2SyncContent = {
  syncToken: 12345,
  items: [
    {
      contentID: 123,
      properties: {
        state: 2,
        modified: new Date("2023-01-01T00:00:00.000Z"),
        versionID: 456,
        referenceName: "posts"
      },
      fields: {
        title: "Sync Content Item",
        content: "Synced content",
        publishDate: new Date("2023-01-01T00:00:00.000Z"),
        isActive: true
      }
    }
  ],
  hasMore: false,
  nextSyncToken: 12346
};

export const mockV2SyncPages = {
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
      },
      lastModified: new Date("2023-01-01T00:00:00.000Z")
    }
  ],
  hasMore: false,
  nextSyncToken: 67891
};

export const mockV2UrlRedirections = [
  {
    url: "/old-page",
    destinationUrl: "/new-page",
    statusCode: 301,
    createdDate: new Date("2023-01-01T00:00:00.000Z"),
    isActive: true
  },
  {
    url: "/another-old-page", 
    destinationUrl: "/another-new-page",
    statusCode: 302,
    createdDate: new Date("2023-01-02T00:00:00.000Z"),
    isActive: true
  }
];

// Error responses (same structure as V1 but with proper typing)
export const mockV2ErrorResponse = {
  error: "Bad Request",
  message: "Invalid request parameters",
  statusCode: 400,
  timestamp: new Date("2023-01-01T00:00:00.000Z")
};

export const mockV2NotFoundResponse = {
  error: "Not Found",
  message: "The requested resource was not found",
  statusCode: 404,
  timestamp: new Date("2023-01-01T00:00:00.000Z")
};
