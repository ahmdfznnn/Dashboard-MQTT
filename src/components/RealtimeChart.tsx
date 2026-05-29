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
      <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 shadow-md">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">{title}</h3>
        <div className="mt-6 flex h-48 items-center justify-center text-sm text-slate-500">
          Waiting for data...
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 shadow-md">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted">{title}</h3>
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#475569" />
            <YAxis tick={{ fontSize: 12 }} stroke="#475569" width={36} />
            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                border: '1px solid rgba(34, 197, 255, 0.4)',
                backgroundColor: '#1e293b',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                color: '#ecf0f7',
              }}
              formatter={(value) => [`${value} ${unit}`, title]}
              labelStyle={{ color: '#ecf0f7' }}
            />
            <Line type="monotone" dataKey="value" stroke="#00d9ff" strokeWidth={2.5} dot={false} isAnimationActive={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
