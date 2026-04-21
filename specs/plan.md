# Plan de Implementación (OpenSpec): Selector de Tema Claro/Oscuro

> **Principio de Diseño Fundamental (Dark Mode First):** El estado principal y base de la aplicación es el entorno nocturno (Fondo `#050b18` y resaltes `#2eff8c`). El modo claro se tratará como un tema de alteración, construido sobre las bases del sistema Tailwind como su contraparte.

## Fase 1: Infraestructura de Estilos y Persistencia
En esta fase se configuran las librerías base de Nuxt 3 y de Tailwind, prestando especial atención técnica a la inyección SSR para evitar destellos visuales.

1. **Dependencia y Módulo:** Instalar e integrar `@nuxtjs/color-mode` en las dependencias. 
2. **Configuración de Nuxt (`nuxt.config.ts`):** 
   - Registrar `@nuxtjs/color-mode` en la lista de módulos.
   - **PASO TÉCNICO CRÍTICO (Anti-FOUC):** Se debe configurar el módulo explícitamente para enlazar con Tailwind y evitar el parpadeo. El módulo inyectará un pequeño script síncrono en el `<head>` antes que el cuerpo del HTML de la página (y de todo el render de Vue) se serialice, leyendo la preferencia del visitante instantáneamente. Se configurará:
     ```typescript
     colorMode: {
       classSuffix: '', 
       preference: 'dark', 
       fallback: 'dark', 
     }
     ```
3. **Configuración de Tailwind (`tailwind.config.js`):**
   - Activar la evaluación basada en clases inyectadas al HTML por Nuxt: `darkMode: 'class'`.
   - Opcional pero recomendado: Registrar `#050b18` (ej. `brand-dark`) y `#2eff8c` (ej. `brand-neon-green`) en `theme.extend.colors` para mantener la especificidad del color uniforme.

## Fase 2: Configuración del Layout Base
Ajustar la capa global del DOM (`app.vue` o `layouts/default.vue` o global `index.css`).

1. **Variables y Clases Globales:** Asegurar que el elemento envoltorio del cuerpo de la aplicación inicialice la paleta de Tailwind condicional.
   - *Modo Oscuro Base:* El fondo dictamina el elemento padre general. Se aplicarían variables como `bg-[#050b18] text-white`.
   - *Modo Claro Counterpart:* Utilizando Tailwind de forma condicionada `dark:...`: Se definirá globalmente clases que alternen, por ejemplo, los fondos, como class: `bg-slate-50 dark:bg-[#050b18] text-slate-900 dark:text-white transition-colors duration-200`. De este modo cualquier background "hereda" y el modo claro es la capa diurna, mientras que `dark:` nos protege en el estado natural en `#050b18`.

## Fase 3: UI / Componentes e Interacción Analítica
Implementación del botón de la Navbar centralizado para la experiencia del usuario y ajustes de las vistas de contenido.

1. **Control en Navbar:** 
   - Añadir un componente botón (toggle) a `components/Navbar.vue`.
   - Llamar al composable de nuxt-color-mode: `const colorMode = useColorMode();` y crear una función que asigne un valor al interactuar, ej. `@click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"`.
   - Que el botón muestre de forma visual interactiva qué estado de luz o noche representa (iconos Sol/Luna o iconos de estilo de estadio con las luces encendidas vs apagadas).
2. **Aplicación del Verde Neón `#2eff8c`:** Los Call-To-Actions (Buy Ticket, Login) y el Input de búsqueda que lo requiera deberán llevar el acento explícito `#2eff8c`. 
   - Como se especificó en el `spec.md`, el acento se mantendrá. Si el texto interior pierde contraste en día, las tipografías del botón se ajustarán según el modo oscuro o claro de fondo (ej: Fondo neon con letras oscuras en ambos contextos para alta legibilidad).
3. **Manejo de Profundidad en Claro:** Implementar la especificación para elementos anidados como las Box/Cards. Mientras que estas cajas en el modo Oscuro solo tendrían bordes tenues `border-slate-800` (manteniéndose planas), en el modo claro necesitarán `shadow-sm` para distinguirse del backgroup blanco.

## Fase 4: QA, Pruebas y Aprobación
Validación metódica y punto de confirmación de finalización de esta especificación.

1. **Prueba de Carga (Persistencia de Estado y Anti-FOUC):**
   - El QA inicial cambiará el color mediante el botón del Navbar a "Día".
   - Hará recarga brusca de la página (`F5`).
   - El sistema NO DEBERÁ reaccionar parpadeando el `bg-[#050b18]` en la carga; deberá ser blanco desde el momento cero (verificado inyectando un retraso artificial en la red (Throttling) si es necesario).
2. **Aislamiento Funcional:** Verificar que el selector y los estados mutables de color ocurren globalmente en todas las páginas (rutas) de Nuxt, independientemente por dónde haya entrado el usuario.
3. **Aseguramiento de accesibilidad (Verde sobre Blanco):** Revisión de contraste real (luminancia) para el verde `#2eff8c` cuando se usa como contorno o fondo y un fondo blanco rodeándolo, asegurándose de que la tipografía interna `text-slate-900` se imponga lo suficiente.
