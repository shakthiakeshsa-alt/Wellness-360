// app/register/page.tsx
"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedStalls, setSelectedStalls] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);

  const optionalStalls = [
    { id: "power-world", name: "Power World Gyms" },
    { id: "lanka-hospitals", name: "Lanka Hospitals" },
    { id: "vision-care", name: "Vision Care" },
  ];

  const handleCheckboxChange = (id: string) => {
    if (selectedStalls.includes(id)) {
      setSelectedStalls(selectedStalls.filter((s) => s !== id));
    } else {
      setSelectedStalls([...selectedStalls, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated instant schedule response matching requirements
    const dummySchedule = [
      { slotTimeStr: "11:00 AM", stallName: "Power World Gyms", queueNumber: "PW-024" },
      { slotTimeStr: "11:10 AM", stallName: "Vision Care", queueNumber: "VC-018" },
      { slotTimeStr: "11:20 AM", stallName: "Lanka Hospitals", queueNumber: "LH-031" },
      { slotTimeStr: "11:30 AM", stallName: "Janashakthi Life (Mandatory)", queueNumber: "JS-042" },
    ];
    setSchedule(dummySchedule);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] flex flex-col items-center py-12 px-4 font-sans">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <div className="mb-6 border-b pb-4">
          <span className="text-xs font-bold tracking-widest bg-[#FFD700] text-black px-2 py-1 uppercase rounded">
            Janashakthi Wellness 360
          </span>
          <h1 className="text-2xl font-black mt-3 text-black">Participant Registration</h1>
          <p className="text-sm text-gray-600 mt-1">Secure your corporate wellness session queue numbers.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kasun Perera"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">Mobile Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0771234567"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="bg-yellow-50 border-l-4 border-[#FFD700] p-3 text-xs text-black">
              📌 <strong>Janashakthi Life</strong> session is automatically included as a mandatory corporate appointment for all participants.
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider">Select Optional Wellness Experiences</label>
              {optionalStalls.map((stall) => (
                <label key={stall.id} className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedStalls.includes(stall.id)}
                    onChange={() => handleCheckboxChange(stall.id)}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="text-sm font-medium">{stall.name}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#111111] text-[#FFD700] font-bold py-3 rounded-lg hover:bg-black/90 transition shadow-md mt-4"
            >
              Generate Wellness Schedule
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="bg-green-50 text-green-800 p-3 rounded-lg text-sm font-medium">
              Registration Successful! WhatsApp schedule dispatched.
            </div>
            <h2 className="font-bold text-lg text-left border-b pb-2">Schedule for {name}</h2>
            <div className="space-y-3 text-left">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border">
                  <div>
                    <div className="font-bold text-sm">{item.stallName}</div>
                    <div className="text-xs text-gray-500">Time: {item.slotTimeStr}</div>
                  </div>
                  <span className="bg-[#FFD700] text-black font-mono font-bold px-2 py-1 text-xs rounded">
                    {item.queueNumber}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-gray-100 text-black font-semibold py-2 rounded-lg hover:bg-gray-200 mt-4 text-sm"
            >
              Register Another Participant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
