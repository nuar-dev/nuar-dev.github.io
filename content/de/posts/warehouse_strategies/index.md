---
title: 'Software-Project: Process Mining (WIP)'
date: 2025-08-12
author: nuar-dev
description: Entwicklung, Simulation und Bewertung eines dynamischen Lagerkonzepts mit Process Mining, Zonenstrategien und KPI-gestützter Entscheidungsfindung
isStarred: true
---
# Einleitung
## 📦 Ausgangssituation
Im Rahmen einer SAP S/4HANA-Migration habe ich mich mit der Verbesserung von Geschäftsprozessen beschäftigt. Im Vordergrund stand die Frage, wie das neue ERP-System bestehende Abläufe positiv beeinflussen kann.

Eine besondere Herausforderung bestand darin, mit begrenzten Ressourcen möglichst schnell zu belastbaren Ergebnissen zu gelangen. Meine konkrete Aufgabe war die Umstellung des Kommissionierlagers vom Festplatzsystem auf eine chaotische Lagerhaltung.

Bei der Analyse zeigte sich jedoch, dass eine isolierte Änderung der Lagerstrategie keine nachhaltige Lösung im Kontext einer Systemkonvertierung darstellt. Vielmehr rückte die ganzheitliche Betrachtung von End-to-End-Prozessen in den Fokus.

Um eine robuste und flexible Lösung zu entwickeln, habe ich mich entschieden, gängige Industriestandards bestmöglich zu berücksichtigen und als „Overlay-Lösung“ einzubinden. Dadurch bleibt das Unternehmen unabhängig von spezifischen Produkten einzelner Anbieter (z. B. Signavio von SAP). Gleichzeitig ermöglicht dieses Vorgehen ein internes Benchmarking: Eigene Prozesse können den Angeboten von IT-Dienstleistern gegenübergestellt und deren tatsächlicher Mehrwert realistisch eingeschätzt werden.

Darüber hinaus soll diese Arbeit unter Einbindung von Open-Source-Technologien realisiert werden, um eine nachhaltige, nicht-proprietäre und auditierbare Analytik-Lösung bereitzustellen. Das ist relevant, weil dadurch Vendor-Lock-in vermieden, Kosten- und Update-Zyklen besser gesteuert, Transparenz über Algorithmen und Datenflüsse gesichert und die Anpassungsfähigkeit an sich ändernde Prozesse sowie S/4HANA-Release-Stände verbessert wird. Aufgrund des notwendigen Aufbaus von Daten- und KPI-Governance, der schrittweisen Integration mehrerer Quellsysteme und der iterativen Prozessverbesserung ist das Vorhaben bewusst als mehrjähriges Programm angelegt: zunächst Pilotierung (Discovery/Conformance) in Kernprozessen, anschließend Ausbau um Performance-Analysen und KPI-Steuerung, dann Skalierung auf weitere Bereiche mit Automatisierung, Benchmarking und kontinuierlicher Optimierung.
## 🎯 Zielsetzung (High-Level)
Zentralisierte Oberfläche (`MUI`) mit der Prozesse analysiert und optimiert werden:

