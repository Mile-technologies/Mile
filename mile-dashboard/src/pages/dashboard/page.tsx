export const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Rides</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Active Drivers</h3>
          <p className="text-2xl font-bold">56</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
      </div>
    </div>
  )
}
