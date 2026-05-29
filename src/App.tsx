import { RealtimeChart } from './components/RealtimeChart'
import { SensorCard } from './components/SensorCard'
import { StatusBadge } from './components/StatusBadge'
import { useMqttData } from './hooks/useMqttData'

const formatTimestamp = (timestamp: number | null) => {
  if (!timestamp) {
    return '--'
  }
  return new Date(timestamp).toLocaleString('id-ID', {
    hour12: false,
  })
}

function App() {
  const { connectionStatus, lastMessageAt, sensors, charts } = useMqttData()

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Top Header Bar */}
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                IoT Realtime System
              </p>
              <h1 className="mt-2 text-3xl font-bold text-white">
                Dashboard Monitor
              </h1>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted">
                Last Update
              </p>
              <p className="mt-1 text-lg font-semibold text-cyan-300">
                {formatTimestamp(lastMessageAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Status Section */}
        <div className="mb-8 rounded-lg bg-gradient-to-r from-slate-800 to-slate-800 border border-slate-700 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted">Connection Status</p>
              <p className="mt-1 text-base text-slate-300">MQTT Broker Connection</p>
            </div>
            <StatusBadge status={connectionStatus} />
          </div>
        </div>

        {/* Sensor Cards Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-cyan-400">
            📊 Real-time Sensors
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <SensorCard title="Suhu" value={sensors.suhu.value} unit="°C" />
            <SensorCard title="Kelembapan" value={sensors.kelembapan.value} unit="%" />
            <SensorCard title="Angin" value={sensors.kecepatan_angin.value} unit="m/s" />
            <SensorCard title="Push Button" value={sensors.push_button.value} statusMode />
            <SensorCard title="LED" value={sensors.led.value} statusMode />
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-cyan-400">
            📈 Analytics & Trends
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            <RealtimeChart title="Suhu (°C)" data={charts.suhu} unit="°C" />
            <RealtimeChart title="Kelembapan (%)" data={charts.kelembapan} unit="%" />
            <RealtimeChart title="Angin (m/s)" data={charts.kecepatan_angin} unit="m/s" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
