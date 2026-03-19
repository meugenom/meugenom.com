---
date: 2026-03-07
title: 'T-Motor F1404 - Vom Datenblatt zum C++ Motormodell für SIL-Simulation'
template: post
thumbnail: './thumbnails/tmotor_v1_title.png'
slug: tmotor-f1404-vom-datenblatt-zum-cpp-motormodell
tags: tmotor f1404 cpp motormodell sil simulation
cluster: tmotor-f1404-vom-datenblatt-zum-cpp-motormodell
order: 0
---

# Teil 1: Vom Datenblatt zum Standtest - STATIC

## 1. Warum das Lehrbuch falsch lag – und was Standtestdaten besser können?

Ich habe ein C++-Motormodell für eine FPV-Drohne entwickelt: den  **T-Motor F1404 KV4600** mit **GF3016-Propeller**. Was dabei als kleines Implementierungsprojekt begann, wurde zu einer interessanten Lernerfahrung über die Grenzen klassischer Motortheorie.

## 2. Das Problem mit der Lehrbuchformel:

Die klassische Beschreibung eines BLDC-Motors lautet:

$$
U = I·R + k_E·\omega
$$

Für den F1404 KV4600 ergibt sich daraus eine Leerlaufdrehzahl von rund **73.600 RPM** bei 16,0 V (KV × V = 4600 × 16).

Der Standtest zeigt: **40.053 RPM**.
Abweichung: +84 %.

- Kein Messfehler
- Kein Defekt

Sondern das, was jeder Antriebsingenieur weiß, aber Lehrbücher gerne weglassen. Die KV-Formel gilt im Leerlauf — ohne Propeller, ohne Last. Mit Propeller erzeugt das Blatt ein aerodynamisches Lastmoment $M \propto \omega^2$ - hochgradig nichtlinear, und vollständig abhängig von Blattgeometrie, Anströmwinkel und Luftdichte.

Pounds [1] zeigt in ihrer Arbeit zur Quadrotor-Dynamik, dass der Schubbeiwert C_T selbst von der Blattgeometrie, der induzierten Strömungsgeschwindigkeit und der Winkelgeschwindigkeit abhängt - keine einfache Formel deckt das in drei Parametern ab.


## 3. Warum V_nominal = 16,0 V?

Der Standtest wurde bei einer leicht entladenen 4S-LiPo durchgeführt: Die Spannung sank von 15,93 V (50 % Gas) auf 15,64 V (100 % Gas) — jeweils unter Last. Das bedeutet - alle 11 Messpunkte wurden bei unterschiedlichen Spannungen aufgenommen.

Um daraus eine konsistente Lookup-Tabelle zu bauen, müssen alle Messwerte auf eine gemeinsame Referenzspannung normiert werden:

```matlab
drehzahl_norm = drehzahl_upm .* (16.0 ./ spannung_v)
strom_a_norm  = strom_a .* (16.0 ./ spannung_v).^2
strom_a_norm(1) = MOTOR_I_IDLE   % Leerlaufstrom: Reibung, nicht V^2-abhängig
```

16,0 V wurde als Referenz gewählt — nahe an den tatsächlichen Testbedingungen (Abweichung < 0,25 V) und ein praktischer Rundwert für eine volle 4S-LiPo (4x4.0 V). Der Normierungsfehler beträgt weniger als 1,5%.

**Wichtig:** Der Leerlaufstrom (0,6 A bei 0 % Gas) wird *nicht* mit $V^2$ skaliert. Dieser Strom entsteht durch Lagerreibung und Wirbelströme im Stator — mechanische Verluste, die nicht dem aerodynamischen $V^2$-Gesetz folgen. Die Skalierung gilt nur für den lastabhängigen Strom unter Propellerlast.


## 4. Der versteckte Fehler. Wo die Normierung hilft — und wo sie schadet

Die Normierung auf 16,0 V löst das Problem der inkonsistenten Spannungen — aber nicht überall gleich.

Entscheidend ist, *welche* Beziehung gefittet wird:

**Gas → RPM:** Hier ist die Normierung zwingend. Ohne sie sieht `polyfit` Drehzahlen, die bei 50 % Gas unter 15,93 V und bei 100 % Gas unter 15,64 V gemessen wurden — als ob die Drehzahl bei höherem Gas langsamer zunimmt als sie tatsächlich sollte. Die Normierung auf 16,0 V bringt alle Punkte in denselben physikalischen Raum:

```matlab
    p_rpm_fit = polyfit(gas_pct/100, drehzahl_norm, 2)
```

