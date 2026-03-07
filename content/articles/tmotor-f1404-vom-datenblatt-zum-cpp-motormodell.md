---
date: 2026-03-07
title: 'T-Motor F1404 - Vom Datenblatt zum C++ Motormodell für SIL-Simulation'
template: post
thumbnail: './thumbnails/tmotor_v1_title.png'
slug: tmotor-f1404-vom-datenblatt-zum-cpp-motormodell
categories: tmotor f1404 cpp motormodell sil simulation
tags: tmotor f1404 cpp motormodell sil simulation
---

# Teil 1: Vom Datenblatt zum Standtest - STATIC

## 1. Warum das Lehrbuch falsch lag – und was Standtestdaten besser können?

Ich habe ein C++-Motormodell für eine FPV-Drohne entwickelt: den  **T-Motor F1404 KV4600 mit GF3016-Propeller**. Was dabei als kleines Implementierungsprojekt begann, wurde zu einer interessanten Lernerfahrung über die Grenzen klassischer Motortheorie.

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

Sondern das, was jeder Antriebsingenieur weiß, aber Lehrbücher gerne weglassen. Die KV-Formel gilt im Leerlauf — ohne Propeller, ohne Last. Mit Propeller erzeugt das Blatt ein aerodynamisches Lastmoment $M \propto \omega^2$ — hochgradig nichtlinear, und vollständig abhängig von Blattgeometrie, Anströmwinkel und Luftdichte.

Pounds et al. [1] zeigen in ihrer Arbeit zur Quadrotor-Dynamik, dass der Schubbeiwert C_T selbst von der Blattgeometrie, der induzierten Strömungsgeschwindigkeit und der Winkelgeschwindigkeit abhängt  — keine einfache Formel deckt das in drei Parametern ab.


## 3. Warum V_nominal = 16,0 V?

Der Standtest wurde bei einer leicht entladenen 4S-LiPo durchgeführt: Die Spannung sank von 15,93 V (50 % Gas) auf 15,64 V (100 % Gas) — jeweils unter Last. Das bedeutet: Alle 11 Messpunkte wurden bei unterschiedlichen Spannungen aufgenommen.

Um daraus eine konsistente Lookup-Tabelle zu bauen, müssen alle Messwerte auf eine gemeinsame Referenzspannung normiert werden:
```matlab
drehzahl_norm = drehzahl_upm .* (16.0 ./ spannung_v)
strom_a_norm  = strom_a .* (16.0 ./ spannung_v).^2
```
16,0 V wurde als Referenz gewählt — nahe an den tatsächlichen Testbedingungen (Abweichung < 0,25 V) und ein praktischer Rundwert für eine volle 4S-LiPo (4× 4,0 V). Der Normierungsfehler beträgt weniger als 1,5 %.


## 4. Der versteckte Fehler: Warum die Parabel falsch war?

Beim ersten Modellversuch wurde der Schubpolynomfit direkt auf den Rohdaten aufgebaut:

```matlab
    p_schub = polyfit(drehzahl_upm, schub_g, 2)
```

Das Ergebnis war geometrisch falsch: Die Kurve verlief **konkav nach oben** — also mit abnehmender Steigung bei höheren Drehzahlen. Physikalisch muss aber gelten: $F \propto n^2$, also eine **nach oben geöffnete Parabel mit zunehmender Steigung**.

Der Grund: `polyfit` sah 11 Messpunkte, die scheinbar bei der _gleichen_ Spannung aufgenommen wurden — in Wirklichkeit aber bei 15,93 V, 15,91 V, ... 15,64 V. Die sinkende Spannung unter Last reduziert die Drehzahl, und dieser systematische Effekt verzerrte die Kurvenform.

Nach der Normierung auf 16,0 V:

```matlab
    p_schub = polyfit(drehzahl_norm, schub_g, 2)
```

Nach der Normierung auf 16,0 V liegen alle Punkte im gleichen physikalischen Raum und die Parabel öffnet sich korrekt nach oben. Dies entspricht dem physikalischen Modell $F = k·n^2$ .


## 5. Drei Modelle — drei Ebenen der Wahrheit

