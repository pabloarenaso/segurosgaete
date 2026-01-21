# Seguros Gaete - Brand Guidelines Skill

## Cuándo usar este skill
- Al crear o modificar cualquier componente visual del sitio
- Al diseñar nuevas landing pages o secciones
- Al mantener consistencia de marca en todo el proyecto
- Al crear elementos gráficos, banners o imágenes
- Al agregar contenido visual nuevo

## No usar cuando
- Se trate de código backend o lógica de negocio sin componente visual
- Documentación técnica interna sin exposición al usuario

---

## IDENTIDAD DE MARCA

### Logotipo
- **Isotipo**: Letra "G" de Gaete formada dentro de un diseño geométrico
- **Colores del isotipo**: Gradiente en tonos azulados (ver paleta de colores)
- **Composición**: Isotipo + "Seguros Gaete" + "Corredores de Seguros"
- **Tamaño mínimo**: 50mm altura / 300px en digital
- **Área de autonomía**: Calculada usando el tamaño de la letra "E" de Gaete

### Variaciones permitidas del logo
✅ PERMITIDO:
- Logo completo con isotipo en colores
- Logo en blanco sobre fondo oscuro
- Logo en negro sobre fondo claro
- Versión horizontal: isotipo a la izquierda, texto a la derecha

❌ NO PERMITIDO:
- Logo sin el isotipo completo visible
- Cambiar colores del isotipo
- Logo con bajo contraste sobre fondos de colores corporativos
- Deformar, rotar o modificar proporciones
- Usar solo el isotipo sin el texto "Seguros Gaete"

---

## PALETA DE COLORES

### Colores Primarios (usar en Tailwind)

**Color Principal - Teal Oscuro**
- CMYK: 93, 19, 26, 4
- RGB: 21, 123, 141
- HEX: #157B8D
- PANTONE: 321c
- Tailwind: `bg-[#157B8D]` o crear custom: `teal-primary`

**Color Secundario - Turquesa Claro**
- CMYK: 41, 1, 8, 0
- RGB: 151, 212, 212
- HEX: #97D4D4
- PANTONE: 572c
- Tailwind: `bg-[#97D4D4]` o `teal-light`

**Color Acento - Azul Claro**
- CMYK: 44, 8, 9, 0
- RGB: 144, 195, 204
- HEX: #90C3CC
- PANTONE: 7464c
- Tailwind: `bg-[#90C3CC]` o `blue-light`

**Blanco**
- RGB: 255, 255, 255
- HEX: #FFFFFF
- Tailwind: `bg-white`

