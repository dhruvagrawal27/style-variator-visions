
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Target, Star } from 'lucide-react';
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-16 h-16 text-purple-400 mr-4 animate-pulse" />
              <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                ArtForge AI
              </h1>
              <Zap className="w-16 h-16 text-cyan-400 ml-4 animate-pulse" />
            </div>
            
            <h2 className="text-4xl font-bold mb-6 text-gray-100">
              Forge Your Creative Vision with AI Magic ✨
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Transform images into stunning artistic variations or create high-conversion ad graphics 
              that captivate your audience. Two powerful AI tools, infinite creative possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/style-variations">
                <Button className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full transform hover:scale-105 transition-all">
                  🎨 Create Art Variations
                </Button>
              </Link>
              <Link to="/ad-graphics">
                <Button className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full transform hover:scale-105 transition-all">
                  🎯 Generate Ad Graphics
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Unleash Creative Power
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <Sparkles className="w-12 h-12 text-purple-400 mb-6" />
                <h4 className="text-2xl font-bold mb-4 text-purple-300">Art Style Variations</h4>
                <p className="text-gray-300 mb-6">
                  Transform any image into multiple artistic styles - from cyberpunk aesthetics 
                  to Ghibli magic. Create 1-10 variations in seconds with AI precision.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Multiple artistic styles</li>
                  <li>• Instant preview generation</li>
                  <li>• High-quality downloads</li>
                  <li>• Email delivery system</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                <Target className="w-12 h-12 text-cyan-400 mb-6" />
                <h4 className="text-2xl font-bold mb-4 text-cyan-300">High-Conversion Ads</h4>
                <p className="text-gray-300 mb-6">
                  Generate professional ad graphics that convert. Perfect for agencies, 
                  founders, and marketers who need compelling visual content fast.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Custom headlines & CTAs</li>
                  <li>• Founder photo integration</li>
                  <li>• Multiple variations</li>
                  <li>• Conversion-optimized design</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">
              Ready to Transform Your Creative Process?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators, marketers, and agencies using ArtForge AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/style-variations">
                <Button className="text-lg px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  Start Creating Art
                </Button>
              </Link>
              <Link to="/ad-graphics">
                <Button className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                  Generate Ads
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