Um die Lücke zwischen Theorie und Messung zu verstehen, lohnt es sich, drei Kurven gleichzeitig zu betrachten:
 - Kurve 1 — Theoretisches Limit (grün gestrichelt): RPM = KV x V = 73.600 U/min bei 16 V. Der Motor ohne Last, ohne Propeller. Reine Elektrik.
 - Kurve 2 — Analytisches Modell (magenta): ~48.000 U/min bei Vollgas, aerodynamisch korrekt, ohne thermische Verluste und Batterieinnenwiderstand.
 - Kurve 3 — Physikalisches Modell aus Standtestdaten (blau): Polynomfit durch den Ursprung, Abstand zu Kurve 2 (~11 %) durch Verluste erklärt.

![Schub Drehzahl Kennlinie](images/tmotor_v1_schub_drehzahl.png)

Dieser Ansatz — empirische Kennlinie über Polynomregression — ist in der UAV-Literatur etabliert. Anguita et al. zeigen, dass ein polynomiales Thrust-Map-Modell mit 4–5 % Fehler arbeitet, während eine lineare Approximation 12 % Fehler erzeugt [2]. Das hier vorgestellte Modell folgt derselben Methodik.

## 6. Die Lösung: Empirische Kennlinie statt theoretisches Modell

Statt die physikalischen Konstanten k_M, k_E und R_int zu identifizieren, habe ich den anderen Weg gewählt:

1. `11 Standtestpunkte` (50–100 % Gas) direkt vom Hersteller  
2. RPM-Normierung auf 16,0 V vor dem Fit  
3. Polynomregression in Octave `polyfit` für Drehzahl, Strom und Schub  
4. Gramm-zu-Newton-Umrechnung einmalig in Octave — nicht zur Laufzeit  
5. `101-Punkt-Lookup-Tabelle` als vorberechnetes C++-Array  
6. Laufzeit: reine Tabelleninterpolation, kein `floating-point-Polynom`, O(1)

Das Motormodell kennt zur Laufzeit keine Gleichung. Es interpoliert nur.


## 7. Was physikalisch trotzdem stimmt

Zwei Skalierungsgesetze sind analytisch korrekt und wurden bewusst beibehalten:

1. Schubkraft.blue - $F \propto V^2$
    
    aus $F \propto RPM^2 \propto V^2$ über das KV-Gesetz

2. Stromaufnahme.blue $I \propto V^2$
    
    aus $M_{prop} \propto \omega^2$ und $I = M/k_T$ -  konsistent mit $P \propto V^3$

Das zweite Gesetz folgt direkt aus der Drehmomentgleichung von Pounds et al. [1]:

$Q = C_Q·ρ·A·r^3·\omega²$

Da der Motorstrom proportional zum Drehmoment ist ($I = Q·KV_rad$), und $\omega \propto V$ gilt, ergibt sich $I \propto V^2$ — keine Annahme, sondern physikalische Konsequenz.

Das deckt den gesamten 4S-Entladungsbereich (14,0–16,8 V) ab — ohne zusätzliche Messpunkte.

![Strom-Schub-Kennlinie](images/tmotor_v1_strom_schub.png)

## 8. Propeller-Effizienz: Warum Hover sparsam ist

Der dritte Graph zeigt $η = F/P$ in $g/W$ über der Schubkraft:

![Propeller-Effizienz](images/tmotor_v1_leistung_schub.png)

Der Wirkungsgrad fällt monoton mit steigendem Gas — von 2,2 g/W bei 50 % Gas auf 1,3 g/W bei Vollgas. Das bedeutet: Bei niedrigem Schub erzeugt der Propeller mehr Gramm Auftrieb pro verbrauchtem Watt. Physikalisch erklärt dies die Theorie der Aktuatorscheibe — bei niedrigen induzierten Strömungsgeschwindigkeiten arbeitet der Propeller effizienter [1].

Der Hover-Punkt bei 62,5 g pro Motor liegt in der **Extrapolationszone** (unter 50 % Gas, außerhalb der Messdaten) — der angezeigte Effizienzwert ~2,2 g/W ist daher eine Extrapolation, kein gemessener Wert. Der Trend ist physikalisch plausibel, aber nicht durch Messdaten bestätigt.

## 9. Ergebnis

