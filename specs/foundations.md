# Propuesta OpenSpec: Selector de Modo Claro/Oscuro (Foundations)

## 1. Contexto y Objetivos (Why/Context)
El objetivo principal de esta funcionalidad es mejorar la accesibilidad y la experiencia de usuario (UX), asegurando que la web sea cómoda de leer durante la noche o en entornos con poca iluminación. Este elemento formará parte de los cimientos (foundations) de diseño del proyecto.

## 2. Requisitos (What/Requirements)
- **Funcionalidad:** Proveer un selector interactivo (botón, toggle o menú) que permita al usuario alternar manualmente entre modo claro (`light`) y modo oscuro (`dark`).
- **Persistencia (Requisito Crítico):** La preferencia de tema seleccionada por el usuario debe guardarse de forma local (ej. cookies o localStorage). Al regresar a la web o cambiar de ruta, la preferencia debe mantenerse sin parpadeos indeseados (*hydration mismatch*).
- **Stack Tecnológico:** Todo el sistema debe ser construido utilizando **Nuxt 3** y **Tailwind CSS**.
- **Tema por defecto:** El sistema debería leer la preferencia del sistema operativo por defecto si el usuario nunca ha elegido manualmente.

## 3. Arquitectura y Diseño (How/Design)
Para asegurar que esto funcione correctamente en un entorno SSR con Nuxt 3 y se integre visualmente con Tailwind CSS:

- **Gestión del Estado:** Se empleará el módulo oficial `@nuxtjs/color-mode`. Este módulo gestiona auto-mágicamente la persistencia y la reactividad necesaria, además de prevenir destellos (*flashes of unstyled content*).
- **Integración Tailwind:** 
  - Se configurará Tailwind para que active el modo oscuro basado en una clase (`darkMode: 'class'`).
  - `@nuxtjs/color-mode` se encargará de inyectar la clase `dark` en el tag `<html>` raiz.
- **UI:** El selector deberá hacer uso de clases semánticas para adaptarse visualmente y llamar al composable `useColorMode()` para cambiar `$colorMode.preference`.

## 4. Tareas (Tasks)
- [ ] **T1:** Instalar dependencias necesarias (`@nuxtjs/color-mode`).
- [ ] **T2:** Actualizar `nuxt.config.ts` para registrar el módulo y configurarlo para usar el atributo `class`.
- [ ] **T3:** Actualizar `tailwind.config.js` y asegurarse de que el modo oscuro por clase está activo (`darkMode: 'class'`).
- [ ] **T4:** Desarrollar el componente Vue del selector (ej: `ColorModeToggle.vue`).
- [ ] **T5:** Integrar el selector en la disposición base (layouts/default.vue) o la barra de navegación principal.
- [ ] **T6:** Probar las transiciones y comprobar que se mantiene la persistencia tras una recarga del navegador.
