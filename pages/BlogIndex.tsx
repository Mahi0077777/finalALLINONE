import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_BLOG_POSTS } from '../data/blogPosts';
import SEO from '../components/SEO';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

const BlogIndex: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPosts = ALL_BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="PDF Tips & Tutorials Blog - FreeProPDF"
        description="Expert guides on how to merge, split, compress, and secure PDF files. Tips for students, professionals, and businesses."
      />
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl mb-4">
          PDF Masterclass Blog
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Tutorials, tips, and tricks to help you manage your documents like a pro.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors shadow-sm"
          placeholder="Search for tutorials (e.g., 'Merge', 'Student')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Link 
            key={post.id} 
            to={`/blog/${post.slug}`}
            className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <User size={12} />
                  </div>
                  {post.author}
                </div>
                <span className="text-brand-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No articles found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default BlogIndex;