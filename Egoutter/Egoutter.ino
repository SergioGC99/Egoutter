#include "WiFiEsp.h"
#include "SoftwareSerial.h"
#include "DHT.h"

#define DHTPIN 3 
#define DHTTYPE DHT22
double sensorPin =A0;
double sensorValue = 0; 
DHT dht(DHTPIN, DHTTYPE);


// Socket y Wifi
char ssid[] = "AndroidAPBFEC";   // SSID (nombre de red) ///AndroidAPBFEC     UTT-ALUMNOS  IZZI-DE42            UTT
char pass[] = "qwerty01";       // PR0Y3.2019      Clave de tu red wifi   qwerty01        E8HKq32rw-UT  189C27EFDE42     UTT2019.W1F1
int status = WL_IDLE_STATUS;     // El estado de tu modulo wifi
byte server[] = { 192, 168, 43, 153 };    //172.10.11.44
WiFiEspClient client;

// Temperatura
unsigned long lastSend = 0;

void setup() {
  // Serial para depuracion
  Serial.begin(9600);

  // Temperatura
  dht.begin();

  // Wifi
  // Serial para comunicacion con modulo wifi esp
  Serial1.begin(9600);
  lastSend = 0;

  // Inicializar modulo wifi
  WiFi.init(&Serial1);

  // Probar si no esta el modulo wifi
  if(WiFi.status() == WL_NO_SHIELD)
  {
    Serial.println(F("Modulo Wifi no presente"));
    // No continuar
    while (true);
  }

  while(status != WL_CONNECTED)
  {
    // Intentar conectarnos a la red wifi
    Serial.print(F("Intentando conectar a la red wifi:" ));
    Serial.println(ssid);
    // Conectarse a la red wifi
    status = WiFi.begin(ssid, pass);
  }

  // Ya estas conectado imprimir estado de la red wifi
  Serial.println(F("Estas conectado a la red wifi"));

  imprimeEstadoWifi();
  conectarSocket();
}

void loop() {
  

  // Reconectar si es necesario
  while(!client.connected()) {
    conectarSocket();
    delay(1000);
  }

  // Leer datos del servidor
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  // Mandar datos de temperatura
      String datos = tomarTemperatura();
      client.println(datos);
      Serial.println(datos);
      client.flush();
      
  sensorValue = analogRead(sensorPin);
   Serial.println("Humedad de la tierra:");
    Serial.println(sensorValue);

  // Tiempo de Espera
  delay(2000);

   


 delay(30); 
}

void imprimeEstadoWifi()
{
  // Imprimir SSID o Nombre de Red a la que estamos conectados
  Serial.print(F("SSID: "));
  Serial.println(WiFi.SSID());

  // Imprimir la direccion ip del modulo wifi
  IPAddress ip = WiFi.localIP();
  Serial.print(F("Direccion IP: "));
  Serial.println(ip);

  // Imprime la fuerza de la senal
  long rssi = WiFi.RSSI();
  Serial.print(F("Fuerza de la senal (RSSI): "));
  Serial.print(rssi);
  Serial.println(F(" dBm"));
}

void conectarSocket()
{
  Serial.println();
  Serial.println(F("Intentar conectar al socket"));
  
  if(client.connect(server, 8080)) {
    Serial.println(F("Conexion Exitosa"));
    client.println(tomarTemperatura());
  }
  else
  {
    Serial.println(F("Conexion fallida"));
  }
}

String tomarTemperatura()
{
  String temperature = String(dht.readTemperature());
  String moisture = String(dht.readHumidity());
  String humidity = String(sensorValue);
  String r = "{\"temperature\": "+ temperature +", \"moisture\": "+ moisture +", \"humidity\": " + humidity + "}";
           Serial.print(r);
           return r;


}
