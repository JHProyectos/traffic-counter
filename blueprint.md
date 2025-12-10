# Angular Traffic Counter

## Overview

A simple yet elegant application to count different types of vehicles. It showcases modern Angular features like standalone components, signals for state management, and the new control flow syntax.

## Implemented Features (Phase 3)

### Style and Design

*   **Color Palette:** A modern and vibrant color scheme with purple as the primary color.
*   **Typography:** Clean and readable 'Roboto' font.
*   **Layout:** A simple and intuitive layout with a header, a main content area, and cards for each measurement.
*   **Component Styling:** Custom styles for the `AppComponent` and `CounterComponent` to create a cohesive look and feel.
*   **Interactive Counters:** The counter buttons now have hover and active states for better user feedback.
*   **Dark Mode:** A theme toggle to switch between light and dark modes.

### Features

*   **`AppComponent`:** The main component that manages the list of traffic measurements.
    *   Uses signals (`signal()`) to manage the state of the measurements.
    *   A "New Measurement" button to add a new measurement card to the list.
    *   Displays a list of measurement cards.
    *   A "Clear All" button to clear all measurements.
    *   Displays the total number of vehicles counted across all measurements.
*   **`CounterComponent`:** A reusable component for displaying and incrementing vehicle counts.
    *   Uses `input()` for the label and count.
    *   Uses `output()` to emit an increment event.
*   **`Measurement` interface:** Defines the structure for a traffic measurement.
*   **`StorageService`:** A service to persist the measurements to local storage.
*   **`ThemeService`:** A service to manage the theme of the application.
*   **`ChartComponent`:** A reusable component for displaying a bar chart of the total vehicle counts.
*   **Standalone Components:** All components are standalone.
*   **OnPush Change Detection:** All components use `ChangeDetectionStrategy.OnPush`.
*   **Native Control Flow:** Uses `@for` to loop through the measurements in the `AppComponent` template.

## Current Plan (Phase 3)

*   **Add animations:** Add animations to make the application more engaging.
