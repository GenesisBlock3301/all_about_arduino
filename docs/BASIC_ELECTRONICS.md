# Basic Electronics with Arduino — Tinkercad Guide

> Learn basic to advanced electronics and Arduino programming using **Tinkercad** (free online simulator) — no physical components required.

---

## Table of Contents

1. [Getting Started with Tinkercad](#1-getting-started-with-tinkercad)
2. [Basic Electronics Concepts](#2-basic-electronics-concepts)
3. [Level 1 — Breadboard, Power & Your First Circuit](#3-level-1--breadboard-power--your-first-circuit)
4. [Level 2 — Ohm's Law, Resistors & LEDs](#4-level-2--ohms-law-resistors--leds)
5. [Level 3 — Digital Inputs (Buttons & Switches)](#5-level-3--digital-inputs-buttons--switches)
6. [Level 4 — Analog World (Potentiometers & Voltage Dividers)](#6-level-4--analog-world-potentiometers--voltage-dividers)
7. [Level 5 — PWM (Fading, Servos & Motor Speed)](#7-level-5--pwm-fading-servos--motor-speed)
8. [Level 6 — Sensors (LDR, Temperature & Distance)](#8-level-6--sensors-ldr-temperature--distance)
9. [Level 7 — Displays (7-Segment & LCD)](#9-level-7--displays-7-segment--lcd)
10. [Level 8 — Motors & Actuators (DC, Servo, Stepper)](#10-level-8--motors--actuators-dc-servo-stepper)
11. [Level 9 — Advanced Integration (Multi-Sensor Systems)](#11-level-9--advanced-integration-multi-sensor-systems)
12. [Level 10 — Capstone Projects](#12-level-10--capstone-projects)
13. [Quick Reference](#13-quick-reference)

---

## 1. Getting Started with Tinkercad

**Tinkercad** is a free, browser-based electronics simulator by Autodesk. You can build circuits, write Arduino code, and simulate everything instantly.

### How to Start
1. Go to [https://tinkercad.com](https://tinkercad.com) and create a free account
2. Click **Circuits** → **Create new Circuit**
3. Drag components from the right sidebar onto the workspace
4. Click a component pin, then click another pin to wire them
5. Click **Code** to write Arduino code
6. Click **Start Simulation** to run

### Tinkercad Interface
```
┌─────────────────────────────────────────┐
│  [Workspace]        │  [Components]     │
│                     │  - Arduino Uno    │
│  [Your Circuit]     │  - Breadboard     │
│                     │  - LEDs           │
│                     │  - Resistors      │
│                     │  - Sensors        │
│                     │  - Motors         │
├─────────────────────┴───────────────────┤
│  [Code Editor]  [Start Simulation]      │
└─────────────────────────────────────────┘
```

> **Tip:** Right-click wires to change colors. Use **Red** for 5V, **Black** for GND, and other colors for signals.

---

## 2. Basic Electronics Concepts

Before building circuits, understand these fundamentals:

### 2.1 Voltage, Current & Resistance

| Term | Symbol | Unit | Analogy |
|------|--------|------|---------|
| **Voltage** | V | Volts (V) | Water pressure in a pipe |
| **Current** | I | Amperes (A) | Flow rate of water |
| **Resistance** | R | Ohms (Ω) | Narrowness of the pipe |

### 2.2 Ohm's Law

```
V = I × R
```

If you know any two values, you can find the third:
- **Voltage** = Current × Resistance
- **Current** = Voltage ÷ Resistance
- **Resistance** = Voltage ÷ Current

### 2.3 LED Forward Voltage

An LED doesn't behave like a resistor. It has a **forward voltage drop** (Vf):
- Red LED: ~2V
- Green/Yellow LED: ~2.1V
- Blue/White LED: ~3.3V

If you connect an LED directly to 5V without a resistor, too much current flows and it burns out.

### 2.4 Calculating LED Resistor

```
R = (V_source - V_LED) ÷ I_desired
```

Example: 5V source, Red LED (2V), want 15mA (0.015A):
```
R = (5V - 2V) ÷ 0.015A = 3 ÷ 0.015 = 200Ω
```
Use **220Ω** (standard value).

### 2.5 Breadboard Layout

```
        ┌─────────────────────────────┐
   (+) ─┤ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ├─ (+)  ← Power Rail (Red)
        │                             │
        │  ●  ●  ●  ●  ●  ●  ●  ●  ●  │      ← Middle rows are connected
        │  ●  ●  ●  ●  ●  ●  ●  ●  ●  │         horizontally (5 holes each)
        │  ●  ●  ●  ●  ●  ●  ●  ●  ●  │
        │  ●  ●  ●  ●  ●  ●  ●  ●  ●  │
        │  ●  ●  ●  ●  ●  ●  ●  ●  ●  │
        │                             │
   (-) ─┤ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ├─ (-)  ← Ground Rail (Blue/Black)
        └─────────────────────────────┘
```

> **Rule:** The top and bottom long rails run the full length of the board. The middle short rows are connected in groups of 5.

---

## 3. Level 1 — Breadboard, Power & Your First Circuit

### Project 1.1: Power Rails & LED (No Code)

**Goal:** Learn breadboard wiring before adding a microcontroller.

**Components:**
- Breadboard
- 9V Battery
- Red LED
- 220Ω Resistor
- Jumper wires

**Circuit:**
```
9V Battery (+) ──► Breadboard (+) rail
9V Battery (-) ──► Breadboard (-) rail

(+) rail ──► LED long leg (anode)
LED short leg (cathode) ──► 220Ω Resistor ──► (-) rail
```

**What You Learn:**
- Breadboard power rails
- LED polarity (long leg = positive)
- Current-limiting resistor purpose

---

### Project 1.2: Blink the Onboard LED

**Goal:** Upload your first Arduino code in Tinkercad.

**Components:**
- Arduino Uno R3

**Code:**
```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);  // Pin 13 has onboard LED
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);  // Turn ON
  delay(1000);                      // Wait 1 second
  digitalWrite(LED_BUILTIN, LOW);   // Turn OFF
  delay(1000);                      // Wait 1 second
}
```

**What You Learn:**
- `setup()` runs once, `loop()` runs forever
- `pinMode()` configures a pin
- `digitalWrite()` sends HIGH (5V) or LOW (0V)
- `delay()` pauses in milliseconds

---

### Project 1.3: Blink an External LED

**Goal:** Control an external component.

**Components:**
- Arduino Uno R3
- Breadboard
- Red LED
- 220Ω Resistor
- Jumper wires

**Circuit:**
```
Arduino 5V ──► Breadboard (+) rail
Arduino GND ──► Breadboard (-) rail

Arduino Pin 13 ──► LED long leg
LED short leg ──► 220Ω Resistor ──► (-) rail
```

**Code:**
```cpp
const int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(500);
  digitalWrite(ledPin, LOW);
  delay(500);
}
```

**What You Learn:**
- Arduino can power external components
- Always use a resistor with LEDs
- `const` makes your code cleaner

---

## 4. Level 2 — Ohm's Law, Resistors & LEDs

### Project 2.1: Multiple LEDs — Traffic Light

**Goal:** Control multiple outputs in sequence.

**Components:**
- Arduino Uno R3
- Breadboard
- Red, Yellow, Green LEDs
- 3 × 220Ω Resistors
- Jumper wires

**Circuit:**
```
Arduino Pin 11 ──► Red LED ──► 220Ω ──► GND
Arduino Pin 12 ──► Yellow LED ──► 220Ω ──► GND
Arduino Pin 13 ──► Green LED ──► 220Ω ──► GND
```

**Code:**
```cpp
const int redPin = 11;
const int yellowPin = 12;
const int greenPin = 13;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  // Red light
  digitalWrite(redPin, HIGH);
  delay(5000);
  digitalWrite(redPin, LOW);

  // Yellow light
  digitalWrite(yellowPin, HIGH);
  delay(2000);
  digitalWrite(yellowPin, LOW);

  // Green light
  digitalWrite(greenPin, HIGH);
  delay(5000);
  digitalWrite(greenPin, LOW);
}
```

**What You Learn:**
- Each output pin is independent
- Sequential control logic
- Real-world timing patterns

---

### Project 2.2: Experiment with Different Resistors

**Goal:** See Ohm's Law in action.

**Components:**
- Arduino Uno R3
- Red LED
- Resistors: 100Ω, 220Ω, 1kΩ (1000Ω), 10kΩ

**Circuit:** Same as Project 1.3, but swap resistors.

**Code:**
```cpp
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);  // Keep LED on
}
```

**What You Learn:**
- 100Ω → Bright LED (higher current, ~30mA)
- 220Ω → Normal brightness (~13mA)
- 1kΩ → Dim LED (~3mA)
- 10kΩ → Very dim / barely visible (~0.3mA)

> **Formula Check:** For 220Ω, I = (5V - 2V) / 220Ω = 13.6mA. Perfect!

---

### Project 2.3: RGB LED — Color Mixing

**Goal:** Understand common cathode RGB LEDs.

**Components:**
- Arduino Uno R3
- Common Cathode RGB LED
- 3 × 220Ω Resistors

**Circuit:**
```
Arduino Pin 9  ──► 220Ω ──► Red leg
Arduino Pin 10 ──► 220Ω ──► Green leg
Arduino Pin 11 ──► 220Ω ──► Blue leg
RGB Common leg ──► GND
```

**Code:**
```cpp
const int redPin = 9;
const int greenPin = 10;
const int bluePin = 11;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  // Red
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, LOW);
  delay(1000);

  // Green
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, LOW);
  delay(1000);

  // Blue
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
  delay(1000);

  // Yellow (Red + Green)
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, LOW);
  delay(1000);
}
```

**What You Learn:**
- RGB LEDs combine colors
- Common cathode = common GND, individual positive pins
- Color mixing with light (additive color)

---

## 5. Level 3 — Digital Inputs (Buttons & Switches)

### Project 3.1: Button Controls LED

**Goal:** Read a digital input and make a decision.

**Components:**
- Arduino Uno R3
- Pushbutton
- Red LED + 220Ω Resistor
- 10kΩ Resistor (pull-down)

**Circuit:**
```
5V ──► Pushbutton one side
Pushbutton other side ──► Arduino Pin 2 AND 10kΩ ──► GND

Arduino Pin 13 ──► LED ──► 220Ω ──► GND
```

**Code:**
```cpp
const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);  // Button pressed → LED ON
  } else {
    digitalWrite(ledPin, LOW);   // Button released → LED OFF
  }
}
```

**What You Learn:**
- `digitalRead()` reads pin state (HIGH/LOW)
- Pull-down resistor keeps pin LOW when button is open
- Without 10kΩ resistor, pin "floats" and gives random values

---

### Project 3.2: Toggle LED with Button (State Change)

**Goal:** One press turns ON, next press turns OFF.

**Code:**
```cpp
const int buttonPin = 2;
const int ledPin = 13;

int ledState = LOW;
int lastButtonState = LOW;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  // Detect state change (press, not hold)
  if (buttonState == HIGH && lastButtonState == LOW) {
    ledState = !ledState;  // Toggle state
    digitalWrite(ledPin, ledState);
    delay(200);  // Simple debounce
  }

  lastButtonState = buttonState;
}
```

**What You Learn:**
- Detecting a "press event" vs "button held"
- State variables
- Simple debouncing (prevents multiple triggers from one press)

---

### Project 3.3: Internal Pull-Up Resistor

**Goal:** Simplify wiring using Arduino's built-in pull-up.

**Circuit:**
```
Arduino Pin 2 ──► Pushbutton one side
GND ──► Pushbutton other side

// No external resistor needed!
```

**Code:**
```cpp
const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);  // Enable internal pull-up
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  // With pull-up: HIGH = not pressed, LOW = pressed
  if (buttonState == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
```

**What You Learn:**
- `INPUT_PULLUP` uses Arduino's internal ~20kΩ resistor
- Inverted logic: pressed = LOW
- Less wiring, cleaner circuits

---

## 6. Level 4 — Analog World (Potentiometers & Voltage Dividers)

### Project 4.1: Read a Potentiometer

**Goal:** Understand analog inputs and the Serial Monitor.

**Components:**
- Arduino Uno R3
- 10kΩ Potentiometer

**Circuit:**
```
Potentiometer left pin  ──► 5V
Potentiometer right pin ──► GND
Potentiometer middle pin ──► Arduino A0
```

**Code:**
```cpp
const int potPin = A0;

void setup() {
  Serial.begin(9600);  // Start Serial communication
}

void loop() {
  int potValue = analogRead(potPin);  // Read 0-1023
  Serial.println(potValue);           // Print to Serial Monitor
  delay(100);
}
```

**What You Learn:**
- `analogRead()` converts 0V–5V to 0–1023 (10-bit resolution)
- A potentiometer is a variable voltage divider
- Serial Monitor shows live data

---

### Project 4.2: Potentiometer Controls LED Brightness (PWM Preview)

**Goal:** Map analog input to analog output.

**Components:**
- Arduino Uno R3
- 10kΩ Potentiometer
- Red LED + 220Ω Resistor

**Circuit:**
```
Potentiometer ──► A0 (same as 4.1)
Arduino Pin 9 ──► LED ──► 220Ω ──► GND
```

**Code:**
```cpp
const int potPin = A0;
const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int potValue = analogRead(potPin);           // 0 - 1023
  int brightness = map(potValue, 0, 1023, 0, 255);  // Scale to 0 - 255
  analogWrite(ledPin, brightness);
}
```

**What You Learn:**
- `map()` scales one range to another
- `analogWrite()` outputs PWM (simulated analog)
- Direct input-to-output control

---

### Project 4.3: Voltage Divider — Battery Monitor

**Goal:** Measure a voltage higher than 5V safely.

**Components:**
- Arduino Uno R3
- 10kΩ Resistor
- 10kΩ Resistor (two equal resistors)
- 9V Battery

**Circuit:**
```
9V Battery (+) ──► 10kΩ ──► 10kΩ ──► GND
                  │
                  └──► Arduino A0
```

**Code:**
```cpp
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int rawValue = analogRead(sensorPin);  // 0 - 1023

  float voltageAtPin = rawValue * (5.0 / 1023.0);      // Voltage at A0
  float batteryVoltage = voltageAtPin * 2.0;            // Multiply by divider ratio

  Serial.print("Battery: ");
  Serial.print(batteryVoltage);
  Serial.println(" V");
  delay(500);
}
```

**What You Learn:**
- Voltage dividers scale voltage down
- Two equal resistors divide voltage by 2
- Essential for monitoring batteries (LiPo, 9V, 12V)

> **⚠️ Never connect more than 5V directly to an Arduino analog pin!**

---

## 7. Level 5 — PWM (Fading, Servos & Motor Speed)

### Project 5.1: Fade LED In and Out

**Goal:** Understand PWM duty cycle visually.

**Components:**
- Arduino Uno R3
- Red LED + 220Ω Resistor

**Circuit:**
```
Arduino Pin 9 (~) ──► LED ──► 220Ω ──► GND
```

**Code:**
```cpp
const int ledPin = 9;  // Must use PWM pin (~)

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // Fade in: 0 to 255
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(ledPin, brightness);
    delay(10);
  }

  // Fade out: 255 to 0
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(ledPin, brightness);
    delay(10);
  }
}
```

**What You Learn:**
- PWM pins are marked with **~** on Arduino
- `analogWrite(pin, 0-255)` controls duty cycle
- `for` loops create smooth transitions

---

### Project 5.2: Control Servo Motor

**Goal:** Generate precise PWM signals for servo position.

**Components:**
- Arduino Uno R3
- SG90 Servo Motor
- 10kΩ Potentiometer (optional, for manual control)

**Circuit:**
```
Servo red wire    ──► 5V
Servo brown wire  ──► GND
Servo orange wire ──► Arduino Pin 9

// Optional: potentiometer ──► A0
```

**Code:**
```cpp
#include <Servo.h>

Servo myServo;
const int servoPin = 9;

void setup() {
  myServo.attach(servoPin);
}

void loop() {
  myServo.write(0);    // Move to 0 degrees
  delay(1000);
  myServo.write(90);   // Move to 90 degrees (center)
  delay(1000);
  myServo.write(180);  // Move to 180 degrees
  delay(1000);
}
```

**What You Learn:**
- Servos use PWM at a specific frequency (~50Hz, 1000–2000µs pulses)
- `Servo.h` library abstracts the complex timing
- Servo position is absolute (0°–180°)

---

### Project 5.3: Servo + Potentiometer (Manual Control)

**Goal:** Map analog input to servo output.

**Code:**
```cpp
#include <Servo.h>

Servo myServo;
const int servoPin = 9;
const int potPin = A0;

void setup() {
  myServo.attach(servoPin);
}

void loop() {
  int potValue = analogRead(potPin);           // 0 - 1023
  int angle = map(potValue, 0, 1023, 0, 180);  // Scale to servo range
  myServo.write(angle);
  delay(15);  // Give servo time to move
}
```

**What You Learn:**
- Human input → machine output
- `map()` is essential for scaling sensor data
- Servos need time to physically move

---

### Project 5.4: DC Motor Speed Control (Transistor Driver)

**Goal:** Control a motor that needs more current than Arduino can supply.

**Components:**
- Arduino Uno R3
- DC Motor
- NPN Transistor (2N2222) or MOSFET
- 1N4007 Diode (flyback protection)
- 220Ω Resistor (base resistor)
- 10kΩ Potentiometer
- External 9V Battery (for motor)

**Circuit:**
```
Motor Power:
9V Battery (+) ──► Motor one terminal
Motor other terminal ──► Transistor Collector
Transistor Emitter ──► GND

Protection:
1N4007 Diode across motor terminals (cathode to +)

Control:
Arduino Pin 9 ──► 220Ω ──► Transistor Base

Input:
Potentiometer ──► A0
```

**Code:**
```cpp
const int motorPin = 9;
const int potPin = A0;

void setup() {
  pinMode(motorPin, OUTPUT);
}

void loop() {
  int potValue = analogRead(potPin);
  int speed = map(potValue, 0, 1023, 0, 255);
  analogWrite(motorPin, speed);
}
```

**What You Learn:**
- Arduino pins can only supply ~40mA; motors need more
- Transistors act as electronic switches
- Flyback diode protects from voltage spikes when motor turns off
- PWM controls motor speed by controlling average power

---

## 8. Level 6 — Sensors (LDR, Temperature & Distance)

### Project 6.1: Light Detector (LDR / Photoresistor)

**Goal:** Read light intensity and trigger an action.

**Components:**
- Arduino Uno R3
- LDR (Photoresistor)
- 10kΩ Resistor (forms voltage divider)
- Red LED + 220Ω

**Circuit:**
```
5V ──► LDR ──► Arduino A0 ──► 10kΩ ──► GND

Arduino Pin 13 ──► LED ──► 220Ω ──► GND
```

**Code:**
```cpp
const int ldrPin = A0;
const int ledPin = 13;
const int threshold = 500;  // Adjust based on your room light

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightValue = analogRead(ldrPin);
  Serial.println(lightValue);

  if (lightValue < threshold) {
    digitalWrite(ledPin, HIGH);  // Dark → LED ON
  } else {
    digitalWrite(ledPin, LOW);   // Bright → LED OFF
  }

  delay(100);
}
```

**What You Learn:**
- LDR resistance decreases with more light
- Forms a voltage divider with the 10kΩ resistor
- Thresholds create digital behavior from analog sensors
- Night-light / automatic lamp logic

---

### Project 6.2: Temperature Monitor (LM35)

**Goal:** Read real-world temperature.

**Components:**
- Arduino Uno R3
- LM35 Temperature Sensor

**Circuit:**
```
LM35 VCC  ──► 5V
LM35 GND  ──► GND
LM35 OUT  ──► Arduino A0
```

**Code:**
```cpp
const int tempPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int rawValue = analogRead(tempPin);

  float voltage = rawValue * 5.0 / 1023.0;     // Convert to voltage
  float temperatureC = voltage * 100.0;         // LM35: 10mV per °C

  Serial.print("Temperature: ");
  Serial.print(temperatureC);
  Serial.println(" °C");

  delay(1000);
}
```

**What You Learn:**
- Sensors output voltage proportional to physical value
- Datasheets tell you the conversion formula
- LM35 outputs 10mV per degree Celsius

---

### Project 6.3: Distance Measurement (Ultrasonic HC-SR04)

**Goal:** Measure distance using sound echoes.

**Components:**
- Arduino Uno R3
- HC-SR04 Ultrasonic Sensor

**Circuit:**
```
HC-SR04 VCC  ──► 5V
HC-SR04 GND  ──► GND
HC-SR04 TRIG ──► Arduino Pin 9
HC-SR04 ECHO ──► Arduino Pin 10
```

**Code:**
```cpp
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Send trigger pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read echo pulse duration
  long duration = pulseIn(echoPin, HIGH);

  // Calculate distance: speed of sound = 343 m/s
  // Distance in cm = duration * 0.034 / 2
  float distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  delay(200);
}
```

**What You Learn:**
- Ultrasonic sensors send a sound pulse and measure echo time
- `pulseIn()` measures how long a pin stays HIGH
- Speed of sound calculation converts time to distance
- Divided by 2 because sound travels to object AND back

---

## 9. Level 7 — Displays (7-Segment & LCD)

### Project 7.1: 7-Segment Display (Counter)

**Goal:** Display numbers using a 7-segment display.

**Components:**
- Arduino Uno R3
- Common Cathode 7-Segment Display
- 7 × 220Ω Resistors

**Circuit:**
```
Arduino Pins 2-8 ──► 220Ω ──► Segments a-g
Common cathode ──► GND
```

**Code:**
```cpp
// Pins connected to segments a-g
const int segPins[] = {2, 3, 4, 5, 6, 7, 8};

// Segment patterns for digits 0-9 (common cathode: HIGH = ON)
const byte digits[10][7] = {
  {1,1,1,1,1,1,0}, // 0
  {0,1,1,0,0,0,0}, // 1
  {1,1,0,1,1,0,1}, // 2
  {1,1,1,1,0,0,1}, // 3
  {0,1,1,0,0,1,1}, // 4
  {1,0,1,1,0,1,1}, // 5
  {1,0,1,1,1,1,1}, // 6
  {1,1,1,0,0,0,0}, // 7
  {1,1,1,1,1,1,1}, // 8
  {1,1,1,1,0,1,1}  // 9
};

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(segPins[i], OUTPUT);
  }
}

void displayDigit(int num) {
  for (int seg = 0; seg < 7; seg++) {
    digitalWrite(segPins[seg], digits[num][seg]);
  }
}

void loop() {
  for (int i = 0; i <= 9; i++) {
    displayDigit(i);
    delay(1000);
  }
}
```

**What You Learn:**
- 7-segment displays have 7 individual LEDs
- Common cathode = shared GND, individual positive pins
- Arrays and lookup tables simplify code

---

### Project 7.2: LCD 16×2 Display

**Goal:** Display text and sensor values.

**Components:**
- Arduino Uno R3
- LCD 16×2
- 10kΩ Potentiometer (contrast)
- 220Ω Resistor (backlight, optional)

**Circuit:**
```
LCD RS ──► Pin 12
LCD E  ──► Pin 11
LCD D4 ──► Pin 5
LCD D5 ──► Pin 4
LCD D6 ──► Pin 3
LCD D7 ──► Pin 2
LCD VSS ──► GND
LCD VDD ──► 5V
LCD V0  ──► Potentiometer middle (contrast)
LCD A   ──► 5V (backlight +)
LCD K   ──► GND (backlight -)
```

**Code:**
```cpp
#include <LiquidCrystal.h>

// Initialize with pin connections
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);        // 16 columns, 2 rows
  lcd.print("Hello World!");
}

void loop() {
  lcd.setCursor(0, 1);     // Move to second row
  lcd.print(millis() / 1000);  // Display elapsed seconds
  delay(500);
}
```

**What You Learn:**
- LCDs need a potentiometer for contrast adjustment
- `LiquidCrystal.h` handles all communication
- `setCursor(col, row)` positions text

---

### Project 7.3: LCD + Sensor (Live Data Dashboard)

**Goal:** Display live sensor data on LCD.

**Components:**
- Arduino Uno R3
- LCD 16×2
- LM35 Temperature Sensor
- 10kΩ Potentiometer (contrast)

**Code:**
```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
const int tempPin = A0;

void setup() {
  lcd.begin(16, 2);
  lcd.print("Temp Monitor");
}

void loop() {
  int rawValue = analogRead(tempPin);
  float voltage = rawValue * 5.0 / 1023.0;
  float tempC = voltage * 100.0;

  lcd.setCursor(0, 1);
  lcd.print("Temp: ");
  lcd.print(tempC);
  lcd.print(" C    ");  // Extra spaces to clear old digits

  delay(1000);
}
```

**What You Learn:**
- Combining input (sensor) + output (display)
- Real-world data visualization
- Clearing old digits on LCD updates

---

## 10. Level 8 — Motors & Actuators (DC, Servo, Stepper)

### Project 8.1: DC Motor with L293D Motor Driver

**Goal:** Control motor direction and speed safely.

**Components:**
- Arduino Uno R3
- DC Motor
- L293D Motor Driver IC
- 10kΩ Potentiometer
- External power for motor (9V battery)

**Circuit:**
```
L293D Pin 1 (Enable) ──► Arduino Pin 9 (PWM)
L293D Pin 2 (Input 1) ──► Arduino Pin 3
L293D Pin 7 (Input 2) ──► Arduino Pin 4
L293D Pin 3 (Output 1) ──► Motor terminal 1
L293D Pin 6 (Output 2) ──► Motor terminal 2
L293D Pin 8 (VCC2) ──► 9V Battery (+)  ← Motor power
L293D Pin 16 (VCC1) ──► 5V            ← Logic power
L293D Pin 4,5,12,13 ──► GND
```

**Code:**
```cpp
const int enablePin = 9;
const int in1Pin = 3;
const int in2Pin = 4;
const int potPin = A0;

void setup() {
  pinMode(enablePin, OUTPUT);
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
}

void loop() {
  int potValue = analogRead(potPin);
  int speed = map(potValue, 0, 1023, 0, 255);

  // Forward direction
  digitalWrite(in1Pin, HIGH);
  digitalWrite(in2Pin, LOW);
  analogWrite(enablePin, speed);
}
```

**What You Learn:**
- Motor drivers handle high current safely
- Enable pin controls speed (PWM)
- Input pins control direction
- Separate power for motor and logic prevents Arduino damage

---

### Project 8.2: Stepper Motor (28BYJ-48 with ULN2003)

**Goal:** Precise position control with steps.

**Components:**
- Arduino Uno R3
- 28BYJ-48 Stepper Motor
- ULN2003 Driver Board

**Circuit:**
```
ULN2003 IN1 ──► Arduino Pin 8
ULN2003 IN2 ──► Arduino Pin 9
ULN2003 IN3 ──► Arduino Pin 10
ULN2003 IN4 ──► Arduino Pin 11
ULN2003 (+) ──► 5V
ULN2003 (-) ──► GND
```

**Code:**
```cpp
#include <Stepper.h>

const int stepsPerRevolution = 2048;  // 28BYJ-48

Stepper myStepper(stepsPerRevolution, 8, 10, 9, 11);

void setup() {
  myStepper.setSpeed(10);  // RPM
}

void loop() {
  myStepper.step(stepsPerRevolution);    // One full rotation CW
  delay(1000);
  myStepper.step(-stepsPerRevolution);   // One full rotation CCW
  delay(1000);
}
```

**What You Learn:**
- Stepper motors move in discrete steps (precise positioning)
- Driver boards (ULN2003) handle coil switching
- `Stepper.h` library manages coil sequencing
- Great for 3D printers, CNC, robotic arms

---

## 11. Level 9 — Advanced Integration (Multi-Sensor Systems)

### Project 9.1: Smart Street Light

**Goal:** Combine multiple concepts into one useful system.

**Logic:**
- Daytime → Light OFF (LDR detects bright)
- Nighttime + No motion → Light DIM (PWM at 30%)
- Nighttime + Motion detected → Light BRIGHT (PWM at 100%)

**Components:**
- Arduino Uno R3
- LDR + 10kΩ Resistor
- PIR Motion Sensor
- LED + 220Ω Resistor

**Code:**
```cpp
const int ldrPin = A0;
const int pirPin = 2;
const int ledPin = 9;

const int darkThreshold = 300;

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(ldrPin);
  int motion = digitalRead(pirPin);

  Serial.print("Light: "); Serial.print(lightLevel);
  Serial.print(" Motion: "); Serial.println(motion);

  if (lightLevel > darkThreshold) {
    // It's bright outside → light OFF
    analogWrite(ledPin, 0);
  } else {
    // It's dark
    if (motion == HIGH) {
      analogWrite(ledPin, 255);  // Full brightness
    } else {
      analogWrite(ledPin, 80);   // Dim (30%)
    }
  }

  delay(100);
}
```

**What You Learn:**
- Combining analog + digital sensors
- State-based decision logic
- Real-world energy-saving design

---

### Project 9.2: Automatic Water Level Indicator

**Goal:** Use ultrasonic sensor to measure water level and alert when full.

**Components:**
- Arduino Uno R3
- HC-SR04 Ultrasonic Sensor
- Red LED + 220Ω
- Green LED + 220Ω
- Active Buzzer

**Code:**
```cpp
const int trigPin = 9;
const int echoPin = 10;
const int greenLed = 5;
const int redLed = 6;
const int buzzer = 7;

const int tankHeight = 30;      // cm
const int fullThreshold = 5;    // cm from top
const int emptyThreshold = 25;  // cm from top

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

float getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}

void loop() {
  float distance = getDistance();
  float waterLevel = tankHeight - distance;

  Serial.print("Water Level: ");
  Serial.print(waterLevel);
  Serial.println(" cm");

  if (waterLevel >= (tankHeight - fullThreshold)) {
    // Tank full
    digitalWrite(redLed, HIGH);
    digitalWrite(greenLed, LOW);
    digitalWrite(buzzer, HIGH);
  } else if (waterLevel <= (tankHeight - emptyThreshold)) {
    // Tank empty
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, LOW);
    digitalWrite(buzzer, LOW);
  } else {
    // Normal level
    digitalWrite(redLed, LOW);
    digitalWrite(greenLed, HIGH);
    digitalWrite(buzzer, LOW);
  }

  delay(500);
}
```

**What You Learn:**
- Calibrating sensors for physical dimensions
- Multiple outputs based on ranges
- Real-world alarm/indicator systems

---

### Project 9.3: Password Door Lock (Keypad + Servo + LCD)

**Goal:** Create a secure entry system.

**Components:**
- Arduino Uno R3
- 4×4 Keypad
- LCD 16×2
- SG90 Servo
- Red + Green LEDs
- Buzzer

**Code:**
```cpp
#include <Keypad.h>
#include <LiquidCrystal.h>
#include <Servo.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
Servo doorServo;

const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {9, 8, 7, 6};
byte colPins[COLS] = {5, 4, 3, 2};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

String password = "1234";
String input = "";

const int greenLed = A0;
const int redLed = A1;
const int buzzer = A2;
const int servoPin = 10;

void setup() {
  lcd.begin(16, 2);
  doorServo.attach(servoPin);
  doorServo.write(0);  // Locked

  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT);
  pinMode(buzzer, OUTPUT);

  lcd.print("Enter Password:");
}

void loop() {
  char key = keypad.getKey();

  if (key) {
    if (key == '#') {
      // Check password
      if (input == password) {
        lcd.clear();
        lcd.print("ACCESS GRANTED");
        digitalWrite(greenLed, HIGH);
        doorServo.write(90);  // Unlock
        delay(3000);
        doorServo.write(0);   // Lock
        digitalWrite(greenLed, LOW);
      } else {
        lcd.clear();
        lcd.print("ACCESS DENIED");
        digitalWrite(redLed, HIGH);
        digitalWrite(buzzer, HIGH);
        delay(2000);
        digitalWrite(redLed, LOW);
        digitalWrite(buzzer, LOW);
      }
      input = "";
      lcd.clear();
      lcd.print("Enter Password:");
    } else if (key == '*') {
      input = "";
      lcd.clear();
      lcd.print("Enter Password:");
    } else {
      input += key;
      lcd.setCursor(input.length() - 1, 1);
      lcd.print('*');
    }
  }
}
```

**What You Learn:**
- Keypad matrix input
- String comparison
- Multi-component system integration
- User feedback with LCD, LEDs, buzzer, and servo

---

## 12. Level 10 — Capstone Projects

### Capstone 1: Smart Plant Watering System

**Components:**
- Soil Moisture Sensor
- Water Pump (DC motor + driver)
- LCD Display
- Buzzer
- Green/Red LEDs

**Logic:**
- Read soil moisture
- If too dry → pump water for 3 seconds, beep, show "WATERING"
- If moist → show "OK", green LED
- Display moisture % on LCD

---

### Capstone 2: Home Security System

**Components:**
- PIR Motion Sensor
- Ultrasonic Distance Sensor
- Keypad
- LCD
- Buzzer
- Servo (door lock)
- Red/Green LEDs

**Logic:**
- Armed mode: Motion or proximity triggers alarm
- Disarm with correct keypad password
- LCD shows system status
- Servo controls door lock

---

### Capstone 3: Mini Weather Station

**Components:**
- DHT11 (Temperature + Humidity)
- LDR (Light level)
- LCD 16×2
- Optional: Serial data logging

**Logic:**
- Read all sensors
- Display temperature, humidity, light level on LCD
- Cycle through readings
- Alert if temperature exceeds threshold

---

## 13. Quick Reference

### Common Arduino Functions

| Function | Purpose | Example |
|----------|---------|---------|
| `pinMode(pin, mode)` | Set INPUT / OUTPUT / INPUT_PULLUP | `pinMode(13, OUTPUT);` |
| `digitalWrite(pin, value)` | Write HIGH or LOW | `digitalWrite(13, HIGH);` |
| `digitalRead(pin)` | Read HIGH or LOW | `digitalRead(2);` |
| `analogRead(pin)` | Read analog value 0–1023 | `analogRead(A0);` |
| `analogWrite(pin, value)` | Write PWM 0–255 | `analogWrite(9, 128);` |
| `map(value, fromLow, fromHigh, toLow, toHigh)` | Scale a value | `map(x, 0, 1023, 0, 255);` |
| `delay(ms)` | Wait milliseconds | `delay(1000);` |
| `delayMicroseconds(us)` | Wait microseconds | `delayMicroseconds(10);` |
| `millis()` | Time since startup (ms) | `unsigned long t = millis();` |
| `Serial.begin(baud)` | Start Serial | `Serial.begin(9600);` |
| `Serial.print(data)` | Print to monitor | `Serial.print("Hello");` |
| `Serial.println(data)` | Print with newline | `Serial.println(123);` |
| `pulseIn(pin, state)` | Measure pulse duration | `pulseIn(10, HIGH);` |

### Resistor Color Code

| Color | Digit | Multiplier | Tolerance |
|-------|-------|------------|-----------|
| Black | 0 | ×10⁰ | — |
| Brown | 1 | ×10¹ | ±1% |
| Red | 2 | ×10² | ±2% |
| Orange | 3 | ×10³ | — |
| Yellow | 4 | ×10⁴ | — |
| Green | 5 | ×10⁵ | ±0.5% |
| Blue | 6 | ×10⁶ | ±0.25% |
| Violet | 7 | ×10⁷ | ±0.1% |
| Gray | 8 | ×10⁸ | ±0.05% |
| White | 9 | ×10⁹ | — |
| Gold | — | ×10⁻¹ | ±5% |
| Silver | — | ×10⁻² | ±10% |

**Example:** Red-Red-Brown-Gold = 22 × 10 = **220Ω ±5%**

### Useful Resources

- **Tinkercad:** [https://tinkercad.com](https://tinkercad.com)
- **Arduino Reference:** [https://www.arduino.cc/reference/en/](https://www.arduino.cc/reference/en/)
- **Arduino IDE:** [https://www.arduino.cc/software](https://www.arduino.cc/software)

---

> **Practice Tip:** Complete all levels in order. Each project builds on the previous. By Level 10, you'll be ready to design your own embedded systems from scratch!
