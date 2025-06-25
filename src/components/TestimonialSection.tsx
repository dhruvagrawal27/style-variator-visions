import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechStart Inc.",
      content: "DreamRender AI transformed our ad creative process. We're seeing 3x higher conversion rates!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder",
      company: "Creative Agency Co.",
      content: "The art variations feature is incredible. We can explore so many creative directions instantly.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Social Media Manager",
      company: "Brand Solutions",
      content: "Creating professional ad graphics has never been this easy. Our clients love the results!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Loved by Creators Worldwide
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
                <p className="text-sm text-purple-300">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
