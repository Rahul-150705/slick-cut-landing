import { Scissors, Sparkles, User, Users2, Wind, Droplets } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Signature Haircut',
      description: 'Precision haircut with consultation, wash, cut, and style',
      price: '$35',
    },
    {
      icon: Wind,
      title: 'Fade & Taper',
      description: 'Modern fade techniques with clean lines and expert blending',
      price: '$40',
    },
    {
      icon: Sparkles,
      title: 'Beard Grooming',
      description: 'Professional beard trim, shaping, and conditioning treatment',
      price: '$25',
    },
    {
      icon: Droplets,
      title: 'Hot Towel Shave',
      description: 'Luxury traditional straight razor shave with hot towel therapy',
      price: '$40',
    },
    {
      icon: User,
      title: 'Kids Cut',
      description: 'Patient, gentle haircuts for children under 12',
      price: '$25',
    },
    {
      icon: Users2,
      title: 'Haircut & Beard Combo',
      description: 'Complete grooming package - haircut and beard trim',
      price: '$55',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Premium grooming services tailored to perfection
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-card border border-border rounded-lg p-8 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Personalized consultation to understand your desired style</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Professional-grade products and tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Hot towel treatment and complimentary neck shave</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Styling tips and product recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Clean, comfortable, and welcoming environment</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Look Your Best?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your appointment today and experience premium grooming
            </p>
            <Link to="/appointment">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