**RPM → Schub:** Hier darf *nicht* normiert werden. Jedes Messpunkt-Paar (RPM, Schub) wurde *gleichzeitig* am Standtest aufgenommen — der Motor drehte tatsächlich 26.532 U/min und erzeugte dabei tatsächlich 184,21 g. Es gibt keine Inkonsistenz. Schub ist eine rein aerodynamische Funktion der Drehzahl: $F \propto n^2$.

Wenn man hier normierte RPM einsetzt, verschiebt man die x-Achse nach rechts (höhere RPM), lässt aber die y-Achse (Schub) unverändert. Das Ergebnis: der Fit *unterschätzt* den Schub systematisch.

```matlab
    p_schub = polyfit(drehzahl_upm, schub_g, 2)   % echte RPM × echter Schub
```

Dieser Fehler war im ersten Modell enthalten und kostete ~1 % Genauigkeit — der mittlere Fehler sank nach der Korrektur von 3,2 % auf 2,1 %.

## 5. Drei Modelle — drei Ebenen der Wahrheit

Um die Lücke zwischen Theorie und Messung zu verstehen, lohnt es sich, drei Kurven gleichzeitig zu betrachten:

**Kurve 1** — Theoretisches.green Limit.green (grün gestrichelt): RPM = KV x V = 73.600 U/min bei 16 V. Der Motor ohne Last, ohne Propeller. Reine Elektrik.

**Kurve 2** — Analytisches.pink Modell.pink (magenta): ~48.000 U/min bei Vollgas, aerodynamisch korrekt, ohne thermische Verluste und Batterieinnenwiderstand.

**Kurve 3** — Physikalisches.blue Modell.blue aus Standtestdaten (blau): Polynomfit durch den Ursprung, Abstand zu Kurve 2 (~11 %) durch Verluste erklärt.

![Schub Drehzahl Kennlinie](images/tmotor_v1_schub_drehzahl.png)

Dieser Ansatz, empirische Kennlinie über Polynomregression ist in der UAV-Literatur etabliert. [2] zeigt, dass ein polynomiales Thrust-Map-Modell mit 4–5 % Fehler arbeitet, während eine lineare Approximation 12 % Fehler erzeugt. Das hier vorgestellte Modell folgt derselben Methodik.

## 6. Die Lösung: Empirische Kennlinie statt theoretisches Modell

Statt die physikalischen Konstanten **k_M**, **k_E** und **R_int** zu identifizieren, habe ich den anderen Weg gewählt:

1. `11 Standtestpunkte` (50–100 % Gas) direkt vom Hersteller  
2. RPM-Normierung auf 16,0 V vor dem Fit  
3. Polynomregression in Octave `polyfit` für Drehzahl, Strom und Schub  
4. Gramm-zu-Newton-Umrechnung einmalig in Octave — nicht zur Laufzeit  
5. `101-Punkt-Lookup-Tabelle` als vorberechnetes C++-Array  
6. Laufzeit: reine Tabelleninterpolation, kein `floating-point-Polynom`, O(1)

Das Motormodell kennt zur Laufzeit keine Gleichung. Es interpoliert nur.


## 7. Was physikalisch trotzdem stimmt

Zwei Skalierungsgesetze sind analytisch korrekt und wurden bewusst beibehalten:

1. **Schubkraft**  - $F \propto V^2$

    aus $F \propto RPM^2 \propto V^2$ über das KV-Gesetz

2. **Stromaufnahme** $I \propto V^2$

    aus $M_{prop} \propto \omega^2$ und $I = M/k_T$ -  konsistent mit $P \propto V^3$

Das zweite Gesetz folgt direkt aus der Drehmomentgleichung von Pounds [1]:

$Q = C_Q·ρ·A·r^3·\omega^2$

Da der Motorstrom proportional zum Drehmoment ist ($I = Q·KV_rad$), und $\omega \propto V$ gilt, ergibt sich $I \propto V^2$ keine Annahme, sondern physikalische Konsequenz.

Das deckt den gesamten 4S-Entladungsbereich (14,0–16,8 V) ab, ohne zusätzliche Messpunkte.

![Strom-Schub-Kennlinie](images/tmotor_v1_strom_schub.png)

## 8. Propeller-Effizienz. Warum Hover sparsam ist?

Der dritte Graph zeigt $η = F/P$ in $g/W$ über der Schubkraft:

![Propeller-Effizienz](images/tmotor_v1_leistung_schub.png)

Der Wirkungsgrad fällt monoton mit steigendem Gas — von 2,2 g/W bei 50 % Gas auf 1,3 g/W bei Vollgas. Das bedeutet - bei niedrigem Schub erzeugt der Propeller mehr Gramm Auftrieb pro verbrauchtem Watt. Physikalisch erklärt dies die Theorie der Aktuatorscheibe — bei niedrigen induzierten Strömungsgeschwindigkeiten arbeitet der Propeller effizienter [1].

