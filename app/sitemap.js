export default function sitemap() {
  const baseUrl = \'https://www.khales.ae\';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date( ),
      changeFrequency: \'weekly\',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: \'monthly\',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: \'monthly\',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/interior-design`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/architecture`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/project-management`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/engineering-consultancy`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/development-planning`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/landscape-design`,
      lastModified: new Date(),
      changeFrequency: \'weekly\',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: \'daily\',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: \'monthly\',
      priority: 0.6,
    }
  ];
}