|*Phase* | <p style="text-align:center;"> **Feature** </p> |
| ----------- |------------ |
|<p style="text-align:center;">*0*</p>   | <p style="text-align:center;"> **Prozessentdeckung** </p> <br> <p style="text-align:left;"> Die Oberfläche soll automatisch Ist-Prozesse aus Event Logs extrahieren und verständlich visualisieren. So entsteht Transparenz über reale Abläufe, inklusive Varianten und Abweichungen. Nutzer sehen auf einen Blick, wie Prozesse tatsächlich laufen – unabhängig von Soll-Modellen oder Annahmen.</p> |
| |🔍 **Transparenz** <br>🌐 **Varianten erkennen** <br>📊 **Faktenbasis schaffen**|
|<p style="text-align:center;">*1*</p>   | <p style="text-align:center;"> **Konformitätsprüfung**</p> <br> <p style="text-align:left;"> DDie Oberfläche soll Ist-Prozesse mit vorgegebenen Sollmodellen vergleichen. Abweichungen werden automatisch identifiziert und visualisiert, sodass Regelverstöße, Workarounds oder Ineffizienzen sofort erkennbar sind.</p> |
| |✅ **Compliance sichern** <br>⚖️ **Prozesstreue überprüfen** <br>🚦 **Prozessqualität steigern** |
|<p style="text-align:center;">*2*</p>   | <p style="text-align:center;">**Erweiterung**</p><br> <p style="text-align:left;"> Die Oberfläche soll Prozessmodelle mit zusätzlichen Informationen anreichern – z. B. Durchlaufzeiten, Ressourcenauslastung oder Engpässe. Dashboards stellen relevante KPIs dar, während Verfahren wie Predictive Analytics Prognosen über mögliche Verzögerungen oder Risiken erlauben. </p> |
| |⏱️ **Leistung messen** <br>🧭 **Bottlenecks erkennen**<br>🔮 **Risiken vorhersagen** |
|<p style="text-align:center;">*3*</p>   | <p style="text-align:center;">**Prozessverbesserung**</p><br> <p style="text-align:left;"> Die Oberfläche soll die aktive Optimierung von Soll-Prozessen unterstützen. Dazu gehören Simulationen („What-if“-Szenarien), automatisierte Verbesserungsvorschläge und Vergleiche mit Best-Practice-Referenzmodellen. So lassen sich Prozesse iterativ neu gestalten und nachhaltig optimieren.</p> |
| |🛠️ **Prozesse gezielt anpassen**<br>🎯 **Optimierungen simulieren**<br>♻️ **kontinuierlich verbessern** |

## Motivation und Problemstellung

# Anforderungen
## Funktionale Anforderungen
## Nicht-Funktionale Anforderungen
# System- und Projektplanung
## Projektorganisation
## Meilensteine
## Resourcen
### Verwendete Technologien
```bash
Sprachen: Rust, Typescript, Javascript
Frameworks: React, Zustand, MUI, Tauri
Datenbanken: NoSql, HANA
```
## Risiken
# Analyse und Entwurf
## Lagerstrategien
### Zonenkonzept
Die Lagerfläche wurde in **funktionale Zonen** unterteilt, z. B.:

| Zone                  | Zweck                                         | Relevante Strategien |
|-----------------------|-----------------------------------------------|----------------------|
| High-Runner-Zone      | Schneller Zugriff auf häufig genutzte Artikel | `ABC-Analyse`, `FIFO`, `Slotting` |
| Gefahrstoffzone       | Sichere Lagerung gesetzlich regulierter Güter | Lagerklassensteuerung, Zutrittskontrolle |
| Qualitätsprüfzone     | Wareneingangskontrolle                        | Quarantäne- & Prüflagerstrategie |
| VAS-Zone              | Value Added Services (Kitting, Etikettierung) | Arbeitsplatzorientierte Steuerung |
| Kommissionierzone     | Pick & Pack / Multi-Order-Picking             | Kommissionierstrategie |
| Versorgungszone       | Just-in-Time Materialbereitstellung           | Kanban, Replenishment |

> **Hinweis:** Die chaotische Lagerstrategie soll gezielt **innerhalb bestimmter Zonen** eingesetzt werden, um Flexibilität und Auslastung zu optimieren.
### 🖼️ Demo
{{< sidequote src="/images/demo.gif" alt="demo">}}
>[Programmatische](https://github.com/nuar-dev/warehouse_strategies_exemplified) Betrachtung der Auslastung eines Kommissionierlagers 
{{< /sidequote >}}

Die Demo veranschaulicht, wie dynamische Lagerkonzepte die Auslastung sowie Lagerkennzahlen verbessern können.
# Implementierung
# Testen
# Ergebnisse