Der Hover-Punkt bei 62,5 g pro Motor liegt in der **Extrapolationszone** (unter 50 % Gas, außerhalb der Messdaten), der angezeigte Effizienzwert ~2,2 g/W ist daher eine Extrapolation, kein gemessener Wert. Der Trend ist physikalisch plausibel, aber nicht durch Messdaten bestätigt.

## 9. Ergebnis

```bash
✓ Schub bei 50 %:   1,875 N   (Messung: 1,807 N, Fehler +3,7 %)
✓ Schub bei 75 %:   2,773 N   (Messung: 2,821 N, Fehler -1,7 %)
✓ Schub bei 100 %:  3,406 N   (Messung: 3,382 N, Fehler +0,7 %)

Mittlerer Fehler: 2,1 %
Toleranz gesetzt auf +/-5% Schub, +/-10% Strom
```

Hover-Analyse für einen 250-g-Quadrocopter: **18,5 % Gasstellung** bei 15,8 V in der Extrapolationszone, aber physikalisch plausibel. Der Test verwendet ±10 % Toleranz für den Hover-Wert.

## 10. Was das Modell noch nicht kann

Ehrlichkeit gehört dazu:

**Thermische Drift:** Bei heißem Motor (~80 °C) steigt der Wicklungswiderstand um ~12% (Kupfer: $\alpha = 0,00393°C$), k_M sinkt, der Schub fällt um 5–8%. Die Standtestdaten wurden bei 8°C Umgebungstemperatur aufgenommen. Dieser Effekt ist im Modell nicht abgebildet.

**Extrapolation unter 50 % Gas:** Das Polynom wurde auf dem Bereich 50–100 % trainiert. Der Hover-Punkt liegt bei 18,5 % — doppelte Extrapolation. Brandt & Selig zeigen, dass Propeller im niedrigen Reynolds-Zahl-Bereich (<100.000) stark nichtlineares Verhalten zeigen [3]. Die Modellgüte dort ist unbekannt.

**Batteriealterung und Spannungsabfall:** Im Standtest betrug der Spannungsabfall unter Volllast nur **0,29 V bei 17,5 A** (1,8 %), die Batterie war neu. Bei einer gealterten Batterie (100+ Zyklen) kann der Innenwiderstand 2–4x höher sein, was bei gleichem Gaswert zu 1-2 V weniger Klemmenspannung führt.
Das senkt die effektive Drehzahl und Schubkraft um 5–10 % ohne dass das Modell dies erkennt. In [2] beschreibt genau diesen Effekt und führen einen Korrekturfaktor $\gamma$ ein, der den Drosselfehler von ~4,4 % auf unter 0,5 % reduziert [2].

**Strom bei niedrigem Gas:** Das Strommodell zeigt bei 50 % Gas einen Fehler von +9,6 % (5,73 A statt 5,23 A). Das Modell wurde primär auf Schubgenauigkeit optimiert, der Strom ist dort weniger präzise.

**Motor-zu-Motor-Streuung:** ~3 % auf KV ist nicht abgebildet.

## 11. Takeaway

Für Antriebssysteme mit nichtlinearer Last (Propeller, Pumpen, Gebläse) liefert eine sauber aufgenommene empirische Kennlinie schneller ein belastbares Modell als der Versuch, alle physikalischen Konstanten zu identifizieren.
Entscheidend ist dabei Ehrlichkeit über den Gültigkeitsbereich. Das Modell ist gut für 50–100 % Gas auf einer frischen 4S-Batterie bei moderater Temperatur. Außerhalb dieser Bedingungen braucht es Korrekturfaktoren.

**Ebenso wichtig**: Normierung ist kein pauschaler Schritt. Sie ist nötig, wo Messbedingungen inkonsistent sind (Gas → RPM bei schwankender Spannung), aber schädlich, wo beide Achsen im gleichen Experiment gemessen wurden (RPM → Schub). Blindes Normieren kann die Modellgenauigkeit verschlechtern statt verbessern.

Der gesamte **Code** ist auf GitHub verfügbar: [Github Code](https://github.com/meugenom/tmotor-f1404-model)

## 12. Quellen


[1] Pounds, P., Mahony, R., Corke, P. (2010). **Modelling and Control of a Large Quadrotor Robot.**

[2] Anguita, F. J., Perez-Segui, R., Pita-Romero, C., Fernandez-Cortizas, **A Comparative Study on Thrust Map Estimation for Multirotor Aerial Vehicles** IMAV 2025.

[3] Brandt, J. B., Selig, M. S. (2011). **Propeller Performance Data at Low Reynolds Numbers.** Paper 2011-1255, 49th Aerospace Sciences Meeting.

