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
    <div className="min-h-screen bg-surface px-4 py-6 text-ink sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-card bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              IoT Monitoring
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              IoT Realtime Dashboard
            </h1>
            <p className="mt-2 text-sm text-muted">
              Last update: <span className="font-semibold text-ink">{formatTimestamp(lastMessageAt)}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={connectionStatus} />
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <SensorCard title="Suhu" value={sensors.suhu.value} unit="°C" />
          <SensorCard title="Kelembapan" value={sensors.kelembapan.value} unit="%" />
          <SensorCard title="Kecepatan Angin" value={sensors.kecepatan_angin.value} unit="m/s" />
          <SensorCard title="Push Button" value={sensors.push_button.value} statusMode />
          <SensorCard title="LED" value={sensors.led.value} statusMode />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <RealtimeChart title="Grafik Suhu" data={charts.suhu} unit="°C" />
          <RealtimeChart title="Grafik Kelembapan" data={charts.kelembapan} unit="%" />
          <RealtimeChart title="Grafik Kecepatan Angin" data={charts.kecepatan_angin} unit="m/s" />
        </section>
      </div>
    </div>
  )
}

export default App
