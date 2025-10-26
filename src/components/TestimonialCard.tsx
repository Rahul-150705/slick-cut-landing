import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

const TestimonialCard = ({ name, text, rating }: TestimonialCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 italic">"{text}"</p>
        <p className="text-foreground font-semibold">{name}</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
