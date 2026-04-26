# 🚁 2-Month Arduino Embedded Roadmap: Electronics First, Drone as Context

> **Goal:** Master Arduino embedded systems fundamentals with **electronics as the primary focus** and **drone technology as the application context**. You will understand every Arduino concept deeply; drones are the "why" behind each lesson, not the entire curriculum.
>
> **Month 1:** No hardware. Theory + simulators + code.  
> **Month 2:** Hands-on hardware + 3 capstone projects.

---

## 📋 The Learning Split

| Phase | Days | Condition | Focus |
|-------|------|-----------|-------|
| **Month 1** | Day 1 – 30 | No physical hardware | Arduino syntax, electronics theory, protocols, memory, registers, simulation |
| **Month 2** | Day 31 – 60 | Hardware arrives | Physical circuits, real sensors, 3 capstone projects, drone architecture overview |

---

## 🛠️ Month 1: Software-Only Toolkit (No Hardware Needed)

| Tool | Purpose | Link |
|------|---------|------|
| **Arduino IDE** | Write and verify code, Serial Monitor | [arduino.cc](https://www.arduino.cc/en/software) |
| **Tinkercad Circuits** | Simulate Arduino, LEDs, resistors, buttons, potentiometers | [tinkercad.com/circuits](https://www.tinkercad.com/circuits) |
| **Wokwi** | Simulate Arduino + MPU6050 + displays + motors | [wokwi.com](https://wokwi.com) |
| **Arduino Serial Plotter** | Visualize analog values, PWM, sensor data in real-time | Built into Arduino IDE |
| **Python + Matplotlib** | PID visualization, data plotting, algorithm simulation | `pip install matplotlib numpy` |
| **EveryCircuit** | Visual circuit simulation with current flow animation | [everycircuit.com](https://everycircuit.com) |

---

## 🛠️ Month 2: Physical Hardware Kit

| Category | Item | Purpose |
|----------|------|---------|
| **Microcontroller** | Arduino Uno/Nano | Main board |
| **Breadboard** | 830-point | Prototyping |
| **Resistors** | 220Ω, 1kΩ, 10kΩ | LED current limiting, pull-ups, voltage dividers |
| **LEDs** | 5mm RGB + regular | Status indicators |
| **Potentiometers** | 10kΩ | Analog input, joystick simulation |
| **Pushbuttons** | Tactile switches | Digital input, arm/disarm |
| **Servo motor** | SG90 | Actuator control (represents motor ESC) |
| **Buzzer** | Active/passive | Alarms, low battery warning |
| **LCD Display** | 16×2 with I2C backpack | Telemetry display |
| **Sensors** | MPU6050, HC-SR04, DHT11 | IMU, distance, environment |
| **Radio** | nRF24L01 + HC-05 | Wireless communication |
| **GPS** | NEO-6M | Position tracking |
| **SD Module** | MicroSD card adapter | Data logging |
| **Misc** | Jumper wires, multimeter, LiPo 3S | Wiring, measurement, power |

---

## 🗓️ MONTH 1: Arduino Embedded Foundations (Day 1–30)

### 🟢 WEEK 1 — Basic Electronics + Arduino Syntax (Tinkercad)

**Theme:** You cannot build drones without understanding electricity. Learn Ohm's law, components, and Arduino basics in simulation.

| Day | Topic | Activity | Drone Context |
|-----|-------|----------|---------------|
| **1** | Arduino IDE, `setup()`, `loop()`, variables, `Serial.println()` | Blink virtual LED in Tinkercad | Flight controller boot sequence |
| **2** | **Ohm's Law:** V=IR. Resistors. LED forward voltage. | Calculate resistor for LED. Wire in Tinkercad. | LED indicators on drone status panel |
| **3** | **PWM:** `analogWrite()`, duty cycle, frequency. | Fade LED. Print 0-255 values. Observe brightness curve | ESC motor control — same signal, different scale |
| **4** | **Voltage Dividers:** Battery monitoring. | Two resistors. Measure "battery" voltage with analog pin. | LiPo 3S voltage monitoring (11.1V → 5V safe range) |
| **5** | **Analog Input:** `analogRead()`, potentiometers, `map()`. | Read pot → map 0-1023 to 0-180 → control virtual servo. | Transmitter joystick → throttle/roll values |
| **6** | **Digital Input:** Pushbuttons, pull-up resistors, debouncing. | Button press toggles LED. Add 10ms debounce delay. | Drone arm/disarm switch — must be debounced |
| **7** | **Project:** Drone Status Panel | 3 LEDs: Red=DISARMED, Green=ARMED, Blue=LOW_BATTERY. Button cycles states. | Understand state indication before writing flight code |

**📚 Utilize This Week:**
- [`WA9ONY/Arduino`](https://github.com/WA9ONY/Arduino) → Study basic circuit notes and LED control examples.
- [`EveryCircuit`](https://everycircuit.com) → Build a voltage divider. Watch current flow. See WHY the resistor value matters.

---

### 🟢 WEEK 2 — Communication Protocols (Tinkercad + Wokwi)

**Theme:** Drones are networks of sensors. Learn how devices talk: Serial, I2C, SPI, UART.

| Day | Topic | Activity | Drone Context |
|-----|-------|----------|---------------|
| **8** | **Serial Communication:** `Serial.begin()`, `print()`, `println()`, `parseInt()`. | Send formatted sensor data: `"Roll:45.2,Pitch:-3.1\n"`. Parse on receiving side. | Telemetry to ground station |
| **9** | **I2C Theory:** SDA, SCL, addresses, clock stretching. | Draw I2C bus diagram with 3 devices. Explain addressing. | MPU6050 (`0x68`), OLED (`0x3C`), Barometer (`0x76`) share same bus |
| **10** | **I2C Practice:** `Wire.h`, scanner, read registers. | Wokwi: Arduino + MPU6050. Scan for `0x68`. Read WHO_AM_I register. | Verifying IMU is connected before flight |
| **11** | **SPI Theory:** MOSI, MISO, SCK, CS. Full-duplex, faster than I2C. | Draw SPI diagram. Compare vs I2C: speed, wires, chip select. | nRF24 radio, SD card — high-speed devices |
| **12** | **SPI Practice:** Shift register or virtual display. | Wokwi: Control 7-segment display via shift register. | Understanding how radio modules stream data |
| **13** | **UART Theory:** TX, RX, baud rate, framing. | Explain start bit, data bits, stop bit. Why baud must match. | GPS NEO-6M (9600 baud), Bluetooth HC-05 |
| **14** | **Project:** Multi-Protocol Sensor Hub | Read virtual I2C sensor + virtual SPI sensor + parse fake UART string. Print unified report. | Flight controller reads IMU (I2C), radio (SPI), GPS (UART) simultaneously |

**📚 Utilize This Week:**
- [`m3y54m/Embedded-Engineering-Roadmap`](https://github.com/m3y54m/embedded-engineering-roadmap) → Study the Communication Protocols section. Understand WHEN to choose each protocol.
- [`RadioLib`](https://github.com/jgromes/RadioLib) → Skim examples. See how one library abstracts SPI for multiple radio modules.

---

### 🟡 WEEK 3 — Timing, Interrupts & Control Systems

**Theme:** Real embedded systems don't use `delay()`. Learn precise timing, interrupts, and the PID algorithm that drones (and every control system) use.

| Day | Topic | Activity | Drone Context |
|-----|-------|----------|---------------|
| **15** | **`millis()` vs `delay()`:** Non-blocking code. | Rewrite blink without `delay()`. Run two LEDs at different rates. | Flight loop must never pause — sensors keep updating |
| **16** | **`micros()` & Precision Timing:** Measure loop execution time. | Print `micros()` at loop start and end. Calculate Hz. | Flight controller target: 250-500Hz loop rate |
| **17** | **External Interrupts:** `attachInterrupt()`, rising/falling edge. | Button triggers ISR. Toggle LED instantly. | Radio packet received → interrupt triggers parsing |
| **18** | **Timer Interrupts:** `Timer1` library. | Blink LED at exact 100Hz using timer, not loop. | Precise PID computation interval |
| **19** | **PID Theory:** Proportional, Integral, Derivative. Error, setpoint, process variable. | Draw block diagram. Trace a step response manually. | How drones self-level against wind and tilt |
| **20** | **PID Simulation (Python):** | Matplotlib: Plot P, I, D response to step input. Tune Kp, Ki, Kd visually. | Understand tuning BEFORE risking hardware |
| **21** | **PID Arduino Code:** Write reusable PID class. Test with fake sensor data. Print output. | `compute(setpoint, input)` → `output`. Integral windup guard. | Ready to drop in real MPU6050 data later |

**📚 Utilize This Week:**
- [`benripley/Arduino-Quadcopter`](https://github.com/benripley/Arduino-Quadcopter) → Read README control flow. Focus on the PID block diagram, not motor mixing yet.
- [`PCBSync — Arduino Quadcopter PID Basics`](https://pcbsync.com/arduino-quadcopter-flight-controller-basics/) → Study the cascaded PID loop diagram (Angle loop → Rate loop).

---

### 🟡 WEEK 4 — Memory, Registers & Embedded C Deep Dive

**Theme:** Move beyond Arduino abstraction. Understand what `digitalWrite()` hides — this is essential for professional embedded work.

| Day | Topic | Activity | Drone Context |
|-----|-------|----------|---------------|
| **22** | **Data Structures:** Arrays, structs, enums. | `struct SensorData { float roll, pitch, yaw; };` | Organize IMU, GPS, battery data cleanly |
| **23** | **Pointers & Memory:** Addresses, dereferencing, arrays as pointers. | Print memory addresses of variables. Explain stack vs heap. | DMA (direct memory access) in STM32 later |
| **24** | **EEPROM:** `EEPROM.read()`, `write()`, `update()`. | Save "calibration offset" to EEPROM. Read on boot. | Store drone trim values, PID gains persistently |
| **25** | **Bit Manipulation:** `&`, `|`, `^`, `~`, `<<`, `>>`. | Set/clear/toggle specific bits in a byte. | Control hardware registers directly |
| **26** | **Direct Register Access:** `DDRB`, `PORTB`, `PINB`. | Replace `pinMode(13, OUTPUT); digitalWrite(13, HIGH);` with `DDRB |= 0x20; PORTB |= 0x20;` | Fast GPIO — flight controllers need speed |
| **27** | **Creating Arduino Libraries:** `.h` + `.cpp` structure. | Write `MySensor` library with `begin()`, `read()`, `getValue()`. | Reusable sensor drivers — clean project structure |
| **28** | **Power Management:** `sleep` modes, ` LowPower` library. | Simulate battery drain. Enter sleep, wake on interrupt. | Drone power saving during idle |
| **29** | **State Machines:** `enum`, `switch-case`, transitions. | `enum State { DISARMED, ARMED, FLYING, ERROR };` | Real flight controller behavior model |
| **30** | **Review Day:** Write a complete "Drone Monitor" program. Structs, EEPROM, state machine, Serial reporting. | Arduino IDE + Serial Monitor | Consolidates Week 1-4 into one project |

**📚 Utilize This Week:**
- [`Dumbo-programmer/Flight-Controller`](https://github.com/Dumbo-programmer/Flight-Controller) → Study how they organize code into functions. Notice the state machine pattern (arm/disarm/flight).
- [`stm32duino/Arduino_Core_STM32`](https://github.com/stm32duino/Arduino_Core_STM32) → Peek at how STM32 core implements `digitalWrite()` using registers. Understand the layer below Arduino.

---

## 🗓️ MONTH 2: Hands-On Hardware + Drone Flavor (Day 31–60)

### 🔵 WEEK 5 — Physical Arduino + Basic Circuits

**Theme:** Move from simulation to real components. Every concept from Month 1, now on a breadboard.

| Day | Topic | Activity |
|-----|-------|----------|
| **31** | Arduino Uno pinout. Power rails. USB vs external power. | Inspect board. Measure 5V and 3.3V rails with multimeter. |
| **32** | Real blink. LED + 220Ω resistor. Breadboard layout. | Build on breadboard. Verify current with Ohm's law: (5V-2V)/220Ω = 13.6mA. |
| **33** | Real PWM. Servo sweep. Measure pulse width with multimeter (if capable). | Servo represents motor ESC. Confirm 1000-2000µs range. |
| **34** | Real analog input. Potentiometer. Serial Plotter visualization. | Twist knob. Watch smooth curve on Serial Plotter. |
| **35** | Real button. Pull-up vs pull-down. Hardware debounce with capacitor. | Compare software debounce (Month 1) vs hardware debounce. |
| **36** | RGB LED. Common cathode wiring. Color mixing. | Build drone status light: Red=disarm, Green=arm, Blue=error. |
| **37** | Project: Physical Drone Status Panel | 3 LEDs + button + buzzer. Full state machine on real hardware. |

---

### 🔵 WEEK 6 — Real Sensors & Actuators

**Theme:** Connect the sensors a drone actually uses. Understand real-world noise and calibration.

| Day | Topic | Activity |
|-----|-------|----------|
| **38** | MPU6050 wiring. VCC, GND, SDA→A4, SCL→A5. AD0 pin. | Physical wire-up. Run I2C scanner. Confirm `0x68`. |
| **39** | MPU6050 raw data. Gyro drift observation. Serial Plotter. | Place still. Watch gyro drift. Feel the problem sensor fusion solves. |
| **40** | HC-SR04 ultrasonic. Trigger/Echo. `pulseIn()`. Distance calc. | Measure distance to wall. Understand why drones use this for landing. |
| **41** | nRF24L01 wiring. 3.3V ONLY. 100µF capacitor. | Wire one module. Run GettingStarted. Range test across room. |
| **42** | Servo + sensor combo. Distance → servo angle. | Mini project: servo points at closest object (like a radar). |
| **43** | Active buzzer. PWM frequency. Different tones for different alarms. | Low battery = fast beep. Disarmed = slow beep. |
| **44** | Project: Multi-Sensor Telemetry Node | Read MPU6050 + ultrasonic. Send via nRF24 to second Arduino. Display on Serial Monitor. |

---

### 🔴 WEEK 7 — Displays, Logging & Integration

**Theme:** A drone without telemetry is flying blind. Build a full dashboard.

| Day | Topic | Activity |
|-----|-------|----------|
| **45** | I2C LCD 16×2. `LiquidCrystal_I2C` library. Address `0x27` or `0x3F`. | Display "Drone Status: ARMED". |
| **46** | HC-05 Bluetooth. AT commands. Pair with phone. | Send sensor data to phone serial app. |
| **47** | NEO-6M GPS. UART parse. `$GPGGA`. Latitude, longitude, satellites. | Place near window. Read position. Calculate meters per degree. |
| **48** | SD card module. SPI wiring. `SD.h`. CSV logging. | Log: `timestamp, roll, pitch, throttle, battery`. Open in Excel. |
| **49** | Multiple I2C devices. Address conflict resolution. | LCD (`0x27`) + MPU6050 (`0x68`) on same bus. Verify both work. |
| **50** | Interrupt-based sensor reading. `attachInterrupt()` on radio data ready pin. | Radio packet arrives → interrupt → parse immediately. No polling delay. |
| **51** | Project: Black Box Logger | MPU6050 + GPS + SD card. Logs flight data to CSV with timestamps. |

---

### 🔴 WEEK 8 — Capstone Projects + Drone Architecture

**Theme:** Three projects that consolidate everything. Then understand how real drones scale what you learned.

| Day | Capstone | What You Build | Concepts Used |
|-----|----------|---------------|---------------|
| **52** | **Project 1: Weather Station** | DHT11 temp/humidity + I2C LCD + SD logging. Data every 5 seconds. | I2C, analog, SD SPI, timing, structs |
| **53** | **Project 2: Remote Rover** | 2-wheel rover (servos/ESCs) + nRF24 remote + ultrasonic obstacle stop. | PWM, radio, interrupts, PID (speed control), failsafe |
| **54** | **Project 3: Smart Telemetry System** | MPU6050 + GPS + SD + LCD + buzzer. Display real-time attitude. Log to CSV. Alarm if tilt > 45°. | EVERYTHING: I2C, UART, SPI, interrupts, state machine, EEPROM |
| **55** | **Code Review:** Refactor Project 3 into reusable libraries. | Extract sensor drivers into `.h/.cpp` files. | Professional code organization |
| **56** | **Drone Architecture Lesson:** How real flight controllers work. | Study block diagram: Sensors → Sensor Fusion → PID → Motor Mix → ESCs. | Map YOUR skills to real products |
| **57** | **Arduino vs STM32:** Why drones moved beyond Uno. | Compare: 16MHz/2KB RAM vs 72-480MHz/FPU/DMA. | Understand hardware limits |
| **58** | **PlatformIO:** Professional workflow. `platformio.ini`. Multi-platform. | Install VSCode + PlatformIO. Create project for Uno and STM32 side-by-side. | Industry-standard toolchain |
| **59** | **FreeRTOS:** Why real-time OS matters. Tasks, semaphores, queues. | Watch Shawn Hymel RTOS videos. Understand: IMU task, PID task, radio task. | Beyond the `loop()` |
| **60** | **Plan Deep Drone Build:** STM32 + FreeRTOS + 4 motors + IMU + radio + GPS. | Write parts list. Draw architecture diagram. You now have the foundation. | Next phase roadmap |

**📚 Utilize This Week:**
- [`m3y54m/Embedded-Engineering-Roadmap`](https://github.com/m3y54m/embedded-engineering-roadmap) → Use as your long-term study guide after Day 60.
- [`platformio/platformio-examples`](https://github.com/platformio/platformio-examples) → Day 58: Clone and build the Arduino blink example in PlatformIO.
- [`Despacito0o/FreeRTOS-on-STM32-Learning-Path`](https://github.com/Despacito0o/FreeRTOS-on-STM32-Learning-Path) → Day 59: Read Project 002 and 003 to understand task creation.
- [`Ujjwalsingh-afk/Semi-Autonomous-Drone-Flight-Controller`](https://github.com/Ujjwalsingh-afk/Semi-Autonomous-Drone-Flight-Controller) → Day 56: Study the block diagram and wiring. Map it to what you now understand (I2C, SPI, PWM, state machine).

---

## 🧠 Core Concepts → Drone Mapping

| Embedded Concept | What It Is | How Drones Use It |
|------------------|-----------|-------------------|
| **PWM** | Pulse width modulation, 0-100% duty cycle | ESC motor control (1000-2000µs) |
| **Voltage Divider** | Two resistors scale voltage down | LiPo 11.1V → 5V for Arduino ADC |
| **I2C** | 2-wire shared bus, multiple devices | MPU6050, barometer, OLED on same bus |
| **SPI** | 4-wire fast bus, chip select per device | nRF24 radio, SD card |
| **UART** | Point-to-point serial, fixed baud | GPS module, Bluetooth telemetry |
| **Interrupts** | CPU pauses main code for urgent event | Radio packet received, IMU data ready |
| **Timer Interrupts** | Precise periodic execution | 250Hz PID loop, 400Hz ESC refresh |
| **EEPROM** | Non-volatile storage | Save PID gains, trim values permanently |
| **Registers** | Direct hardware control | Fast GPIO, configure timers, set PWM frequency |
| **State Machine** | Structured behavior modes | DISARMED → ARMED → FLYING → ERROR |
| **PID** | Feedback control algorithm | Self-leveling, altitude hold, position hold |
| **Struct/Enum** | Organized data types | `DroneState` with attitude, battery, mode |

---

## 🗺️ How Each GitHub Repo Fits Your Journey

| Repo | When | Exactly How |
|------|------|-------------|
| [`m3y54m/Embedded-Engineering-Roadmap`](https://github.com/m3y54m/embedded-engineering-roadmap) | **Month 1, Day 9** / **Month 2, Day 60** | Reference for protocols, STM32, RTOS. Bookmark it as your post-roadmap guide. |
| [`WA9ONY/Arduino`](https://github.com/WA9ONY/Arduino) | **Month 1, Week 1** | Study basic circuit notes, homework assignments, and Tinkercad links. |
| [`benripley/Arduino-Quadcopter`](https://github.com/benripley/Arduino-Quadcopter) | **Month 1, Day 19** | Read the control flow diagram. Understand PID in context, but don't build a drone yet. |
| [`Dumbo-programmer/Flight-Controller`](https://github.com/Dumbo-programmer/Flight-Controller) | **Month 1, Day 29-30** | Study code organization and state machine. Notice how they use structs and functions. |
| [`RadioLib`](https://github.com/jgromes/RadioLib) | **Month 1, Day 12** / **Month 2, Day 41** | Skim SPI abstraction examples. Understand how one library talks to many radios. |
| [`stm32duino/Arduino_Core_STM32`](https://github.com/stm32duino/Arduino_Core_STM32) | **Month 1, Day 26** | Peek at `digitalWrite()` implementation. See registers underneath Arduino. |
| [`platformio/platformio-examples`](https://github.com/platformio/platformio-examples) | **Month 2, Day 58** | First PlatformIO project. Build Arduino blink. Then create STM32 target in same `platformio.ini`. |
| [`Ujjwalsingh-afk/Semi-Autonomous-Drone-Flight-Controller`](https://github.com/Ujjwalsingh-afk/Semi-Autonomous-Drone-Flight-Controller) | **Month 2, Day 56** | Study wiring diagram and architecture. Map every wire to a protocol you learned (I2C, SPI, PWM). |
| [`Despacito0o/FreeRTOS-on-STM32-Learning-Path`](https://github.com/Despacito0o/FreeRTOS-on-STM32-Learning-Path) | **Month 2, Day 59** | Read Projects 002-003. Understand task creation. This is your next step after Arduino mastery. |

---

## 🎯 Key Takeaway

> **You are learning embedded systems. The drone is the motivation, not the curriculum.**
>
> By Day 60, you will understand PWM, I2C, SPI, UART, interrupts, timers, memory, registers, PID, and state machines. You will have built three real projects on a breadboard. You will know WHY a flight controller needs 250Hz loops, WHY I2C addresses matter, WHY interrupts beat polling, and WHY Arduino Uno eventually becomes too small.
>
> The deep drone build comes **after** this foundation. When you pick up an STM32 flight controller kit in Month 3, every line of code will make sense because you learned the fundamentals properly.

---

*Last updated: April 2026. Build safely.*
