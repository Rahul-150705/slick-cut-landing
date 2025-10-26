import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Example function to fetch booked slots from Google Sheets
// Replace this with your actual fetch function
async function fetchBookedSlotsFromSheet(): Promise<{ [key: string]: string[] }> {
  // Example response: { "2025-10-26": ["9:00 AM", "9:30 AM"] }
  return {}; 
}

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default today
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: string[] }>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const generateSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 19; hour++) {
      if (hour === 12) continue; // skip lunch
      const displayHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? "AM" : "PM";
      slots.push(`${displayHour}:00 ${ampm}`);
      slots.push(`${displayHour}:30 ${ampm}`);
    }
    return slots;
  };

  const allSlots = generateSlots();

  useEffect(() => {
    // Fetch booked slots from Google Sheets
    fetchBookedSlotsFromSheet().then((data) => setBookedSlots(data));
  }, []);

  useEffect(() => {
    const dateKey = selectedDate.toDateString();
    const booked = bookedSlots[dateKey] || [];
    setAvailableSlots(allSlots.filter((slot) => !booked.includes(slot)));
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

  const handleBookSlot = (slot: string) => {
    const dateKey = selectedDate.toDateString();
    setBookedSlots((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), slot],
    }));
    setAvailableSlots((prev) => prev.filter((s) => s !== slot));
    alert(`Slot ${slot} booked for ${dateKey}`);
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
              onClick={() => handleBookSlot(slot)}
              className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {slot}
            </button>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No slots available</p>
        )}
      </div>
    </div>
  );
};

export default Appointment;
