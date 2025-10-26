import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Scissors } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

  const services = [
    'Signature Haircut',
    'Fade & Taper',
    'Beard Grooming',
    'Hot Towel Shave',
    'Kids Cut',
    'Haircut & Beard Combo',
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM',
  ];

  // Fetch booked appointments
  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.json())
      .then(data => setBookedAppointments(data))
      .catch(err => console.error(err));
  }, []);

  // Handle form submission
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

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        service: '',
        notes: '',
      });

      // Refresh booked appointments
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

  // Filter available times for selected date
  const availableTimes = timeSlots.filter(time => {
    if (!formData.date) return true;

    const now = new Date();
    const selectedDate = new Date(formData.date);

    // Disable past times for today
    if (selectedDate.toDateString() === now.toDateString()) {
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

    // Disable already booked times for that date
    return !bookedAppointments.some(
      booking => booking.date === formData.date && booking.time === time
    );
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Scissors className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-muted-foreground">
              Schedule your visit and experience premium grooming
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 animate-fade-in">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>

                {/* Service */}
                <div>
                  <Label htmlFor="service">Service *</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Preferred Date *
                  </Label>
                  <DatePicker
                    selected={formData.date ? new Date(formData.date) : null}
                    onChange={(date: Date) => setFormData({ ...formData, date: date?.toISOString().split('T')[0] || '' })}
                    minDate={new Date()}
                    filterDate={(date) => {
                      const dateStr = date.toISOString().split('T')[0];
                      return !bookedAppointments.some(booking => booking.date === dateStr);
                    }}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                    className="mt-2 w-full bg-card border border-border text-foreground rounded-md p-2"
                  />
                </div>

                {/* Time */}
                <div>
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Preferred Time *
                  </Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={availableTimes.length ? "Select time" : "No available time"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Special Requests (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requests or notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-2"
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || availableTimes.length === 0}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  {loading ? 'Submitting...' : 'Request Appointment'}
                </Button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-8 bg-secondary border border-border rounded-lg p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">What Happens Next?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">1.</span>
                  <span>We'll receive your appointment request</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">2.</span>
                  <span>Our team will contact you within 24 hours to confirm</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">3.</span>
                  <span>You'll receive a confirmation via phone or email</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
