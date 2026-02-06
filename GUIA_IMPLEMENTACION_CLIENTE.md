# Plan de Implementación y Migración - Seguros Gaete

**Objetivo:** Desplegar el nuevo ecosistema digital (CMS) manteniendo la operatividad de las ~70 landings existentes mediante una estrategia de coexistencia segura.

## Estrategia General: "Coexistencia Híbrida"

> [!IMPORTANT]
> **No es necesario migrar todo hoy.** Recomendamos una transición gradual donde el sitio nuevo y el antiguo funcionan en paralelo.

1.  **Sitio Nuevo (CMS):** Toma el control del dominio principal (`www.segurosgaete.cl`) para renovar la imagen de marca inmeditamente.
2.  **Sitio Antiguo (Legacy):** Se reubica en un subdominio (ej: `antiguo.segurosgaete.cl`) para preservar el acceso a los seguros históricos.
3.  **Navegación Unificada:** El usuario navegará entre ambos sistemas de forma transparente gracias a la configuración del menú que ya hemos preparado.

---

## Fase 1: Preparación del Entorno (Antes del "Switch")

Antes de activar el nuevo sitio, debemos preparar el antiguo para su nuevo rol.

### 1. Configuración de Subdominio
Solicite a su equipo de TI o proveedor de hosting lo siguiente:
*   Crear el subdominio `antiguo.segurosgaete.cl` (o similar).
*   Apuntar este subdominio a la carpeta/servidor donde reside el sitio web actual.

### 2. Cerrar el Ciclo de Navegación
Para evitar que los usuarios queden "atrapados" en el diseño antiguo:
> [!TIP]
> Edite el header del sitio antiguo para que el logo de "Seguros Gaete" apunte de vuelta a `https://www.segurosgaete.cl`. Así, el usuario siempre puede regresar a la experiencia renovada.

### 3. Redirección de Inicio (Opcional pero Recomendado)
Configure una redirección en el sitio antiguo para que si alguien entra a `antiguo.segurosgaete.cl/` (home), sea redirigido automáticamente al nuevo sitio.

---

## Fase 2: Despliegue del Nuevo CMS

El sistema está contenerizado con Docker para garantizar estabilidad e independencia.

### Requisitos del Servidor
*   Acceso SSH.
*   **Docker** y **Docker Compose** instalados.

### Pasos de Instalación

1.  **Transferencia de Archivos:**
    Suba la carpeta del proyecto entregada (`segurosgaete`) a su servidor.

2.  **Validación de Datos:**
    El equipo de desarrollo ya ha precargado la configuración del menú (`menu-config.json`) con los enlaces a sus landings históricas. No es necesaria ninguna acción manual.

3.  **Despliegue (Deploy):**
    Ejecute en la terminal del servidor:
    ```bash
    cd /ruta/a/segurosgaete
    docker compose up -d --build
    ```
    *El sitio estará operativo en cuestión de minutos.*

---

## Fase 3: Operación Continua y Migración Futura

El sistema está diseñado para que usted tome el control total.

### Gestión de Contenidos
*   **Crear:** Puede crear nuevas landings ilimitadas desde el panel de administración.
*   **Migrar:** A su propio ritmo, puede ir pasando las landings antiguas al nuevo formato copiando y pegando el contenido en nuestro editor visual.

### Actualización Automática del Menú
Al crear una nueva landing en el CMS (ej: "Seguro Incendio"), el sistema le dará la opción de agregarla al menú automáticamente.

> [!NOTE]
> Cuando migre una landing antigua, recuerde que la nueva tendrá una URL más limpia (ej: `/seguros/incendio`). El sistema priorizará esta nueva página sobre el enlace antiguo automáticamente.
