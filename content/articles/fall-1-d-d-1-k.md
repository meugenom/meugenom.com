---
date: 2026-03-15
title: 'Fall 1: D/D/1/K — Deterministisch, konstante Chunks, konstante Frequenzen, kein Jitter'
template: post
thumbnail: './thumbnails/ring_buffer_title.png'
slug: fall-1-d-d-1-k
categories: ring-buffer queueing-theory embedded-c fall-1-d-d-1-k
tags: ring-buffer queueing-theory embedded-c fall-1-d-d-1-k
---


# Fall 1: Ideales theoretisches Modell (D/D/1/K)

In diesem Szenario sind Frequenzen und Datengrößen stabil. Die Besonderheit hier ist die Hardware-Beschränkung: Wir arbeiten mit einer **Frame-Größe von 2 Bytes**. Das bedeutet, jede Speicherallokation und jeder Datentransport muss ein Vielfaches dieser 2 Bytes sein.

Hauptartikel: [Modeling and Analysis of Ring Buffers: A Journey from Queueing Theory to Embedded C Implementation](https://meugenom.com/article/modeling-and-analysis-of-ring-buffers)

## 1. Gegebene Daten (Eingangswerte)

- **$f_{in}$ / $f_{out}$:** Konstante Frequenzen in Hz (z. B. 20 Hz und 30 Hz).
- **$S_{frame}$:** **2 Bytes** (Die kleinste atomare Einheit/Hardware-Takt).
- **$S_{in}$:** Konstante Eingangsgröße (z. B. 128 Bytes = 64 Frames).
- **$S_{out}$:** Konstante Ausgangsgröße (z. B. 192 Bytes = 96 Frames).
- **Jitter:** 0 (Perfektes Timing).

## 2. Die Berechnung nach dem Double-Buffering-Prinzip

Wir nutzen das klassische **Double Buffering** Prinzip: der Ringpuffer hält gleichzeitig den eingehenden Chunk ($S_{in}$) und den ausgehenden Chunk ($S_{out}$), beide müssen physisch im Puffer Platz haben.

**Die Berechnungslogik:**
Da das System im "Burst"-Modus arbeitet (Daten kommen in Paketen von $S_{in}$ an), muss der Puffer groß genug sein, um die Diskretität (Stückelung) auszugleichen. 
In der Welt der Mikrocontroller nutzen wir das **Double Buffering** Prinzip auf Basis von Frames.

**Schritt-für-Schritt-Rechnung:**
1. **Bedarfsanalyse:** Um einen stabilen Fluss zu garantieren, muss der Puffer gleichzeitig den maximalen Eingang und den laufenden Ausgang halten können.
2. **Die Formel:** $$K_{theor} = S_{in} + S_{out}$$
3. **Frame-Anpassung:** Da $K$ durch $S_{frame}$ (2 Bytes) teilbar sein muss:
   $$K_{final} = \lceil (S_{in} + S_{out}) / 2 \rceil \cdot 2$$

**Beispiel mit deinen Werten:**
* $S_{in} = 128$ Bytes
* $S_{out} = 192$ Bytes
* **$K = 128 + 192 = 320$ Bytes** (Da 320 durch 2 teilbar ist, bleibt es bei 320 Bytes).

**Hinweis:** $K_{base} = S_{in} + S_{out}$ ist ein Double-Buffering-Prinzip, keine Queueing-Formel. Kleinrock (1975), Formel 2.29 definiert $\rho = \lambda/\mu$ und wird erst ab Fall 2 relevant.

## 3. Warum sind die 2-Byte-Frames wichtig?

Obwohl $S_{in}$ und $S_{out}$ viel größer sind, bestimmt der **Frame** (2 Bytes) die Granularität:
**Interrupt-Frequenz:** Wenn die Hardware nach jedem Frame (2 Bytes) einen Interrupt auslöst, ist die CPU-Last extrem hoch.
**DMA-Transfer:** Meistens wird der DMA so konfiguriert, dass er erst nach einem vollen Chunk ($S_{in}$) triggert, aber der Speicher muss in 2-Byte-Schritten adressierbar bleiben.

| Merkmal | Strategie in Fall 1 (2-Byte Frames) |
|---|---|
| **Atomarität** | Daten werden in 2-Byte-Paketen konsistent geschrieben. |
| **Puffer-Typ** | Ringpuffer, bestehend aus 160 Frames (320 Bytes). |
| **Minimale Latenz** | Entspricht der Zeit, bis genug Frames für $S_{out}$ bereitstehen. |


- **Methodologischer Hinweis:** Fall 1 ist der einzige vollstaendig deterministische Fall.

$K_{final} = S_{in} + S_{out}$ ist hier eine exakte physische Berechnung.

Ab Fall 2 wird kein lineares Summenmodell mehr verwendet.

Stattdessen werden zwei Ebenen getrennt behandelt:
1. eine Queueing-Approximation fuer mittlere Last- und Variabilitaetseffekte,
2. deterministische Safety-Regeln fuer $K_{base}$, Watermark und Frame-Ausrichtung.

## 4. Fazit
In Fall 1 ist $K$ die Summe aus Eingangs- und Ausgangschunk, wobei die Frame-Größe von 2 Bytes die "Rasterung" des Speichers vorgibt. 
320 Bytes sind hier das absolute Minimum, um sicherzustellen, dass während eines Schreibvorgangs von 128 Bytes immer ein vollständiger Satz von 192 Bytes für den Ausgang bereitsteht.