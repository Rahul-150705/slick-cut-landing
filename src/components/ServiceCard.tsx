import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
}

const ServiceCard = ({ icon: Icon, title, description, price }: ServiceCardProps) => {
  return (
    <Card className="bg-card border-border hover-lift group">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">{price}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