### Uso de colores
- **Primario (#157B8D)**: Headers, CTAs principales, enlaces importantes
- **Secundario (#97D4D4)**: Fondos de secciones, tarjetas, elementos de apoyo
- **Acento (#90C3CC)**: Detalles, iconos, elementos decorativos
- **Blanco**: Fondos principales, contraste sobre colores oscuros

---

## TIPOGRAFÍA

### Tipografía Principal - Gotham Bold
- **Uso**: Títulos, headings (H1, H2, H3), CTAs, elementos destacados
- **Peso**: Bold
- **Fallback en web**: Si no está disponible usar: 'Montserrat', 'Arial Black', sans-serif

### Tipografía Corporativa - Muli Family
- **Uso**: Texto de cuerpo, párrafos, descripciones, formularios
- **Pesos disponibles**: Regular y Bold
- **Fallback en web**: 'Inter', 'Open Sans', sans-serif

### Jerarquía tipográfica recomendada
H1: Gotham Bold, 48px-64px
H2: Gotham Bold, 36px-48px
H3: Gotham Bold, 24px-32px
H4: Gotham Bold, 20px-24px
Body: Muli, 16px-18px
Small: Muli, 14px

---

## COMPONENTES ESTÁNDAR DEL SITIO

### 1. Header/Navegación
- Logo en esquina superior izquierda
- Menú de navegación horizontal (desktop) / hamburguesa (mobile)
- CTA destacado "Cotiza Ahora" o similar en color primario
- Fondo blanco con sombra sutil

### 2. Hero Section
- Imagen de fondo: personas, familias, seguridad, confianza
- Overlay oscuro (opacity 30-50%) para mejorar legibilidad
- Título grande en Gotham Bold, blanco
- Subtítulo en Muli, blanco
- CTA prominente en color primario (#157B8D)
- Height mínimo: 60vh en desktop, 50vh en mobile

### 3. Cards de Tipos de Seguros
- Fondo blanco con border o sombra sutil
- Icono representativo arriba
- Título en Gotham Bold, color primario
- Descripción breve en Muli
- Link "Más información" en color primario
- Hover: elevar con sombra más pronunciada

### 4. Sección de Beneficios/Features
- Grid de 3-4 columnas (desktop), 1 columna (mobile)
- Iconos consistentes en color secundario
- Títulos cortos en Gotham Bold
- Descripciones en Muli
- Fondo alternado: blanco / color secundario claro

### 5. Formularios de Contacto/Cotización
- Labels en Gotham Bold, color primario
- Inputs con border color secundario
- Placeholder text en gris claro
- Botón submit en color primario con hover más oscuro
- Validación con mensajes claros
- Responsive: full width en mobile

### 6. Testimonios (si aplica)
- Cards con fondo secundario claro
- Comillas destacadas en color primario
- Texto en Muli
- Nombre del cliente en Gotham Bold
- Foto circular (opcional)

### 7. Footer
- Fondo: color primario oscuro (#157B8D)
- Texto: blanco
- Logo en versión blanca
- Información de contacto claramente visible
- Enlaces organizados por categorías
- Redes sociales con iconos blancos
- Copyright en texto pequeño

---

## ESTRUCTURA DE LANDING PAGES

### Orden recomendado de secciones:
1. **Hero**: Mensaje principal + CTA
2. **Beneficios**: Por qué elegir Seguros Gaete (3-4 items)
3. **Tipos de Seguros**: Cards con seguros disponibles
4. **Proceso**: Cómo funciona (3-4 pasos)
5. **Confianza**: Testimonios, años de experiencia, certificaciones
6. **CTA Final**: Formulario de contacto o llamado a acción
7. **Footer**: Información completa

---

## INSTRUCCIONES DE DESARROLLO

### Stack Técnico
- Framework: Vite + TypeScript
- Styling: Tailwind CSS
- Componentes: React/Vue (según proyecto)

### Tailwind Config - Agregar estos colores custom
```javascript
theme: {
  extend: {
    colors: {
      'gaete-primary': '#157B8D',
      'gaete-secondary': '#97D4D4',
      'gaete-accent': '#90C3CC',
    },
    fontFamily: {
      'heading': ['Gotham', 'Montserrat', 'sans-serif'],
      'body': ['Muli', 'Inter', 'sans-serif'],
    }
  }
}
```

### Principios de diseño
1. **Mobile First**: Diseñar primero para móvil, luego expandir
2. **Responsive Breakpoints**:
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px
3. **Spacing**: Usar escala de Tailwind (4, 8, 12, 16, 24, 32, 48, 64px)
4. **Accesibilidad**: Contraste mínimo 4.5:1, texto legible, labels claros
5. **Performance**: Optimizar imágenes (WebP), lazy loading
6. **Consistencia**: Reutilizar componentes, no crear variaciones innecesarias

### Organización de archivos
src/
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Benefits.tsx
│   │   ├── InsuranceTypes.tsx
│   │   └── ContactForm.tsx
├── assets/
│   ├── images/
│   └── icons/
└── styles/
└── globals.css (Tailwind imports)

---

## TONO DE VOZ Y CONTENIDO

### Personalidad de la marca
- **Profesional**: Expertos confiables en seguros
- **Cercano**: No intimidante, fácil de entender
- **Transparente**: Clara información, sin letra chica engañosa
- **Orientado al cliente**: Enfoque en beneficios para el cliente

### Lenguaje
- ✅ Usar: "Protege a tu familia", "Estamos aquí para ti", "Asesoría personalizada"
- ❌ Evitar: Jerga técnica excesiva, promesas exageradas, presión de venta

### Llamados a acción (CTAs)
- Claros y directos
- Ejemplos: "Cotiza Gratis", "Habla con un Experto", "Protege tu Auto", "Solicita Información"
- Usar verbos de acción

---

## ELEMENTOS GRÁFICOS

### Grafismos permitidos
- Usar formas basadas en el isotipo (la G) como elementos decorativos
- Patterns sutiles con los colores corporativos
- Líneas diagonales o curvas que evoquen protección/seguridad

### Fotografías
- **Estilo**: Naturales, cálidas, personas reales
- **Temas**: Familias, hogar, automóviles, tranquilidad, seguridad
- **Tratamiento**: Colores vivos pero naturales, evitar filtros excesivos
- **Overlay**: Cuando se use texto sobre imagen, aplicar overlay oscuro

### Iconografía
- Estilo: Line icons, outline
- Color: Primario o secundario según contexto
- Consistencia: Mismo estilo en todo el sitio
- Tamaño: Proporcional y balanceado

---

## RESPONSIVE DESIGN

### Mobile (< 640px)
- Logo más pequeño pero legible
- Navegación hamburguesa
- Una columna para todo el contenido
- Botones full-width
- Espaciado reducido pero cómodo

### Tablet (640px - 1024px)
- 2 columnas para grids
- Navegación visible o hamburguesa según espacio
- Espaciado medio

### Desktop (> 1024px)
- 3-4 columnas para grids
- Navegación horizontal completa
- Espaciado generoso
- Max-width del contenedor: 1280px

---

## VALIDACIÓN ANTES DE DEPLOY

Checklist de revisión:
- [ ] Logo cumple tamaño mínimo (300px en web)
- [ ] Colores corporativos correctos (verificar HEX)
- [ ] Tipografías Gotham Bold y Muli aplicadas correctamente
- [ ] Responsive funciona en mobile, tablet, desktop
- [ ] Contraste de texto suficiente (WCAG AA)
- [ ] CTAs prominentes y claros
- [ ] Formularios validados correctamente
- [ ] Imágenes optimizadas
- [ ] Sin errores de consola
- [ ] Carga rápida (< 3 segundos)

---

## NOTAS IMPORTANTES

- SIEMPRE consultar este skill antes de crear nuevos componentes visuales
- Mantener consistencia con estas guías en todo el sitio
- Si necesitas desviarte de las guías, documenta el motivo
- Priorizar la experiencia del usuario sobre preferencias de diseño
- Recordar que el objetivo es generar confianza y facilitar la cotización

Puedes revisar el archivo MANUAL DE MARCA SEGUROS GAETE.pdf
