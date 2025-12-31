# Event Loop en Node.js — TEORIA

## ¿Qué es el Event Loop?
El **Event Loop** es el mecanismo central que permite a Node.js ejecutar operaciones asíncronas en un solo hilo. Vive en **libuv** (C) y coordina cuándo el thread de JavaScript (V8) debe ejecutar callbacks.

Node **no ejecuta JavaScript en paralelo**. Lo que hace es:
- Delegar IO a libuv / sistema operativo
- Encolar callbacks cuando el resultado está listo
- Ejecutarlos en un orden bien definido

Pensalo como un **scheduler cooperativo**.

---

## Fases del Event Loop (orden real)

### 1. Timers
Procesa callbacks de `setTimeout` y `setInterval` cuyo delay ya expiró.

**Detalles clave**
- El delay es un *mínimo*, no una garantía
- Se evalúa usando una estructura tipo **min-heap**
- Si el thread está ocupado, el timer se retrasa

**Ejemplo**
```js
setTimeout(() => console.log('timeout'), 0);
```
Puede ejecutarse tarde si hay trabajo pendiente.

---

### 2. Pending Callbacks
Ejecuta callbacks de operaciones async que fueron diferidas.

**Casos reales**
- Errores de sockets TCP
- Callbacks de bajo nivel que no entraron en su fase original

No es una fase que uses directamente, pero explica comportamientos raros.

---

### 3. Idle / Prepare
Fase **interna** de libuv.

**Qué pasa acá**
- Se calcula cuánto puede dormir el loop
- Se preparan handles de IO
- Se ajustan prioridades

👉 No se puede enganchar código JS.

---

### 4. Poll (el corazón)
Procesa callbacks de IO:
- fs
- net
- http
- dns

**Comportamiento**
- Si hay callbacks listos → los ejecuta
- Si no:
  - espera IO
  - o salta a Timers si hay timers venciendo

**Ejemplo típico**
```js
fs.readFile('file.txt', () => {
  console.log('IO listo');
});
```

Casi todo lo “async real” pasa por acá.

---

### 5. Check
Ejecuta callbacks de `setImmediate`.

**Características**
- Cola exclusiva
- Siempre se ejecuta después de Poll

**Comparación**
```js
setTimeout(fn, 0);   // Timers
setImmediate(fn);   // Check
```

En callbacks de IO, `setImmediate` suele ejecutarse antes.

---

### 6. Close Callbacks
Cleanup final.

**Ejemplos**
- `socket.on('close')`
- `stream.on('close')`

Libera recursos y cierra handles internos.

---

## process.nextTick()

### Qué es
Una **cola especial** fuera del Event Loop.

### Prioridad
Se ejecuta:
- Después del JS actual
- Antes de Promises
- Antes de cualquier fase del Event Loop

### Peligro real
```js
function loop() {
  process.nextTick(loop);
}
loop();
```
Bloquea el loop completamente.

### Uso correcto
- Ajustes inmediatos
- Backward compatibility
- Operaciones críticas ultra cortas

---

## Orden real de ejecución (simplificado)

1. process.nextTick
2. Promises (microtasks)
3. Timers
4. Poll (IO)
5. setImmediate
6. Close callbacks

---

## Regla mental para entrevistas
> Node no es async por magia:
> **libuv espera**, **V8 ejecuta**, **el Event Loop decide**.

