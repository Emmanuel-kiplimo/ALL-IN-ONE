
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  featured: boolean;
}

// Hardcoded blog posts (with Sudan, Ukraine, and DRC added)
const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Field Diary: 30 Days in Gaza",
    excerpt: "Our team shares raw, unfiltered accounts from the ground as we help families rebuild after devastating attacks.",
    category: "Field Diaries",
    date: "Jan 15, 2025",
    author: "Sarah Ahmed",
    image: "/images/gaza attack.jpg",
    featured: true
  },
  {
    id: "7",
    title: "Inside Sudan: Facing the World's Silent Famine",
    excerpt: "Our emergency food trucks have breached barricaded routes in Sudan, bringing nutrient-rich pastes and clean water to starving infants in dry plains.",
    category: "Field Diaries",
    date: "May 10, 2026",
    author: "Aminat Ibrahim",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "8",
    title: "Ukraine Winter Rescue: Battling Frost and Blackouts",
    excerpt: "Electrical lines are shattered. Our team has completed delivery of high-capacity generators and thermal wear to vulnerable underground community cellars.",
    category: "Recovery Progress",
    date: "Jan 12, 2026",
    author: "Andriy Boyko",
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "9",
    title: "Outbreak Deployments: Combatting Mpox in the DRC",
    excerpt: "In conflict-torn eastern DR Congo, our mobile clinic doctors are crossing militarized sectors to deliver critical vaccines and direct life-saving health support.",
    category: "Field Diaries",
    date: "March 20, 2026",
    author: "Dr. Jean-Luc Kalamba",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "2",
    title: "Donor Spotlight: The Johnson Family's 10-Year Journey",
    excerpt: "How a small monthly donation became a lifeline for hundreds of families across three continents.",
    category: "Donor Spotlights",
    date: "March 12, 2017", 
    author: "Michael Torres",
    image: "/images/Donors.jpg",
    featured: false
  },
  {
    id: "3",
    title: "Afghanistan Winter Update: Reaching 5,000 Children",
    excerpt: "Despite challenges, we've distributed winter supplies to thousands of children facing harsh conditions.",
    category: "Recovery Progress",
    date: "Aug 10, 2019",
    author: "Dr. Fatima Khan",
    image: "/images/winter update.jpg",
    featured: false
  },
  {
    id: "4",
    title: "Turkey-Syria Earthquake: 1 Year Later",
    excerpt: "A comprehensive look at long-term recovery efforts and the communities we've helped rebuild.",
    category: "Recovery Progress",
    date: "Dec 8, 2020",
    author: "Elena Rodriguez",
    image: "/images/turkey syria.jpg",
    featured: false
  },
  {
    id: "5",
    title: "Volunteer Story: Why I Keep Coming Back",
    excerpt: "A volunteer nurse shares her emotional journey working in disaster zones around the world.",
    category: "Field Diaries",
    date: "April 5, 2021",
    author: "Lisa Chen",
    image: "/images/story volunteer.jpg",
    featured: false
  },
  {
    id: "6",
    title: "Transparency Report: Where Every Dollar Goes",
    excerpt: "Our quarterly breakdown showing exactly how donations are allocated across programs and regions.",
    category: "Transparency Updates",
    date: "Sep 1, 2024",
    author: "Hope Charity Team",
    image: "/images/transparency.jpg",
    featured: false
  }
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://hope-backend-0h72.onrender.com';
      try {
        const res = await fetch(`${BACKEND_URL}/api/blogs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((post: any, idx: number) => ({
              id: post.id || String(idx + 1),
              title: post.title,
              excerpt: post.excerpt,
              category: post.category || (post.tags && post.tags[0]) || "General",
              date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : "Recent",
              author: post.author || "Hope Charity Team",
              image: post.featuredImage || post.image || "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
              featured: idx === 0
            }));
            setBlogPosts(mapped);
          }
        }
      } catch (error) {
        console.warn('Failed to fetch dynamic blogs, using fallback data:', error);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ["All", "Field Diaries", "Donor Spotlights", "Recovery Progress", "Transparency Updates"];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatBlogDate = (dateStr: string) => {
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) {
      return dateStr;
    }
    return new Date(parsed).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderContent = () => {
    return (
      <>
        {/* Featured Post */}
        {featuredPost && (
          <section key={featuredPost.id} className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover-lift border border-[#c5a880]/15">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-full relative overflow-hidden group">
                    <img 
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div>
                      <Badge className="mb-4 bg-[#8b1e2f] text-white hover:bg-[#8b1e2f]/90 py-1 px-3">
                        Featured • {featuredPost.category}
                      </Badge>
                      <h2 className="font-playfair font-bold text-3xl md:text-4xl text-[#111827] leading-tight">
                        {featuredPost.title}
                      </h2>
                    </div>
                    <p className="text-hope-gray text-lg leading-relaxed font-light">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-hope-gray space-x-6 pt-4 border-t border-hope-gold/10">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-[#8b1e2f]" />
                        <span>{formatBlogDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-[#8b1e2f]" />
                        <span>{featuredPost.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-20 bg-slate-50 border-t border-hope-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair font-bold text-3xl md:text-5xl text-[#111827] text-center mb-16">
              Latest Dispatches & Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="glass-panel hover-lift overflow-hidden border border-[#c5a880]/15 bg-white/80 shadow-xl transition-all duration-300 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden relative group">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </div>
                    <div className="p-6 space-y-4">
                      <Badge variant="outline" className="text-[#8b1e2f] border-[#8b1e2f]/20 bg-[#8b1e2f]/5 py-0.5 px-2.5">
                        {post.category}
                      </Badge>
                      <h3 className="font-playfair font-bold text-xl text-[#111827] leading-snug line-clamp-2 hover:text-[#8b1e2f] transition duration-200">
                        {post.title}
                      </h3>
                      <p className="text-hope-gray font-light text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex items-center text-xs text-hope-gray space-x-4 border-t border-hope-gold/10 pt-4">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8b1e2f]" />
                        <span>{formatBlogDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-[#8b1e2f]" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-outfit text-hope-blue selection:bg-hope-red/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#030712] text-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8b1e2f]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-hope-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-hope-gold font-medium tracking-widest text-xs uppercase block">Humanitarian Journal</span>
          <h1 className="font-playfair font-bold text-4xl md:text-6xl text-white tracking-tight">
            Stories From <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#faf7f2] to-hope-gold">The Field</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Real stories, raw dispatches, and absolute transparency. Follow our workers as they protect lives and build futures across the globe.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b border-hope-gold/15 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-medium rounded-full ${
                  selectedCategory === category 
                    ? "bg-[#8b1e2f] text-white hover:bg-[#8b1e2f]" 
                    : "border-hope-gold/20 text-[#111827] hover:bg-slate-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      
      {renderContent()}

      <Footer />
    </div>
  );
};

export default Blog;

