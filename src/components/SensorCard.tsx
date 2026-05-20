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
    <div className="rounded-card bg-white p-5 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</p>
      <div className="mt-3 flex items-baseline gap-2">
        {statusLabel ? (
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClasses}`}>
            {statusLabel}
          </span>
        ) : (
          <span className="text-3xl font-semibold text-ink">{displayValue}</span>
        )}
        {!statusLabel && unit ? <span className="text-sm text-muted">{unit}</span> : null}
      </div>
    </div>
  )
}
