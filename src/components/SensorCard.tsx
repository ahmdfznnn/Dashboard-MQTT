import type { SensorRawValue } from '../types/sensor'

interface SensorCardProps {
  title: string
  value: SensorRawValue
  unit?: string
  statusMode?: boolean
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(value)
}

export const SensorCard = ({ title, value, unit, statusMode = false }: SensorCardProps) => {
  let displayValue = '--'
  let statusLabel: string | null = null
  let statusClasses = ''

  if (typeof value === 'number') {
    if (statusMode && (value === 1 || value === 0)) {
      statusLabel = value === 1 ? 'ON' : 'OFF'
    } else {
      displayValue = formatNumber(value)
    }
  } else if (typeof value === 'boolean') {
    statusLabel = value ? 'ON' : 'OFF'
  } else if (typeof value === 'string') {
    const upper = value.trim().toUpperCase()
    if (upper === 'ON' || upper === 'OFF') {
      statusLabel = upper
    } else if (value.trim()) {
      displayValue = value
    }
  }

  if (statusLabel) {
    statusClasses = statusLabel === 'ON' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
  }

  return (
    <div className="rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-400 hover:shadow-xl transition-all duration-300 p-6 shadow-md">
      <p className="text-xs font-bold uppercase tracking-widest text-muted">{title}</p>
      <div className="mt-4 flex items-baseline gap-2">
        {statusLabel ? (
          <span className={`rounded-lg px-3 py-2 text-xs font-bold ${statusClasses}`}>
            {statusLabel}
          </span>
        ) : (
          <>
            <span className="text-4xl font-bold text-cyan-300">{displayValue}</span>
            {unit ? <span className="text-xs font-semibold text-muted">{unit}</span> : null}
          </>
        )}
      </div>
    </div>
  )
}
