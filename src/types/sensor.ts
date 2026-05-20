export type SensorKey =
  | 'suhu'
  | 'kelembapan'
  | 'kecepatan_angin'
  | 'push_button'
  | 'led'

export type ConnectionStatus = 'connected' | 'disconnected' | 'reconnecting'

export type SensorRawValue = number | boolean | string | null

export interface SensorState {
  value: SensorRawValue
  lastUpdated: number | null
}

export interface ChartPoint {
  time: string
  value: number | null
}

export interface MqttDataState {
  connectionStatus: ConnectionStatus
  lastMessageAt: number | null
  sensors: Record<SensorKey, SensorState>
  charts: {
    suhu: ChartPoint[]
    kelembapan: ChartPoint[]
    kecepatan_angin: ChartPoint[]
  }
}
