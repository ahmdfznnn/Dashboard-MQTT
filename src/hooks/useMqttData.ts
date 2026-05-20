import { useEffect, useMemo, useState } from 'react'
import mqtt, { type IClientOptions, type MqttClient } from 'mqtt'
import { MQTT_BROKER_URL, MQTT_PASSWORD, MQTT_TOPIC, MQTT_USERNAME } from '../config/mqttConfig'
import type {
  ChartPoint,
  ConnectionStatus,
  MqttDataState,
  SensorKey,
  SensorRawValue,
} from '../types/sensor'

const MAX_POINTS = 30

const initialSensors: Record<SensorKey, { value: SensorRawValue; lastUpdated: number | null }> = {
  suhu: { value: null, lastUpdated: null },
  kelembapan: { value: null, lastUpdated: null },
  kecepatan_angin: { value: null, lastUpdated: null },
  push_button: { value: null, lastUpdated: null },
  led: { value: null, lastUpdated: null },
}

const initialCharts = {
  suhu: [] as ChartPoint[],
  kelembapan: [] as ChartPoint[],
  kecepatan_angin: [] as ChartPoint[],
}

const normalizeValue = (value: unknown): SensorRawValue => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return null
    }

    const numeric = Number(trimmed)
    if (!Number.isNaN(numeric) && trimmed.match(/^-?\d+(\.\d+)?$/)) {
      return numeric
    }

    const upper = trimmed.toUpperCase()
    if (['ON', 'TRUE', '1'].includes(upper)) {
      return true
    }
    if (['OFF', 'FALSE', '0'].includes(upper)) {
      return false
    }

    return trimmed
  }

  return null
}

const parsePayloadValue = (payload: string, key: string): SensorRawValue | null => {
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>
    if (!parsed || !(key in parsed)) {
      return null
    }
    return normalizeValue(parsed[key])
  } catch {
    return null
  }
}

export const useMqttData = (): MqttDataState => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected')
  const [lastMessageAt, setLastMessageAt] = useState<number | null>(null)
  const [sensors, setSensors] = useState(initialSensors)
  const [charts, setCharts] = useState(initialCharts)

  useEffect(() => {
    let client: MqttClient | null = null

    const connectClient = () => {
      const options: IClientOptions = {
        reconnectPeriod: 2000,
        connectTimeout: 4000,
        username: MQTT_USERNAME,
        password: MQTT_PASSWORD,
      }

      client = mqtt.connect(MQTT_BROKER_URL, options)

      client.on('connect', () => {
        setConnectionStatus('connected')
        client?.subscribe(MQTT_TOPIC)
      })

      client.on('reconnect', () => {
        setConnectionStatus('reconnecting')
      })

      client.on('close', () => {
        setConnectionStatus('disconnected')
      })

      client.on('offline', () => {
        setConnectionStatus('disconnected')
      })

      client.on('error', () => {
        setConnectionStatus('disconnected')
      })

      client.on('message', (topic, message) => {
        if (topic !== MQTT_TOPIC) {
          return
        }

        const payloadText = message.toString()
        const timestamp = Date.now()

        const nextSensors: Partial<typeof initialSensors> = {}
        let hasUpdate = false

        ;(Object.keys(initialSensors) as SensorKey[]).forEach((key) => {
          const payloadValue = parsePayloadValue(payloadText, key)
          if (payloadValue === null || payloadValue === undefined) {
            return
          }
          hasUpdate = true
          nextSensors[key] = { value: payloadValue, lastUpdated: timestamp }
        })

        if (!hasUpdate) {
          return
        }

        setLastMessageAt(timestamp)

        setSensors((prev) => ({
          ...prev,
          ...nextSensors,
        }))

        const time = new Date(timestamp).toLocaleTimeString('id-ID', {
          hour12: false,
        })

        setCharts((prev) => {
          const updated = { ...prev }
          ;(['suhu', 'kelembapan', 'kecepatan_angin'] as const).forEach((key) => {
            const nextValue = nextSensors[key]?.value
            if (typeof nextValue === 'number' && Number.isFinite(nextValue)) {
              updated[key] = [...updated[key], { time, value: nextValue }].slice(-MAX_POINTS)
            }
          })
          return updated
        })
      })
    }

    connectClient()

    return () => {
      client?.end(true)
      client = null
    }
  }, [])

  return {
    connectionStatus,
    lastMessageAt,
    sensors,
    charts,
  }
}
