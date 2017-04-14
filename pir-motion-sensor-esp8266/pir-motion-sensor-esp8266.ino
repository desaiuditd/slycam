
/* Code for PIR motion sensor and switching on LED if there is any motion */

int pirValue;
int ledPin = 4;
int pirPin = 5; // Input for HC-SR501


void setup() {
  pinMode(pirPin, INPUT);
  digitalWrite(ledPin, LOW);
  pinMode(ledPin, OUTPUT);
  delay(1000);
}

void loop() {
  pirValue = digitalRead(pirPin);
  Serial.println(pirValue);
  Serial.println("Pir");
  digitalWrite(ledPin, pirValue);

}


