import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const images = [
    { src: gallery1, alt: 'Modern luxury barbershop interior' },
    { src: gallery2, alt: 'Professional hair cutting technique' },
    { src: gallery3, alt: 'Expert beard grooming service' },
    { src: gallery4, alt: 'Stylish modern haircut result' },
    { src: gallery5, alt: 'Relaxing hot towel treatment' },
    { src: gallery6, alt: 'Professional barber tools and products' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Showcasing our craftsmanship and premium barbershop experience
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-square group animate-fade-in hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              See The Difference In Person
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Visit us and experience the Elite Cuts standard of excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointment">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg px-8 py-6">
                  Book Appointment
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold text-lg px-8 py-6">
                  Visit Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
