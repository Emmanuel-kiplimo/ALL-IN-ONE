
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { useState } from 'react';

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

// Hardcoded blog posts (reverted to original state)
const initialBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Field Diary: 30 Days in Gaza",
    excerpt: "Our team shares raw, unfiltered accounts from the ground as we help families rebuild after devastating attacks.",
    category: "Field Diaries",
    date: "Jan 15, 2025",
    author: "Sarah Ahmed",
    image: "https://www.aljazeera.com/wp-content/uploads/2025/01/AA-20250119-36799656-36799649-AFTERMATH_OF_ISRAELI_ATTACKS_IN_NORTHERN_GAZA_DURING_CEASEFIRE-1737364681.jpg?fit=1170,878&quality=80",
    featured: true
  },
  {
    id: "2",
    title: "Donor Spotlight: The Johnson Family's 10-Year Journey",
    excerpt: "How a small monthly donation became a lifeline for hundreds of families across three continents.",
    category: "Donor Spotlights",
    date: "March 12, 2017", 
    author: "Michael Torres",
    image: "https://media.gettyimages.com/id/1181814487/photo/toy-hand-giving-a-red-heart.jpg?s=612x612&w=0&k=20&c=I56HG_eVO6cMLWTr09xmEcpwHRsmnw0wqbGaXs3ijUM=",
    featured: false
  },
  {
    id: "3",
    title: "Afghanistan Winter Update: Reaching 5,000 Children",
    excerpt: "Despite challenges, we've distributed winter supplies to thousands of children facing harsh conditions.",
    category: "Recovery Progress",
    date: "Aug 10, 2019",
    author: "Dr. Fatima Khan",
    image: "https://i.guim.co.uk/img/media/fd8335b64c24015f1ad33e277070fb3220c4a00f/0_0_8192_5464/master/8192.jpg?width=445&dpr=1&s=none&crop=none",
    featured: false
  },
  {
    id: "4",
    title: "Turkey-Syria Earthquake: 1 Year Later",
    excerpt: "A comprehensive look at long-term recovery efforts and the communities we've helped rebuild.",
    category: "Recovery Progress",
    date: "Dec 8, 2020",
    author: "Elena Rodriguez",
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-02/230207-turkey-syria-earthquake-mb-1129-b17327.jpg",
    featured: false
  },
  {
    id: "5",
    title: "Volunteer Story: Why I Keep Coming Back",
    excerpt: "A volunteer nurse shares her emotional journey working in disaster zones around the world.",
    category: "Field Diaries",
    date: "April 5, 2021",
    author: "Lisa Chen",
    image: "https://media.gettyimages.com/id/157504331/photo/tithing.jpg?s=612x612&w=0&k=20&c=8hkY5KXz-j_thngcHnWFDOPNUfjOM8kvukl8FNCcBWo=",
    featured: false
  },
  {
    id: "6",
    title: "Transparency Report: Where Every Dollar Goes",
    excerpt: "Our quarterly breakdown showing exactly how donations are allocated across programs and regions.",
    category: "Transparency Updates",
    date: "Sep 1, 2024",
    author: "Hope Charity Team",
    image: "https://tcfcares.org/wp-content/uploads/2024/08/image1-1024x683.webp",
    featured: false
  }
];

const Blog = () => {
  const [blogPosts] = useState<BlogPost[]>(initialBlogPosts); // Use hardcoded data
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ["All", "Field Diaries", "Donor Spotlights", "Recovery Progress", "Transparency Updates"];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const renderContent = () => {
    return (
      <>
        {/* Featured Post */}
        {featuredPost && ( // Ensure featuredPost exists before rendering
          <section key={featuredPost.id} className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden hover-lift">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-full">
                    <img 
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-hope-red text-white">
                      Featured • {featuredPost.category}
                    </Badge>
                    <h2 className="font-lato font-bold text-3xl text-hope-blue mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-hope-gray text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-hope-gray space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-lato font-bold text-3xl text-hope-blue text-center mb-12">
              Latest Updates
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="hover-lift overflow-hidden border-0 shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="font-lato font-bold text-xl text-hope-blue mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-hope-gray mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-hope-gray space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-hope-blue to-hope-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-lato font-bold text-4xl md:text-5xl text-white mb-6">
            Stories from the Field
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Real stories, real impact, real transparency. Follow our journey as we bring hope to communities worldwide.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-hope-blue hover:text-white transition-colors px-4 py-2"
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
