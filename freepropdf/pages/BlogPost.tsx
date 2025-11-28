import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { TOOLS } from '../constants';
import SEO from '../components/SEO';
import { ArrowRight, ChevronLeft, Clock, Calendar } from 'lucide-react';
import * as Icons from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedTool = TOOLS.find(t => t.id === post.relatedToolId);
  const ToolIcon = relatedTool ? (Icons as any)[relatedTool.icon] : Icons.FileText;
  const relatedPosts = getRelatedPosts(post.id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        ogType="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.date,
          "author": {
            "@type": "Organization",
            "name": post.author
          },
          "articleBody": post.excerpt // In real app, strip HTML from content
        }}
      />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-600 mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1" /> Back to Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
             <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
             <span className="flex items-center gap-2"><Clock size={14} /> 5 min read</span>
             <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 rounded-full font-bold text-xs uppercase">
               {post.category}
             </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="prose dark:prose-invert prose-lg max-w-none bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
               {/* Intro content */}
               <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
                 {post.excerpt}
               </p>
               
               {/* Render HTML Content */}
               <div dangerouslySetInnerHTML={{ __html: post.content }} />

               {/* In-Article CTA */}
               {relatedTool && (
                 <div className="my-12 p-8 bg-brand-50 dark:bg-brand-900/20 rounded-2xl border border-brand-100 dark:border-brand-800 text-center">
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to {relatedTool.shortTitle}?</h3>
                   <p className="text-gray-600 dark:text-gray-300 mb-6">
                     Try our free, secure, and fast {relatedTool.title.toLowerCase()} right now.
                   </p>
                   <Link 
                     to={relatedTool.path}
                     className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1"
                   >
                     Start {relatedTool.shortTitle} <ArrowRight size={20} />
                   </Link>
                 </div>
               )}
            </article>

            {/* Related Posts */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map(p => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="block group">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 transition-colors">{p.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">{p.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar CTA */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              {relatedTool && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${relatedTool.color.replace('text-', 'bg-').replace('500', '100')} dark:bg-gray-700`}>
                    <ToolIcon className={`w-8 h-8 ${relatedTool.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Need to {relatedTool.shortTitle}?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Use our free tool to process your files instantly. No signup required.
                  </p>
                  <Link 
                    to={relatedTool.path}
                    className="block w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold transition-colors shadow-md"
                  >
                    Open Tool
                  </Link>
                </div>
              )}

              {/* Categories */}
              <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase text-xs tracking-wider">Popular Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {["Tutorials", "Security", "Optimization", "Education"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogPost;