# Simulador de la Ley de Amdahl

Aplicación web que permite calcular el efecto de mejorar una parte de un sistema
sobre su tiempo total de ejecución.

## Funciones

- **Una parte mejorada:** calcula el tiempo nuevo (TEn) a partir del tiempo antiguo (TEa),
  la fracción mejorada (fm) y el speedup.
- **Parte mejorable y no mejorable:** muestra la proporción de cada parte con una barra
  y calcula fm y el speedup máximo posible.
- **Speedup:** calcula el speedup a partir de TEa y TEn.
- Cada bloque incluye una explicación del resultado.

## Fórmulas

- `TEn = TEa × [(1 − fm) + fm / speedup]`
- `Speedup = TEa / TEn`
- `Speedup máximo = 1 / (1 − fm)`

## Cómo usarlo

1. Descarga o clona este repositorio.
2. Abre `indice.html` en el navegador.
3. Ingresa los datos en el bloque que necesites y pulsa **Calcular**.

## Estructura

- `indice.html`: estructura de la página
- `style.css`: estilos
- `code.js`: lógica de los cálculos
- `logo.png`: logo de la página

## Tecnologías

HTML, CSS y JavaScript.

## Autores

Juan Camilo Duran Bohorquez 
Cesar Hernan Salas Peñaranda