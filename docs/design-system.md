# Sistema de diseño de PETSIKI

## Tema

PETSIKI conecta mascotas que buscan casa con personas que quieren adoptar. El objeto más
característico de ese mundo es la **placa del collar**: la chapita con el nombre del animal y un
teléfono para llamar. Esa placa es el elemento memorable del sitio. Las tarjetas de mascotas, el
logo y el hero usan su forma (esquinas muy redondeadas y un agujero perforado arriba). Todo lo
demás se mantiene tranquilo.

## Color

| Nombre        | Hex       | Uso                                               |
| ------------- | --------- | ------------------------------------------------- |
| Nube          | `#EEF2F7` | Fondo general, azul grisáceo frío                 |
| Tinta         | `#1F2742` | Texto principal y títulos (azul marino, no negro) |
| Tinta suave   | `#4A5373` | Texto secundario (contraste 6,9:1 sobre Nube)     |
| Ciruela       | `#6A3EA1` | Acciones principales, links, foco                 |
| Ciruela honda | `#4E2A7E` | Hover y texto sobre Lavanda                       |
| Lavanda       | `#E5DCF6` | Superficies secundarias y botones secundarios     |
| Pistacho      | `#C4E38A` | Placas, estado "disponible", detalles alegres     |
| Durazno       | `#FFC6A6` | Favoritos y estado "en proceso"                   |
| Línea         | `#D6DCE8` | Bordes y divisores                                |

Las sombras usan Ciruela con baja opacidad, nunca gris neutro.

## Tipografía

Una sola familia: **Bricolage Grotesque** (variable, ejes de peso 200–800 y ancho 75–100 %).

- Títulos display: peso 800, ancho 78 %, interlineado 0,95, tracking -0,02em. Los nombres de las
  mascotas se escriben grandes, como grabados en la placa.
- Títulos de sección: peso 700, ancho 90 %.
- Texto: peso 400, ancho 100 %, interlineado 1,6, líneas de 75 caracteres como máximo.

Escala (rem): 0,875 · 1 · 1,25 · 1,563 · 2,441 · 3,815 · 5,96.

## Forma

Jerarquía de radios, no un radio único:

- Botones y chips: píldora (`9999px`).
- Placas y tarjetas: `28px`, con agujero perforado opcional.
- Inputs y selects: `14px`.
- Modales: `32px` en escritorio; en móvil suben desde abajo con esquinas superiores redondeadas.

## Layout

Contenido alineado a la izquierda, ancho máximo de 1200 px y márgenes de 20 px en móvil y 40 px
en escritorio.

```
Escritorio                          Móvil
+--------------------------------+  +----------------+
| logo  Inicio Mascotas Favs  [Cuenta]| | logo     [Cuenta]|
+--------------------------------+  +----------------+
| contenido                      |  | contenido      |
|                                |  |                |
+--------------------------------+  +----------------+
                                    | nav inferior   |
                                    +----------------+
```

## Movimiento

- Un solo momento orquestado al cargar cada página: entrada suave con spring (opacidad y 12 px).
- El resto del movimiento responde a acciones: presionar botones, abrir modales, marcar
  favoritos y cambiar de pestaña (el indicador se desliza entre pestañas).
- Springs suaves (`stiffness 260`, `damping 30`). Nada de rebotes exagerados salvo el "pop" del
  corazón.
- Con `prefers-reduced-motion` se eliminan los desplazamientos y solo quedan fundidos cortos.

## Escritura

Frases en minúscula inicial (sentence case), verbos claros y sin etiquetas en mayúsculas sobre
los títulos. Un botón dice lo que hace: "Guardar mascota", no "Enviar". Los errores dicen qué pasó
y cómo arreglarlo.

## Lo que evitamos

Fondo crema con acento terracota, tarjetas idénticas con la misma sombra gris, eyebrows en
mayúsculas, separadores con punto medio y flechas pegadas al texto de los botones.
