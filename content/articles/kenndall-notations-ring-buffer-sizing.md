---
date: 2026-03-15
title: 'Kendall-Notation — Ring Buffer Sizing'
template: post
thumbnail: ''
slug: kendall-notation-ring-buffer-sizing
categories: ring-buffer queueing-theory embedded kendall-notation
tags: ring-buffer queueing-theory embedded kendall-notation
---

# Kendall-Notation — Ring Buffer Sizing

Hauptartikel: [Modeling and Analysis of Ring Buffers: A Journey from Queueing Theory to Embedded C Implementation](https://meugenom.com/article/modeling-and-analysis-of-ring-buffers)

## Notation: A/B/c/K

| Symbol | Position | Bedeutung |
|---|---|---|
| **A** | Ankunftsprozess | Verteilung der Zwischenankunftszeiten (Producer) |
| **B** | Bedienzeit | Verteilung der Bedienzeiten (Consumer) |
| **c** | Server | Anzahl paralleler Consumer |
| **K** | Puffergröße | Endliche Kapazität des Ring Buffers |


## Symbole

| Symbol | Bedeutung | $c^2$ |
|---|---|---|
| **D** | Deterministisch — konstante Intervalle/Größen | $c^2 = 0$ |
| **G** | General — beliebige Verteilung, begrenzt durch [min, max] | $0 < c^2 < \infty$ |

- **Kein M (Markovian):** In diesem Projekt werden keine exponentiellen Ankunftsprozesse angenommen. Alle Variabilitätsquellen (Chunks, Frequenzen, Jitter) sind **begrenzt** (min/max bekannt) und werden als Gleichverteilung modelliert (Maximum Entropie Prinzip, Jaynes 2003). Daher: G, nicht M.
- **Methodische Praezisierung:** In diesem Projekt wird die Kendall Notation als Modell fuer den Producer/Consumer Zeitverlauf verwendet. Variable Chunk Grössen werden dabei als variable effektive Service, bzw. Arrival Demand interpretiert und in die Klasse G der jeweiligen A oder B-Seite überführt. Das ist eine zulässige Engineering Abstraktion für den Ring Buffer, keine wörtliche 1:1 Abbildung einer klassischen Paket-Queue.

## Fallzuordnung

| Fall | Kendall | Ankunft (Producer) | Bedienung (Consumer) | Aktive $c^2$ Quellen |
|---|---|---|---|---|
| **1** | D/D/1/K | D — $f_{in}$ konstant, $S_{in}$ konstant | D — $f_{out}$ konstant, $S_{out}$ konstant | keine |
| **2** | D/G/1/K | D — $f_{in}$ konstant | G — $S_{out}$ variabel | $c^2_{chunk\_out}$ |
| **3** | G/D/1/K | G — $f_{in}$ variabel | D — $S_{out}$ konstant, $f_{out}$ konstant | $c^2_{freq\_in}$ |
| **4** | G/G/1/K | G — Jitter macht Ankunft nicht-deterministisch | G — Jitter macht Bedienung nicht-deterministisch | $J_{in}^2/3$, $J_{out}^2/3$ |
| **5** | G/G/1/K | G — $S_{in}$ variabel + Jitter | G — $S_{out}$ variabel + Jitter | $c^2_{chunk} + J^2/3$ |
| **6** | G/G/1/K | G — $f_{in}$ variabel + Jitter | G — $f_{out}$ variabel + Jitter | $c^2_{freq} + J^2/3$ |
| **7** | G/G/1/K | G — $S_{in}$ + $f_{in}$ variabel + Jitter | G — $S_{out}$ + $f_{out}$ variabel + Jitter | $c^2_{chunk} + c^2_{freq} + J^2/3$ |

## Warum G statt M bei Jitter?

Jitter erzeugt eine **gleichmäßige** Schwankung $T_i \in [T(1-J), T(1+J)]$,
keine **exponentiellen** Zwischenankunftszeiten. Der Variationskoeffizient ist:

$$c^2_{jitter} = \frac{J^2}{3} \ll 1$$

Für M (Markovian/Exponential) wäre $c^2 = 1$. Da $c^2_{jitter} \ll 1$,
ist G die korrekte Kennzeichnung (Allen 1990, Kap. 2.3).

## Variationskoeffizienten — Übersicht

| Quelle | Verteilung | $\sigma^2$ | $c^2$ |
|---|---|---|---|
| Variable Chunks $[S_{min}, S_{max}]$ | Gleichverteilung | $(S_{max}-S_{min})^2/12$ | $(S_{max}-S_{min})^2 / (3(S_{max}+S_{min})^2)$ |
| Variable Frequenz $[f_{min}, f_{max}]$ | Gleichverteilung auf $[1/f_{max}, 1/f_{min}]$ | $(1/f_{min}-1/f_{max})^2/12$ | $(1/f_{min}-1/f_{max})^2 / (12 \cdot (1/f_{avg})^2)$ |
| Jitter $J$ | Gleichverteilung auf $[T(1-J), T(1+J)]$ | $T^2 J^2/3$ | $J^2/3$ |

**Additivität:** Bei mehreren unabhängigen Quellen addieren sich die $c^2$-Werte
(Allen 1990, Kap. 2.3):

$$c^2_{total} = c^2_{chunk} + c^2_{freq} + c^2_{jitter}$$

## Quellen

| Num | Quelle | Verwendet |
|---|---|---|
| 1 | Kendall, D.G. (1953). **Stochastic Processes Occurring in the Theory of Queues** | Kendall-Notation A/B/c/K |
| 2 | Allen, A.O. (1990). **Probability, Statistics, and Queueing Theory**. Kap. 2.3 | Variationskoeffizient, G-Klassifikation |
| 3 | Jaynes, E.T. (2003). **Probability Theory: The Logic of Science**. Kap. 11 | Max-Entropie → Gleichverteilung |