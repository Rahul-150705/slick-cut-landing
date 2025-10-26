import { Award, Users, Scissors, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Story
            </h1>
            <p className="text-xl text-muted-foreground">
              Crafting exceptional grooming experiences since 2008
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none animate-fade-in">
              <p className="text-lg text-muted-foreground mb-6">
                Elite Cuts Barbershop was founded with a simple vision: to create a sanctuary where men can experience the timeless art of traditional barbering combined with contemporary style and service.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6">
                Our master barbers bring over 15 years of combined experience, training under some of the industry's finest craftsmen. We believe that a great haircut is more than just a service – it's an experience that should leave you feeling confident and refreshed.
              </p>

              <p className="text-lg text-muted-foreground mb-6">
                From classic cuts to modern fades, beard grooming to hot towel shaves, we honor the traditions of barbering while embracing innovation. Every client who walks through our doors receives personalized attention and expert care.
              </p>

              <p className="text-lg text-muted-foreground">
                At Elite Cuts, we're not just creating great looks – we're building lasting relationships with our clients and contributing to the confidence of our community, one haircut at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12 animate-fade-in">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Scissors,
                title: 'Craftsmanship',
                description: 'Every cut is executed with precision and artistry',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building lasting relationships with our clients',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Committed to the highest standards of service',
              },
              {
                icon: Heart,
                title: 'Passion',
                description: 'We love what we do and it shows in our work',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied clients who trust us with their grooming needs
            </p>
            <Link to="/appointment">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
                Book Your Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
