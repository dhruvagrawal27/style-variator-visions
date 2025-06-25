import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Target, Star, Users, Trophy, CheckCircle, ArrowRight, Palette, TrendingUp, Globe, Clock } from 'lucide-react';
import AnimatedWire from '@/components/AnimatedWire';
import Navigation from '@/components/Navigation';
import TestimonialSection from '@/components/TestimonialSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
          <AnimatedWire />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-16 h-16 text-purple-400 mr-4 animate-pulse" />
              <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                DreamRender AI
              </h1>
              <Zap className="w-16 h-16 text-cyan-400 ml-4 animate-pulse" />
            </div>
            
            <h2 className="text-5xl font-bold mb-6 text-gray-100 leading-tight">
              Forge Your Creative Vision with AI Magic ✨
            </h2>
            
            <p className="text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              Transform images into stunning artistic variations or create high-conversion ad graphics 
              that captivate your audience. Two powerful AI tools, infinite creative possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/style-variations">
                <Button className="text-lg px-10 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full transform hover:scale-105 transition-all shadow-2xl">
                  🎨 Create Art Variations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/ad-graphics">
                <Button className="text-lg px-10 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full transform hover:scale-105 transition-all shadow-2xl">
                  🎯 Generate Ad Graphics
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
                <div className="text-gray-400">Images Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">95%</div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-gray-400">AI Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Unleash Creative Power
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional-grade AI tools designed for creators, marketers, and businesses who demand excellence
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-12 h-12 text-purple-400 mr-4" />
                  <h4 className="text-3xl font-bold text-purple-300">Art Style Variations</h4>
                </div>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Transform any image into multiple artistic styles - from cyberpunk aesthetics 
                  to Ghibli magic. Create 1-10 variations in seconds with AI precision.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Multiple artistic styles
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Instant preview generation
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    High-quality downloads
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Email delivery system
                  </div>
                </div>
                <Link to="/style-variations">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full">
                    Try Art Variations
                  </Button>
                </Link>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 transform hover:scale-105 transition-all">
                <div className="flex items-center mb-6">
                  <Target className="w-12 h-12 text-cyan-400 mr-4" />
                  <h4 className="text-3xl font-bold text-cyan-300">High-Conversion Ads</h4>
                </div>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Generate professional ad graphics that convert. Perfect for agencies, 
                  founders, and marketers who need compelling visual content fast.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Custom headlines & CTAs
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Founder photo integration
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Multiple variations
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Conversion-optimized design
                  </div>
                </div>
                <Link to="/ad-graphics">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full">
                    Create Ad Graphics
                  </Button>
                </Link>
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <Palette className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-white mb-3">Creative Styles</h5>
                <p className="text-gray-400">Over 50+ artistic styles including cyberpunk, watercolor, oil painting, and more</p>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-white mb-3">High Conversion</h5>
                <p className="text-gray-400">AI-optimized designs proven to increase engagement and conversion rates</p>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h5 className="text-xl font-bold text-white mb-3">Lightning Fast</h5>
                <p className="text-gray-400">Generate professional-quality results in seconds, not hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 px-4 bg-white/5 backdrop-blur-md">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-6 text-white">
                Perfect for Every Creative Professional
              </h3>
              <p className="text-xl text-gray-300">
                Join thousands of professionals already using DreamRender AI
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Marketing Agencies</h4>
                <p className="text-gray-300 leading-relaxed">
                  Scale your creative output with AI-powered ad generation. Create multiple variations 
                  for A/B testing and deliver stunning results to clients faster than ever.
                </p>
              </div>
              
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Entrepreneurs</h4>
                <p className="text-gray-300 leading-relaxed">
                  Bootstrap your marketing with professional-quality ads. No design team needed - 
                  just upload your photo and let AI create conversion-focused graphics.
                </p>
              </div>
              
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Content Creators</h4>
                <p className="text-gray-300 leading-relaxed">
                  Transform your photos into artistic masterpieces. Create unique content that 
                  stands out on social media and captivates your audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />

        {/* Pricing Teaser Section */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6 text-white">
              Professional Results at Startup Prices
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Get the same quality as expensive design agencies at a fraction of the cost
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-400 mb-2 line-through">$500+</div>
                  <div className="text-gray-400">Traditional Design Agency</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">Free</div>
                  <div className="text-gray-300">DreamRender AI Trial</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">Pay per use</div>
                  <div className="text-gray-400">Only pay for what you create</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Transform Your Creative Process?
            </h3>
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of creators, marketers, and agencies using DreamRender AI to produce 
              stunning visuals and high-converting ads in seconds
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/style-variations">
                <Button className="text-xl px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform hover:scale-105 transition-all shadow-2xl">
                  🎨 Start Creating Art
                  <Sparkles className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Link to="/ad-graphics">
                <Button className="text-xl px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transform hover:scale-105 transition-all shadow-2xl">
                  🎯 Generate Ads
                  <Target className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-purple-400 mr-2" />
                <span>AI-powered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
              <span className="text-2xl font-bold text-white">DreamRender AI</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering creativity through artificial intelligence
            </p>
            <div className="flex justify-center space-x-8">
              <Link to="/style-variations" className="text-gray-400 hover:text-purple-400 transition-colors">
                Art Variations
              </Link>
              <Link to="/ad-graphics" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Ad Graphics
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
