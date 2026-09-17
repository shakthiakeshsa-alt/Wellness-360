// app/admin/dashboard/page.tsx
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest bg-[#FFD700] text-black px-2 py-1 uppercase rounded">
              Admin Control Center
            </span>
            <h1 className="text-3xl font-black mt-2">Janashakthi Wellness 360</h1>
          </div>
          <div className="text-right text-sm text-gray-600">
            <div>Status: <span className="text-green-600 font-bold">● Active Event</span></div>
            <div>Time Window: 11:00 AM – 2:00 PM</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase">Total Registered</div>
            <div className="text-3xl font-black mt-1">1,247</div>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase">Completed Sessions</div>
            <div className="text-3xl font-black mt-1 text-green-600">846</div>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase">Currently Waiting</div>
            <div className="text-3xl font-black mt-1 text-blue-600">73</div>
          </div>
          <div className="bg-white p-5 rounded-xl border shadow-sm">
            <div className="text-xs font-bold text-gray-500 uppercase">No Shows</div>
            <div className="text-3xl font-black mt-1 text-red-600">21</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-bold mb-4">Active Stall Status & Bottlenecks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg bg-yellow-50/50">
              <div className="font-bold">Janashakthi Life (Mandatory)</div>
              <div className="text-sm text-gray-600 mt-1">Now Serving: <span className="font-mono font-bold text-black">JS-184</span></div>
              <div className="text-xs text-amber-700 mt-2 font-semibold">⚠️ Operating at 98% capacity bottleneck</div>
            </div>
            <div className="border p-4 rounded-lg">
              <div className="font-bold">Power World Gyms</div>
              <div className="text-sm text-gray-600 mt-1">Now Serving: <span className="font-mono font-bold text-black">PW-217</span></div>
              <div className="text-xs text-green-600 mt-2 font-semibold">✓ Optimal Flow</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
