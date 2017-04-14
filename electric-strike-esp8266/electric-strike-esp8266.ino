
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Shubham";
const char* password = "scu12345";


int voltageBit = 4;
void setup () {

 pinMode(voltageBit, OUTPUT);
 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("Connecting");
    delay(1000);
  }

  Serial.print("Connected to: ");
  Serial.print(WiFi.SSID());
  Serial.print(", IP address: ");
  Serial.println(WiFi.localIP());
 
}

void loop() {

 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
 
    HTTPClient http;  //Declare an object of class HTTPClient
 
    http.begin("http://slycam.incognitech.in/api/check-lock-status");  //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request
//    Serial.println("Code : " + httpCode);
    if (httpCode > 0) { //Check the returning code

    String payload =  http.getString();
    const char *json = payload.c_str();

      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& root = jsonBuffer.parseObject(json);

      if (!root.success()) {
        Serial.println("parseObject() failed");
        return;
      }
      const char* lockStatus = root["status"];
      if(strcmp(lockStatus, "lock") == 0){
        Serial.println("LOCK");
        digitalWrite(voltageBit, LOW);
      }
      else {
         digitalWrite(voltageBit, HIGH);
        Serial.println("UNLOCK");
      }
 
    }
 
    http.end();   //Close connection
 
  }
  else {
      while (WiFi.status() != WL_CONNECTED) {
      Serial.println("Connecting");
      delay(1000);
    }
  
    Serial.print("Connected to: ");
    Serial.print(WiFi.SSID());
    Serial.print(", IP address: ");
    Serial.println(WiFi.localIP());
  }
 // polling every 2 second;
  delay(2000);    
 
}
