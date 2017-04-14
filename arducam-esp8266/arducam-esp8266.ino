#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#include <Wire.h>
#include <ArduCAM.h>
#include <SPI.h>
#include "memorysaver.h"
#include <WebSocketServer.h>

// Enabe debug tracing to Serial port.
#define DEBUGGING

// Here we define a maximum framelength to 64 bytes. Default is 256.
#define MAX_FRAME_LENGTH 64

// Define how many callback functions you have. Default is 1.
#define CALLBACK_FUNCTIONS 1

#if defined(ESP8266)
// set GPIO15 as the slave select :
const int CS = 16;
#else
// set pin 10 as the slave select :
const int CS = 10;
#endif



const char* ssid = "Shubham";
const char* password = "shubham1234";

int camPin = 0;
int ledPin = 2;

// Create an instance of the server
// specify the port to listen on as an argument
WiFiServer server(80);
WebSocketServer webSocketServer;

void read_fifo_burst(ArduCAM myCAM);

ArduCAM myCAM(OV2640, CS);

// send the client the analog value of a pin
void sendClientData(char *data, int size, unsigned char header) {
  webSocketServer.sendData(data, size, header);
}

void setup() {
  // put your setup code here, to run once:
  uint8_t vid, pid;
  uint8_t temp;
  pinMode(camPin,INPUT);
  digitalWrite(ledPin, LOW);
  pinMode(ledPin, OUTPUT);

#if defined(__AVR__) || defined(ESP8266)
  Wire.begin();
#endif
#if defined(__arm__)
  Wire1.begin();
#endif
  Serial.begin(115200);
  Serial.println("ArduCAM Start!");

  // set the CS as an output:
  pinMode(CS, OUTPUT);

  // initialize SPI:
  SPI.begin();

  //Check if the ArduCAM SPI bus is OK
  myCAM.write_reg(ARDUCHIP_TEST1, 0x55);
  temp = myCAM.read_reg(ARDUCHIP_TEST1);
  //Serial.println(temp);
  if (temp != 0x55)
  {
    Serial.println("SPI1 interface Error!");
    //while(1);
  }

  //Check if the camera module type is OV2640
  myCAM.wrSensorReg8_8(0xff, 0x01);
  myCAM.rdSensorReg8_8(OV2640_CHIPID_HIGH, &vid);
  myCAM.rdSensorReg8_8(OV2640_CHIPID_LOW, &pid);
  if ((vid != 0x26) || (pid != 0x42))
    Serial.println("Can't find OV2640 module!");
  else
    Serial.println("OV2640 detected.");

  //Change to JPEG capture mode and initialize the OV2640 module
  myCAM.set_format(JPEG);
  myCAM.InitCAM();
  myCAM.OV2640_set_JPEG_size(OV2640_1024x768);
  //myCAM.OV2640_set_JPEG_size(OV2640_640x480);
  myCAM.clear_fifo_flag();
  myCAM.write_reg(ARDUCHIP_FRAMES, 0x00);

  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  // Start the server
  server.begin();
  Serial.println("Server started");

  // Print the IP address
  Serial.println(WiFi.localIP());
  // This delay is needed to let the WiFi respond properly(very important)
  //delay(1000);
}

void loop() {
  // put your main code here, to run repeatedly:
  String data;
  int total_time = 0;

//  int camValue = digitalRead(camPin);
//  Serial.println("Cam Value = " );
//  Serial.println(camValue);
  if(digitalRead(camPin) == HIGH) {

      Serial.println("Capturing image loop");
      digitalWrite(ledPin,HIGH);
      start_capture();
      while(!myCAM.get_bit(ARDUCHIP_TRIG, CAP_DONE_MASK))
      {
          // wait for cam
      }
      Serial.println("CAM Capture Done!");
      total_time = millis();
      send_to_server(myCAM);
      total_time = millis() - total_time;
      Serial.print("total_time used (in miliseconds):");
      Serial.println(total_time, DEC);
      Serial.println("CAM send Done!");
      //Clear the capture done flag
      myCAM.clear_fifo_flag();
        digitalWrite(ledPin, LOW);
       delay(30000);

  }

  // This delay is needed to let the WiFi respond properly(very important)
}

void start_capture()
{
  myCAM.flush_fifo();
  myCAM.clear_fifo_flag();
  myCAM.start_capture();
}

void send_to_server(ArduCAM myCAM){      //reads out pixels from the Arducam mini module


  WiFiClient client;
//  HTTPClient http;
//  const char * headerkeys[] = {
//    "Content-Type",
//    "Location"
//  } ;
//  size_t headerkeyssize = sizeof(headerkeys)/sizeof(char*);
//
//  int httpCode = -1;
//
//  http.setTimeout(5000);

  Serial.println("Sending to server");

  size_t len = myCAM.read_fifo_length();
  if (len >= 393216) {
    Serial.println("Over size."); return;
  } else if (len == 0) {
    Serial.println("Size is 0."); return;
  }

  Serial.print("Length in bytes: "); Serial.println(len); Serial.println();
  myCAM.CS_LOW(); myCAM.set_fifo_burst(); SPI.transfer(0xFF);

  if (client.connect("slycam.incognitech.in", 80)) {
    while(client.available()) {
      String line = client.readStringUntil('\r');
    }  // Empty wifi receive bufffer

  String start_request = ""; String end_request = "";
  start_request = start_request +
  "\r\n--AaB03x\r\n" +
  "Content-Disposition: form-data; name=\"userfile\"; filename=\"userfile.jpeg\"\r\n" +
  "Content-Type: image/jpeg\r\n" +
  "Content-Transfer-Encoding: binary\r\n\r\n";

  end_request = end_request + "\r\n--AaB03x--\r\n";  // in file upload POST method need to specify arbitrary boundary code

  uint16_t full_length;
  full_length = start_request.length() + len + end_request.length();

    Serial.println("POST /api/post-photo/ HTTP/1.1");
    Serial.println("Host: slycam.incognitech.in");
    Serial.println("Content-Type: multipart/form-data; boundary=AaB03x");
    Serial.print("Content-Length: "); Serial.println(full_length);
    Serial.print(start_request); Serial.println("Here are sent picture data"); Serial.println(end_request);

    client.println("POST /api/post-photo HTTP/1.1");
    client.println("Host: slycam.incognitech.in");
    client.println("Content-Type: multipart/form-data; boundary=AaB03x");
    client.print("Content-Length: "); client.println(full_length);
    client.print(start_request);

  // Read image data from Arducam mini and send away to internet
  static const size_t bufferSize = 1024; // original value 4096 caused split pictures
  static uint8_t buffer[bufferSize] = {0xFF};
  while (len) {
      size_t will_copy = (len < bufferSize) ? len : bufferSize;
      SPI.transferBytes(&buffer[0], &buffer[0], will_copy);
      if (!client.connected()) break;
      client.write(&buffer[0], will_copy);
      len -= will_copy;
      }

     client.println(end_request);
     myCAM.CS_HIGH();
  }

  // Read  the reply from server
  //delay(5000);
  int i = 0;
  while((!client.available()) && (i<1000)){
      delay(10);
      i++;
    }

  while(client.available()){ String line = client.readStringUntil('\r'); Serial.print(line);}
  client.stop();
  while(client.available()){ String line = client.readStringUntil('\r'); Serial.print(line);}

}
