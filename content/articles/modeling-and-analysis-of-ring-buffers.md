---
date: 2026-03-15
title: 'Modeling and Analysis of Ring Buffers: A Journey from Queueing Theory to Embedded C Implementation'
template: post
thumbnail: ''./thumbnails/ring_buffer_article_title.png''
slug: modeling-and-analysis-of-ring-buffers
categories: ring-buffer queueing-theory embedded
tags: ring-buffer queueing-theory embedded
---

# Ring Buffer, have you calculated or designed intuitively? 

## Why this project exists

The challenge was to build a **ring buffer** that simulates a queueing system with variable chunk sizes, frequencies, and jitter, while being portable across platforms from bare metal to Linux. 
The goal was to create a hybrid design that combines the mathematical rigor of queueing theory with practical engineering constraints of embedded systems. It's not a clearly mathematical problem, but rather an engineering design challenge that requires a deep understanding of both theory and practice.
This forced a clean separation between logic and platform.

## Logical design and queueing analysis

- Pure C ring buffer with platform HAL — from bare metal to Linux realtime;
- Kendall's Notation Naming;
- Design by Paradigm from Kleinrock's Queueing Systems, with explicit safety rules and a new $c^2$-based approximation method;
- Allen-Cunneen approximation as an engineering hybrid for embedded systems;

## Status

done.green [Kendall's Notation and Variability Analysis](https://meugenom.com/article/kendall-notation-ring-buffer-sizing)
done.green [Fall 1: D/D/1/K — Deterministisch, konstante Chunks, konstante Frequenzen, kein Jitter](https://meugenom.com/article/fall-1-d-d-1-k)
developing.yellow Fall 2: D/G/1/K — Deterministisch, variable Chunks, konstante Frequenzen, kein Jitter
developing.yellow Fall 3: G/D/1/K — Deterministisch, konstante Chunks, variable Frequenzen, kein Jitter
developing.yellow Fall 4: G/G/1/K — Deterministisch, konstante Chunks, konstante Frequenzen, variabler Jitter
design.blue Fall 5: G/G/1/K — Deterministisch, variable Chunks, konstante Frequenzen, variabler Jitter
design.blue Fall 6: G/G/1/K — Deterministisch, konstante Chunks, variable Frequenzen, variabler Jitter
design.blue Fall 7: G/G/1/K — Deterministisch, variable Chunks, variable Frequenzen, variabler Jitter

design.pink Implementation  mathematical logic to octave code (octave/*.m)

design.pink Theoretical design and queueing analysis

design.pink Project structure and CMake setup

design.pink core/ring_buffer.h — API definition
design.pink tests/test_core.c — logic tests (TDD)
design.pink core/ring_buffer.c — implementation

design.pink platform/none/platform.c
design.pink platform/linux/platform.c
design.pink platform/stm32/platform.c

design.pink tests/test_threaded.cpp

## Design constraints

```text
NO   malloc / new          — forbidden in realtime and embedded hot path
NO   C++ STL               — not available on bare metal
NO   pthread               — POSIX only
NO   exceptions            — no -fexceptions on microcontrollers
NO   dynamic sizing        — buffer capacity fixed at compile time

YES  pure C99/C11          — compiles everywhere
YES  static memory         — no leaks possible by design
YES  platform HAL          — thread safety is swappable per target
YES  power-of-two capacity — fast index wrap with bitmask
```

## Planned project structure

```text
portable-ring-buffer/
│
├── CMakeLists.txt
├── cmake/
│   ├── stm32.cmake           toolchain file for arm-none-eabi-gcc
│   └── posix.cmake           toolchain file for Linux/macOS (optional, uses host compiler by default)
│
├── includes/
│   ├── ring_buffer.h         public API header for users
│   ├── platform.h            platform HAL header for core implementation
│   └── ring_buffer_config.h  user configuration (buffer size, data type, etc.)
│
├── docs/
│   ├── Roadmap_Modells_Table_Info.md  design notes and queueing theory roadmap
│   └── *.md                  future design docs and explanations
│
├── core/
│   └── ring_buffer.c         push / pop / peek / flush / fill_ratio
│
├── platform/
│   ├── platform.h            abstraction: rb_lock(), rb_unlock(), RB_LOG()
│   ├── posix/
│   │   └── platform.c        pthread_mutex + printf (Linux, macOS)  
│   ├── stm32/
│   │   └── platform.c        __disable_irq / __enable_irq + UART log
│   └── none/
│       └── platform.c        no-op (single thread, bare metal no RTOS)
│
├── tests/
│   ├── test_core.c           logic tests — no threads, runs everywhere
│   └── test_threaded.cpp     SPSC stress test — POSIX(Linux, macOS) only
│
├── examples/   
│   └── *.c                  example applications (e.g. audio piper) 
│
├── README.md
└── LICENSE
```

## Project Links

- [GitHub Repository](https://github.com/meugenom/portable-ring-buffer)

## References

- Kleinrock, L. (1975). **Queueing Systems, Vol. 1: Theory**.
- Allen, A. O. (1990). **Probability, Statistics, and Queueing Theory**.
- Little, J. D. C. (1961). A Proof for the Queuing Formula $L = \lambda W$. *Operations Research**
