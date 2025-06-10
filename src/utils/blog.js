import { getCollection } from 'astro:content';

export async function getRecentPosts(limit) {
  const posts = await getCollection('blog');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
  });

  // Return only the specified number of posts
  return sortedPosts.slice(0, limit).map(post => ({
    slug: post.id,
    title: post.data.title,
    url: `/blogbuilding/${post.id}`
  }));
}
