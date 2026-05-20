import type { ConnectionStatus } from '../types/sensor'

interface StatusBadgeProps {
  status: ConnectionStatus
}

const STATUS_STYLES: Record<ConnectionStatus, { label: string; classes: string; dot: string }> = {
  connected: {
    label: 'Connected',
    classes: 'border-success/30 bg-success/15 text-success',
    dot: 'bg-success',
  },
  disconnected: {
    label: 'Disconnected',
    classes: 'border-danger/30 bg-danger/15 text-danger',
    dot: 'bg-danger',
  },
  reconnecting: {
    label: 'Reconnecting',
    classes: 'border-warning/40 bg-warning/15 text-warning',
    dot: 'bg-warning',
  },
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = STATUS_STYLES[status]

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${config.classes}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  )
}
