# IoT Realtime Dashboard

Frontend dashboard untuk monitoring data IoT realtime via MQTT.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- mqtt.js
- Recharts

## MQTT Config

Edit di `src/config/mqttConfig.ts`:

```
const MQTT_BROKER_URL = "wss://w46c6114.ala.asia-southeast1.emqxsl.com:8084/mqtt";
const MQTT_USERNAME = "Ardi1";
const MQTT_PASSWORD = "ardisalim";
const MQTT_TOPIC = "iot/dashboard";
```

Payload:

```
{"suhu":29.93,"kelembapan":63.12,"kecepatan_angin":8.39,"push_button":1,"led":1}
```

Untuk PB/LED:

```
{"push_button":true}
```

atau

```
{"led":"ON"}
```

## Install & Run

```
npm create vite@latest iot-dashboard -- --template react-ts
cd iot-dashboard
npm install
npm install mqtt recharts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

## Development

```
npm install
npm run dev
```
