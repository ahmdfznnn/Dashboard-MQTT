import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint } from '../types/sensor'

interface RealtimeChartProps {
  title: string
  data: ChartPoint[]
  unit: string
}

export const RealtimeChart = ({ title, data, unit }: RealtimeChartProps) => {
  if (data.length === 0) {
    return (
      <div className="rounded-card bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h3>
        </div>
        <div className="mt-6 flex h-48 items-center justify-center text-sm text-muted">
          No data yet
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-card bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h3>
      </div>
      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#c4c4c4" />
            <YAxis tick={{ fontSize: 12 }} stroke="#c4c4c4" width={36} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid rgba(15, 23, 42, 0.1)',
                boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)',
              }}
              formatter={(value) => [`${value} ${unit}`, title]}
            />
            <Line type="monotone" dataKey="value" stroke="#1d9bf0" strokeWidth={2.4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
