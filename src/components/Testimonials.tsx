import { Star, Quote } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Fashion Enthusiast', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'Absolutely love the quality! The wool coat I bought is incredibly well-made and fits perfectly.' },
  { id: 2, name: 'Michael Chen', role: 'Business Professional', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'The tailoring on their dress shirts is impeccable. Best dress shirts I have ever owned.' },
  { id: 3, name: 'Emily Rodriguez', role: 'Style Blogger', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'LUXE has become my go-to for premium fashion. The attention to detail really sets them apart.' },
  { id: 4, name: 'David Park', role: 'Creative Director', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', rating: 5, text: 'Exceptional quality and fast shipping. The blazer exceeded my expectations - perfect for work.' },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 dark:from-primary-950 dark:via-primary-900 dark:to-primary-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-primary-300 max-w-2xl mx-auto">Join thousands of satisfied customers who trust LUXE</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Quote className="w-6 h-6 text-white fill-current" />
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-primary-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-white/10">
          <div className="text-center"><div className="text-4xl font-bold text-white mb-1">50K+</div><div className="text-primary-400 text-sm">Happy Customers</div></div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center"><div className="text-4xl font-bold text-white mb-1">4.9</div><div className="text-primary-400 text-sm">Average Rating</div></div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center"><div className="text-4xl font-bold text-white mb-1">100%</div><div className="text-primary-400 text-sm">Quality Guaranteed</div></div>
        </div>
      </div>
    </section>
  );
}
