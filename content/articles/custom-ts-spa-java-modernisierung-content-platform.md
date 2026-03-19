---
date: 2026-03-01
title: 'Custom TS-SPA & Java Backend: Modernisierung meiner Content-Plattform'
template: post
thumbnail: './thumbnails/content-platform-modernisierung-neon.png'
slug: custom-ts-spa-java-modernisierung-content-platform
tags: custom content update modernisierung
cluster: custom-ts-spa-java-modernisierung-content-platform
order: 0
---

## Was ist neu?

Dies ist das erste große Update vom 1. März.pink 2026.pink, welches mich zu weiteren wichtigen Schritten motiviert. Das Design der Webseite bleibt witerhin minimalistisch und auf eine intuitive Benutzeroberfläche (UI) ausgelegt.

Die Seite ist es nun hervorragenden Werkzeug zur Veröffentlichung von Artikeln und technischen Inhalten. Sie dient mit primär zur Vorbereitung auf mein anstehendes Studium der Elektrotechnik/purple an einer Technischen Hochschule in Deutschland und wird mich hoffentlich auch während des Studium unterstützen. Daher werden künftig alle Kerninhalte mit Bezug zu diesem Fachbereich verfasst. 

Für die Darstellung von TeX-Formeln habe ich dei Open-Source-Bibliothek[Katex](https://github.com/KaTeX/KaTeX) integriert. Auch das Backend wurde umfassend modernisiert und auf neue Herausforderungen veorbereitet. Funktionen wie die Volltextsuche, Tags und eine verbesserte visuelle Orientierung innerhalb der Artikel ermöglichen eine tiefgehende Personalisierung der Fachinhalte.

## Danksagung

- [Katex](https://github.com/KaTeX/KaTeX) - für diese äußerst elegante LaTeX-Bibliothek. 
- [TailwindCSS](https://tailwindcss.com) - dafür, dass ich mich auf den Kerncode konzentrieren kann, sowie für die intuitive und leicht verständliche Struktur des Frameworks.
- [Github Team](https://github.com) - für die Bereitstellung ihrer hochmodernen Plattform zur Versionsverwaltung sowie für das kostenlose Hosting meiner Projekt-Repositories.

## Technischer Aufbau

### Frontend

Das Frontend ist eine Single-Page-Application (SPA), die vollständig in TypeScript|indigo geschrieben wurde – ohne ein großes UI-Framework wie React, Vue oder Angular. 
Der eigene leichtgewichtige Router sorgt für die Navigation zwischen den Seiten, ohne den Browser neu laden zu müssen. Als Build-Tool kommt Webpack-5|purple zum Einsatz, das den TypeScript-Code kompiliert, Stylesheets bündelt und das fertige Ergebnis für die Produktion optimiert.
Für die Syntaxhervorhebung von Code-Beispielen in Artikeln wird PrismJS|yellow verwendet, das eine Vielzahl von Programmiersprachen unterstützt. Die Stile werden mit PostCSS|green und TailwindCSS-v4|blue verarbeitet, was eine schnelle und konsistente Gestaltung der Komponenten ermöglicht.

### Backend

Das Backend basiert auf Java-17|purple und Spring-Boot-2.7|purple, das als robuste und bewährte Grundlage für den Server dient. Die Kommunikation zwischen Frontend und Backend erfolgt über eine GraphQL-API|pink (graphql-java-kickstart), die es erlaubt, gezielt nur die benötigten Daten abzufragen – besonders effizient für Artikel-Listen, Tags und Suchfunktionen.

Zur Verbesserung der Antwortzeiten wird Redis|red als In-Memory-Cache eingesetzt. Spring Security schützt die administrativen Endpunkte. Die Datenpersistierung übernimmt Spring-Data-Redis|green, als In-Memory-Datenbank für Tests verwendet wird.

### Tests

Auf der Frontend-Seite werden Unit-Tests mit Jest|green und `jsdom` geschrieben, sodass Komponenten und Logik isoliert und ohne Browser getestet werden können.

</br>

![High Keys Minimalistic](./images/high_key_minimalistic_pro.png)
