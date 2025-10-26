import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scissors, Award, Clock, Users } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import heroImage from '@/assets/hero-barber.jpg';

const Home = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Signature Haircut',
      description: 'Precision cuts tailored to your style',
      price: '$35',
    },
    {
      icon: Award,
      title: 'Beard Grooming',
      description: 'Professional beard trim and styling',
      price: '$25',
    },
    {
      icon: Clock,
      title: 'Hot Towel Shave',
      description: 'Luxury traditional straight razor shave',
      price: '$40',
    },
  ];

  const testimonials = [
    {
      name: 'Michael Anderson',
      text: 'Best barbershop in town! The attention to detail is incredible.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      text: 'Elite service, elite cuts. Been coming here for 2 years.',
      rating: 5,
    },
    {
      name: 'Robert Davis',
      text: 'Professional, clean, and friendly. Highly recommend!',
      rating: 5,
    },
  ];

  const stats = [
    { icon: Users, value: '5000+', label: 'Happy Clients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Scissors, value: '10K+', label: 'Haircuts Done' },
    { icon: Clock, value: '6 Days', label: 'Open Weekly' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional barber cutting hair"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center md:text-left">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              Crafting Confidence,
              <span className="text-primary block">One Cut at a Time</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience premium grooming in a luxury setting. Where tradition meets modern style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/appointment">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold text-lg px-8 py-6">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Premium Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience excellence in every service we offer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-lg p-12 text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready for a Fresh Look?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the Elite Cuts difference
            </p>
            <Link to="/appointment">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
