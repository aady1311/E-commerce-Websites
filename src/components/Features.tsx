import { Truck, Shield, RefreshCw, Headphones, Gift, CreditCard } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders over $100', color: 'from-blue-500 to-blue-600' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure transactions', color: 'from-green-500 to-green-600' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy', color: 'from-amber-500 to-amber-600' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated customer care', color: 'from-rose-500 to-rose-600' },
  { icon: Gift, title: 'Gift Wrapping', description: 'Premium packaging', color: 'from-purple-500 to-purple-600' },
  { icon: CreditCard, title: 'Flexible Payment', description: 'Pay in installments', color: 'from-cyan-500 to-cyan-600' },
];

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-900 dark:text-white mb-4">Shop with Confidence</h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">We're committed to providing you with the best shopping experience</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group bg-primary-50 dark:bg-primary-900 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-primary-100 dark:border-primary-800">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-primary-600 dark:text-primary-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
