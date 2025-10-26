import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Replace this with your actual fetch/post functions for Google Sheets
async function fetchBookedSlotsFromSheet(): Promise<{ [key: string]: string[] }> {
  return {}; // e.g., { "2025-10-26": ["9:00 AM", "9:30 AM"] }
}

async function submitBookingToSheet(data: { name: string; email: string; phone: string; date: string; slot: string }) {
  console.log("Booking submitted:", data);
  // Implement your Google Sheets POST request here
}

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: string[] }>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", slot: "" });

  const generateSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 19; hour++) {
      if (hour === 12) continue; // lunch break
      const displayHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "AM" : "PM";
      slots.push(`${displayHour}:00 ${ampm}`);
      slots.push(`${displayHour}:30 ${ampm}`);
    }
    return slots;
  };

  const allSlots = generateSlots();

  useEffect(() => {
    fetchBookedSlotsFromSheet().then((data) => setBookedSlots(data));
  }, []);

  useEffect(() => {
    const dateKey = selectedDate.toDateString();
    const booked = bookedSlots[dateKey] || [];
    setAvailableSlots(allSlots.filter((slot) => !booked.includes(slot)));
    setFormData((prev) => ({ ...prev, slot: "" })); // reset selected slot when date changes
  }, [selectedDate, bookedSlots]);

  const handleSelectDate = (day: Date | undefined) => {
    if (!day) return;

    const today = new Date();
    const selected = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (selected < now) {
      alert("Cannot select a past date!");
      return;
    }

    setSelectedDate(day);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookSlot = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.slot) {
      alert("Please fill all fields and select a slot!");
      return;
    }

    const dateKey = selectedDate.toDateString();

    // Update local bookedSlots
    setBookedSlots((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), formData.slot],
    }));

    // Remove booked slot from available
    setAvailableSlots((prev) => prev.filter((s) => s !== formData.slot));

    // Submit to Google Sheets
    await submitBookingToSheet({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: dateKey,
      slot: formData.slot,
    });

    alert(`Booking confirmed for ${formData.slot} on ${dateKey}`);
    setFormData({ name: "", email: "", phone: "", slot: "" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleSelectDate}
        disabled={{ before: new Date() }}
      />

      <h2 className="text-xl font-semibold mt-4">Available Slots</h2>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setFormData((prev) => ({ ...prev, slot }))}
              className={`py-2 px-3 rounded ${
                formData.slot === slot ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              } hover:bg-blue-600`}
            >
              {slot}
            </button>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No slots available</p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleBookSlot}
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 mt-2"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
