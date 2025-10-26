import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Scissors } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const SHEET_URL = 'https://api.sheetbest.com/sheets/c7191ac9-a4f6-474f-bb74-d74d7de28566';

const Appointment = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    notes: '',
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const services = [
    'Signature Haircut',
    'Fade & Taper',
    'Beard Grooming',
    'Hot Towel Shave',
    'Kids Cut',
    'Haircut & Beard Combo',
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM',
    // skip 12:00 PM – 1:00 PM (lunch)
    '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM',
];

  // Fetch booked appointments
  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.json())
      .then(data => setBookedAppointments(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.service) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      toast({
        title: 'Appointment Booked!',
        description: 'We’ll contact you shortly to confirm your slot.',
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        service: '',
        notes: '',
      });

      const updated = await fetch(SHEET_URL).then(res => res.json());
      setBookedAppointments(updated);

    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to submit appointment. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to format Date in YYYY-MM-DD local
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter available times for selected date
  const availableTimes = timeSlots.filter(time => {
    if (!formData.date) return true;

    const now = new Date();
    const selectedDate = new Date(formData.date);

    // Disable past times for today
    if (formatDate(selectedDate) === formatDate(now)) {
      const [hourStr, minutePart] = time.split(':');
      const minute = parseInt(minutePart);
      const ampm = time.split(' ')[1];
      let hour = parseInt(hourStr);
      if (ampm === 'PM' && hour !== 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;

      if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
        return false;
      }
    }

    // Disable already booked times
    return !bookedAppointments.some(
      booking => booking.date === formData.date && booking.time === time
    );
  });

  // Compute disabled days for DayPicker
  const disabledDays = bookedAppointments.map(b => new Date(b.date));

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <Scissors className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Book Your Appointment</h1>
          <p className="text-xl text-muted-foreground">Schedule your visit and experience premium grooming</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 animate-fade-in space-y-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="service">Service *</Label>
              <Select
                value={formData.service}
                onValueChange={value => setFormData({ ...formData, service: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2"><Calendar className="w-4 h-4"/> Preferred Date *</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  required
                />
                <Button type="button" onClick={() => setShowCalendar(prev => !prev)}>
                  <Calendar className="w-5 h-5" />
                </Button>
              </div>
              {showCalendar && (
                <div className="mt-2 border rounded-md p-2 bg-card">
                  <DayPicker
                    mode="single"
                    selected={formData.date ? new Date(formData.date) : undefined}
                    onSelect={date => date && setFormData({ ...formData, date: formatDate(date) })}
                    disabled={[{ before: new Date() }, ...disabledDays]}
                  />
                </div>
              )}
            </div>

            <div>
              <Label className="flex items-center gap-2"><Clock className="w-4 h-4"/> Preferred Time *</Label>
              <Select
                value={formData.time}
                onValueChange={value => setFormData({ ...formData, time: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={availableTimes.length ? "Select time" : "No available time"} />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Special Requests (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific requests or notes..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading || availableTimes.length === 0}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {loading ? 'Submitting...' : 'Request Appointment'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
