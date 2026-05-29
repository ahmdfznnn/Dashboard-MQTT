#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// Fill in SSID and password later
const char *WIFI_SSID = "IOT";
const char *WIFI_PASS = "U17d!pT01";

const char *MQTT_HOST = "w0fd5a1c.ala.us-east-1.emqxsl.com";
const uint16_t MQTT_PORT = 8883;
const char *MQTT_USER = "fauzian20";
const char *MQTT_PASS = "ahmadfauzian";

// Paste the EMQX CA certificate here (PEM). If left empty, TLS will be insecure.
static const char *CA_CERT = R"EOF(

)EOF";

const char *TOPIC_ALL = "iot/dashboard";

WiFiClientSecure secureClient;
PubSubClient mqttClient(secureClient);

unsigned long lastPublishMs = 0;
const unsigned long publishIntervalMs = 5000;

void connectWifi() {
  if (WiFi.status() == WL_CONNECTED) {
    return;
  }

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  Serial.print("Connecting to WiFi: ");
  Serial.println(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print('.');
  }
  Serial.println();
  Serial.print("WiFi connected, IP: ");
  Serial.println(WiFi.localIP());
}

void ensureMqtt() {
  if (mqttClient.connected()) {
    return;
  }

  String clientId = "esp32-dummy-" + String((uint32_t)ESP.getEfuseMac(), HEX);

  Serial.print("Connecting to MQTT");
  while (!mqttClient.connected()) {
    bool ok = mqttClient.connect(clientId.c_str(), MQTT_USER, MQTT_PASS);
    if (ok) {
      Serial.println(" connected");
      break;
    }

    Serial.print('.');
    delay(1000);
  }
}

float randomRange(float minVal, float maxVal) {
  const uint32_t r = (uint32_t)random(0, 10000);
  return minVal + (maxVal - minVal) * (r / 10000.0f);
}

void publishDummyData() {
  float suhu = randomRange(24.0f, 34.0f);
  float kelembapan = randomRange(45.0f, 85.0f);
  float kecepatanAngin = randomRange(0.1f, 9.5f);
  int pushButton = random(0, 2);
  int led = random(0, 2);

  char payload[160];
  snprintf(payload, sizeof(payload),
           "{\"suhu\":%.2f,\"kelembapan\":%.2f,\"kecepatan_angin\":%.2f,\"push_button\":%d,\"led\":%d}",
           suhu, kelembapan, kecepatanAngin, pushButton, led);

  bool published = mqttClient.publish(TOPIC_ALL, payload, true);

  Serial.print("Publish to ");
  Serial.print(TOPIC_ALL);
  Serial.print(" at ");
  Serial.print(millis());
  Serial.print(" ms -> ");
  Serial.println(published ? "OK" : "FAILED");
  Serial.println(payload);
}

void setup() {
  Serial.begin(9600);
  delay(200);

  if (strstr(CA_CERT, "BEGIN CERTIFICATE") != nullptr) {
    secureClient.setCACert(CA_CERT);
  } else {
    secureClient.setInsecure();
  }

  mqttClient.setServer(MQTT_HOST, MQTT_PORT);

  connectWifi();
  ensureMqtt();

  randomSeed(esp_random());
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWifi();
  }

  if (!mqttClient.connected()) {
    ensureMqtt();
  }

  mqttClient.loop();

  unsigned long now = millis();
  if (now - lastPublishMs >= publishIntervalMs) {
    lastPublishMs = now;
    publishDummyData();
  }
}