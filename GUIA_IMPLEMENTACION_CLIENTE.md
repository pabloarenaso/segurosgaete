# Plan de Implementación y Migración - Seguros Gaete

Este documento detalla los pasos técnicos para desplegar el nuevo sitio web (CMS) y gestionar la coexistencia con el sitio antiguo (~70 landings) durante el periodo de transición.

## Estrategia General: "Coexistencia Híbrida"

Dado que migrar 70 páginas de una sola vez es complejo, recomendamos una estrategia donde ambos sitios funcionan simultáneamente:

1.  **Sitio Nuevo (CMS):** Se instala en el dominio principal (`www.segurosgaete.cl`) para dar la bienvenida con la nueva imagen.
2.  **Sitio Antiguo (Legacy):** Se mueve a un subdominio (ej: `antiguo.segurosgaete.cl`).
3.  **Interconexión:**
    *   El menú del **Sitio Nuevo** tendrá enlaces que llevan al **Sitio Antiguo** para los seguros que aún no se migran.
    *   El logo/header del **Sitio Antiguo** debe tener un enlace de vuelta al **Sitio Nuevo**.

---

## Fase 1: Preparación del Sitio Antiguo

Antes de activar el nuevo sitio, debemos asegurarnos de que el antiguo siga accesible.

1.  **Configurar Subdominio:**
    *   En su panel de hosting/DNS, cree un subdominio (ej: `antiguo.segurosgaete.cl`) que apunte a la carpeta o servidor donde está el sitio actual.
2.  **Actualizar Enlaces de Retorno:**
    *   Edite la cabecera (Header) del sitio antiguo.
    *   Cambie el enlace del Logo "Seguros Gaete" para que apunte a `https://www.segurosgaete.cl` (el dominio principal donde estará el sitio nuevo).
    *   *Objetivo:* Si un usuario está navegando una landing antigua y hace clic en "Inicio", debe volver a la experiencia nueva.

---

## Fase 2: Despliegue del Nuevo Sitio (CMS)

El nuevo sistema utiliza **Docker**, lo que garantiza que funcione igual en cualquier servidor.

### Requisitos del Servidor
*   Acceso SSH.
*   **Docker** y **Docker Compose** instalados.

### Pasos de Instalación

1.  **Copiar los Archivos:**
    Suba la carpeta del proyecto `segurosgaete` a su servidor (o clone el repositorio si usa Git).

2.  **Configurar Variables de Entorno (.env):**
    Dentro de la carpeta `segurosgaete`, asegúrese de tener los archivos `.env` configurados.
    *   Asegúrese de cambiar `ADMIN_TOKEN` en `docker-compose.yml` o `.env` por una contraseña segura.

3.  **Iniciar la Aplicación:**
    Ejecute el siguiente comando en la terminal dentro de la carpeta del proyecto:
    ```bash
    docker compose up -d --build
    ```
    *   Esto descargará las dependencias y levantará el sitio en el puerto `8080`.
    *   *Nota:* Para salir a producción en el puerto 80, edite `docker-compose.yml` y cambie `"8080:80"` por `"80:80"`.

---

## Fase 3: Configuración del Menú (Híbrido)

El menú del nuevo sitio es dinámico y editable. Para que apunte a las landings del sitio antiguo, usted tiene dos opciones:

### Opción A: Edición Manual (Recomendada para carga inicial masiva)
Los datos del menú se guardan en un archivo JSON en su servidor: `segurosgaete/public/data/menu-config.json`.

1.  Abra este archivo con un editor de texto o vía terminal.
2.  Agregue los enlaces a las páginas antiguas usando la URL del subdominio.

**Ejemplo de `menu-config.json`:**
```json
{
  "items": [
    { 
      "label": "Inicio", 
      "href": "/" 
    },
    {
      "label": "Seguros",
      "href": "#",
      "items": [
        {
          "label": "Seguro de Edificio (Nuevo)",
          "href": "/seguros/edificio" 
        },
        {
          "label": "Incendio Hogar (Antiguo)",
          "href": "https://antiguo.segurosgaete.cl/seguros/incendio-hogar"
        },
        {
          "label": "Responsabilidad Civil (Antiguo)",
          "href": "https://antiguo.segurosgaete.cl/seguros/rc"
        }
      ]
    }
  ]
}
```
*Al guardar el archivo, el menú se actualizará automáticamente en el sitio web.*

### Opción B: Edición desde el Código
Si prefiere entregar el código ya listo, puede editar `public/data/menu-config.json` en su computadora **antes** de subir el proyecto al servidor.

---

## Fase 4: Migración Progresiva

Una vez que el sistema esté corriendo en modo híbrido, puede migrar las landings antiguas al nuevo CMS una por una sin apuro.

**Flujo de trabajo sugerido:**

1.  **Crear Nueva Landing:** Entre al Panel de Administración (`/login`) y cree una nueva landing (ej: "Seguro Incendio").
2.  **Copiar Contenido:** Copie los textos e imágenes del sitio antiguo al editor visual del nuevo CMS.
3.  **Publicar:** Guarde la landing (ej: slug `/seguros/incendio`).
4.  **Actualizar Menú:**
    *   El CMS intentará agregar la página al menú automáticamente.
    *   Si prefiere control manual, edite el archivo `menu-config.json` y cambie el enlace antiguo (`https://antiguo...`) por el nuevo slug (`/seguros/incendio`).

De esta forma, pasará gradualmente de tener 70 enlaces externos a 70 páginas internas gestionables, mejorando el SEO y la velocidad con cada paso.
