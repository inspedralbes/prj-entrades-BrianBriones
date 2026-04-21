# Especificación Detallada (OpenSpec): Funcionalidad de Modo Claro/Oscuro

## 1. Interfaz de Usuario (UI) y Experiencia
- **Ubicación del Control:** El usuario interactuará con el cambio de tema a través de un botón específico ubicado en la **barra de navegación principal (Navbar)**.
- **Interacción Automática:** Al presionar el botón, el cambio entre temas debe ser inmediato y reflejarse globalmente en toda la aplicación.
- **Accesibilidad:** El botón deberá incluir un indicador visual (como un icono de sol para día, y luna para la noche) o un interruptor (toggle).

## 2. Paleta de Colores y Diseño Visual
Se definen dos estados cromáticos que convivirán de manera armónica gracias al sistema de Tailwind:

### A. Modo Oscuro (Noche - Estado Base Actual)
- **Fondo Principal:** Azul ultra oscuro / Negro (ej. `bg-[#050b18]` o `bg-slate-950`).
- **Acento de Marca (CTA):** **Verde Neón** (ej. `bg-[#2eff8c]`). Visible en el logo y botones principales.
- **Tipografía:** Blanco puro para títulos y gris claro (`text-slate-400`) para descripciones.
- **Input de Búsqueda:** Fondo oscuro con borde sutil, coherente con la estética actual.

### B. Modo Claro (Día)
- **Fondo Principal:** Blanco puro o gris muy limpio (`bg-slate-50`).
- **Acento de Marca:** Se conserva el **Verde Neón** en botones. En textos, se usará un verde un tono más oscuro para cumplir con accesibilidad (contraste).
- **Tipografía:** El azul oscuro del modo noche pasará a ser el color principal de la fuente (`text-slate-900`).
- **Componentes:** Las tarjetas y el buscador tendrán sombras sutiles (*soft shadows*) para diferenciar capas sobre el fondo blanco.

*Implementación en Tailwind:* Las clases utilizarán el prefijo `dark:` (ej. `bg-white dark:bg-blue-950`) para indicar qué colores aplican cuando el modo oscuro está activo.

## 3. Estado, Persistencia y Recarga (Ciclo de Vida)
- **Persistencia Exacta:** Tal como se estableció como regla en las fundaciones, el "tema actual" no debe perderse. Al recargar la página, navegar a otra url internamente, o cerrar y volver a abrir la pestaña más adelante, el sistema **debe** recordar exactamente qué modo tenía activo el usuario en ese momento.
- **Prevención de Parpadeos (No FOUC):** La persistencia debe ejecutarse tan pronto inicie la carga del HTML para evitar que el usuario que tiene el modo oscuro sufra un "flash" o parpadeo blanco antes de que el Javascript logre oscurecer la pantalla.

## 4. Tareas de Implementación (Checklist Específico)
- [ ] Localizar e inyectar el botón en el componente de la Navbar (`components/Navbar.vue` o similar).
- [ ] Añadir iconos o textos dinámicos al botón (que muestre la luna cuando esté claro y el sol cuando esté oscuro).
- [ ] Aplicar colores en el layout principal (ej. `app.vue` o `layouts/default.vue`) con clases base como `min-h-screen bg-white transition-colors duration-300 dark:bg-blue-950 dark:text-white`.
- [ ] Comprobar y ajustar que el verde suave (`text-emerald-400` / `bg-emerald-500` o similar) luzca bien y tenga buen contraste en ambos fondos.
- [ ] Hacer pruebas manuales de recarga (`F5`) estando en Modo Oscuro para certificar que el fondo se mantiene y no hay parpadeos.