```bash
✓ Schub bei 50 %:   1,874 N   (Messung: 1,807 N, Fehler +3,7 %)
✓ Schub bei 75 %:   2,718 N   (Messung: 2,821 N, Fehler -3,7 %)
✓ Schub bei 100 %:  3,303 N   (Messung: 3,382 N, Fehler -2,3 %)

Mittlerer Fehler: 3,2 %
Toleranz gesetzt auf ±5 % Schub, ±10 % Strom
```

Hover-Analyse für einen 250-g-Quadrocopter: **17,7 % Gasstellung** bei 15,8 V — in der Extrapolationszone, aber physikalisch plausibel. Der Test verwendet ±10 % Toleranz für den Hover-Wert.

## 10. Was das Modell noch nicht kann

Ehrlichkeit gehört dazu:

**Thermische Drift:** Bei heißem Motor (~80 °C) steigt der Wicklungswiderstand um ~12 % (Kupfer: α = 0,00393/°C), k_M sinkt, der Schub fällt um ~5–8 %. Die Standtestdaten wurden bei 8 °C Umgebungstemperatur aufgenommen — dieser Effekt ist im Modell nicht abgebildet.

**Extrapolation unter 50 % Gas:** Das Polynom wurde auf dem Bereich 50–100 % trainiert. Der Hover-Punkt liegt bei ~17,7 % — doppelte Extrapolation. Brandt & Selig zeigen, dass Propeller im niedrigen Reynolds-Zahl-Bereich (<100.000) stark nichtlineares Verhalten zeigen [3]. Die Modellgüte dort ist unbekannt.

**Batteriealterung und Spannungsabfall:** Im Standtest betrug der Spannungsabfall unter Volllast nur **0,29 V bei 17,5 A** (1,8 %) — die Batterie war neu. Bei einer gealterten Batterie (100+ Zyklen) kann der Innenwiderstand 2–4× höher sein, was bei gleichem Gaswert zu 1–2 V weniger Klemmenspannung führt. Das senkt die effektive Drehzahl und Schubkraft um 5–10 % — ohne dass das Modell dies erkennt. Anguita et al. beschreiben genau diesen Effekt und führen einen Korrekturfaktor γ ein (der u. a. die Batteriespannung berücksichtigt), der den Drosselfehler von ~4,4 % auf unter 0,5 % reduziert [2].

**Strom bei niedrigem Gas:** Das Strommodell zeigt bei 50 % Gas einen Fehler von +9,7 % (5,74 A statt 5,23 A). Das Modell wurde primär auf Schubgenauigkeit optimiert — der Strom ist dort weniger präzise.

**Motor-zu-Motor-Streuung:** ~3 % auf KV ist nicht abgebildet.

## 11. Takeaway

Für Antriebssysteme mit nichtlinearer Last — Propeller, Pumpen, Gebläse — liefert eine sauber aufgenommene empirische Kennlinie schneller ein belastbares Modell als der Versuch, alle physikalischen Konstanten zu identifizieren. Entscheidend ist dabei Ehrlichkeit über den Gültigkeitsbereich: Das Modell ist gut für 50–100 % Gas auf einer frischen 4S-Batterie bei moderater Temperatur. Außerhalb dieser Bedingungen braucht es Korrekturfaktoren.

**Ebenso wichtig**: Die Rohdaten müssen vor dem Fit physikalisch konsistent gemacht werden — eine Normierung auf eine gemeinsame Referenzspannung ist kein optionaler Schritt, sondern Voraussetzung für einen geometrisch korrekten Polynomfit.

Der gesamte Code.pink ist auf GitHub.pink verfügbar: [Github Code](https://github.com/meugenom/tmotor-f1404-model)


## 12. Quellen

[1] Pounds, P., Mahony, R., Corke, P. (2010). *Modelling and Control of a Large Quadrotor Robot*. Control Engineering Practice, 18(7), 691–699.

[2] Anguita, F. J., Perez-Segui, R., Pita-Romero, C., Fernandez-Cortizas, M. et al. (2025). *A Comparative Study on Thrust Map Estimation for Multirotor Aerial Vehicles*. Proceedings of IMAV 2025, Paper IMAV2025-12.

[3] Brandt, J. B., Selig, M. S. (2011). *Propeller Performance Data at Low Reynolds Numbers*. AIAA Paper 2011-1255, 49th AIAA Aerospace Sciences Meeting.