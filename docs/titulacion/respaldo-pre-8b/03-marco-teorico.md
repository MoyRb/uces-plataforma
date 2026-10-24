# Capítulo III. Marco teórico y fundamentos tecnológicos

---

## 3.1 Ingeniería de software y desarrollo de aplicaciones web

La ingeniería de software es la disciplina que aplica principios de la ingeniería al proceso de construcción, mantenimiento y evolución de sistemas de software. A diferencia de la programación entendida como actividad individual, la ingeniería de software aborda el desarrollo como un proceso sistemático que incluye análisis de requisitos, diseño, implementación, verificación y mantenimiento (Sommerville, 2016). Su propósito es producir software que satisfaga los requisitos del cliente con niveles razonables de calidad, dentro de restricciones reales de tiempo y recursos.

Uno de los conceptos centrales de la disciplina es el ciclo de vida del software, que describe las fases por las que atraviesa un sistema desde su concepción hasta su retiro. La forma en que estas fases se organizan y se relacionan entre sí define la metodología de desarrollo. Algunas metodologías plantean un recorrido lineal por etapas bien delimitadas; otras proponen ciclos iterativos en los que las versiones parciales del sistema se construyen, evalúan y refinan sucesivamente. La elección de metodología influye de manera directa en cómo se administra la incertidumbre sobre los requisitos, cómo se gestiona la retroalimentación del cliente y qué tipo de artefactos se producen en cada etapa.

El desarrollo de aplicaciones web hereda estos principios y los aplica a un contexto particular: sistemas que se ejecutan en un servidor accesible a través de la red y cuya interfaz se presenta en un navegador web. Este tipo de sistemas comparte con cualquier software de propósito general la necesidad de modelar correctamente el dominio del problema, organizar la lógica en componentes coherentes y manejar adecuadamente los estados de la información. La diferencia radica en que también deben considerar la latencia de red, la naturaleza sin estado del protocolo HTTP, la ejecución de código en entornos distintos —cliente y servidor— y los mecanismos específicos de autenticación y autorización que este modelo de despliegue impone.

En el contexto de UCES Plataforma de Talento, la ingeniería de software se concretó en un proceso de transformación: el área de Recursos Humanos tenía un conjunto de necesidades identificadas —evaluación psicométrica, evaluación de conocimientos, panel de revisión— que el Trabajo A formalizó como requisitos funcionales y casos de uso. El Trabajo B tomó esos artefactos como punto de partida para construir el sistema, validar cada funcionalidad contra los requisitos documentados y registrar las diferencias que surgieron durante la implementación. Esta separación entre análisis y desarrollo no es solo una decisión académica: refleja una práctica reconocida en proyectos de software donde distintos equipos o etapas se hacen responsables de distintas fases del ciclo de vida.

---

## 3.2 Arquitectura de aplicaciones web modernas

Una aplicación web es un sistema distribuido: parte de su lógica se ejecuta en un servidor y parte en el navegador del usuario. La comunicación entre ambos extremos ocurre a través del protocolo HTTP (Hypertext Transfer Protocol) o su variante cifrada HTTPS, que funciona bajo un modelo de solicitud y respuesta: el cliente envía una solicitud a una URL determinada y el servidor devuelve una respuesta con un código de estado y, opcionalmente, un cuerpo de datos (Fielding et al., 1999).

La arquitectura más extendida para aplicaciones web modernas sigue el patrón cliente-servidor con separación de responsabilidades. El servidor expone una interfaz de programación de aplicaciones (API) que acepta solicitudes en formatos estructurados —habitualmente JSON— y devuelve respuestas en el mismo formato. El cliente, ejecutándose en el navegador, consume esta API para obtener datos y actualizar la interfaz sin necesidad de recargar la página completa. Este modelo, conocido como aplicación de página única (SPA, por sus siglas en inglés), mejora la fluidez de la experiencia de usuario pero traslada responsabilidades de renderizado al navegador, lo que puede afectar el tiempo de carga inicial y el posicionamiento en motores de búsqueda.

Una tendencia más reciente en el desarrollo web, impulsada principalmente por Next.js y frameworks similares, combina el renderizado del lado del servidor (SSR) con el del lado del cliente (CSR) en función de las características de cada vista. Las páginas o componentes que requieren datos que no cambian con frecuencia o que deben estar disponibles para motores de búsqueda pueden generarse en el servidor antes de enviarse al navegador. Las partes interactivas de la interfaz —formularios, actualizaciones en tiempo real, componentes que dependen de la sesión del usuario— se ejecutan como código cliente. Este modelo híbrido busca equilibrar el rendimiento percibido por el usuario, los tiempos de carga y la complejidad de la lógica del sistema.

La seguridad en aplicaciones web modernas opera en capas superpuestas. Las conexiones se cifran mediante TLS para proteger los datos en tránsito. La autenticación verifica la identidad de quien hace la solicitud. La autorización determina si esa identidad tiene permiso para realizar la operación solicitada. Las restricciones a los datos se aplican tanto en la capa de API como en la capa de base de datos para evitar que una vulnerabilidad en un punto exponga información de toda la aplicación. Esta arquitectura de seguridad en profundidad es la que se empleó en UCES Plataforma de Talento, como se describirá en detalle en el Capítulo V.

---

## 3.3 Next.js, React y TypeScript

### 3.3.1 React y el modelo de componentes

React es una biblioteca de JavaScript para construir interfaces de usuario mediante componentes (Meta Open Source, 2024a). Un componente es una unidad de interfaz autocontenida: encapsula su estructura visual, su estado interno y su lógica de presentación en una función o clase que recibe propiedades externas (*props*) y devuelve una descripción de la interfaz. Esta descripción se escribe en JSX, una extensión de la sintaxis de JavaScript que permite expresar estructuras similares a HTML dentro del código.

El modelo reactivo de React significa que el componente vuelve a renderizarse automáticamente cuando cambian sus propiedades o su estado. Esta característica simplifica la gestión de interfaces que deben actualizarse en respuesta a acciones del usuario o a datos recibidos de un servidor, sin necesidad de manipular el DOM directamente. React 19, la versión utilizada en UCES Plataforma de Talento, incorporó mejoras en la gestión de formularios y en el manejo de acciones asíncronas, reduciendo el código repetitivo en operaciones comunes como enviar formularios y mostrar estados de carga (Meta Open Source, 2024b).

### 3.3.2 Next.js y el App Router

Next.js es un framework para React que añade al modelo de componentes capacidades de renderizado del lado del servidor, generación estática, enrutamiento basado en el sistema de archivos y manejo de solicitudes HTTP mediante Route Handlers (Vercel, 2024a). En su arquitectura App Router, introducida en la versión 13 y consolidada en versiones posteriores, los archivos bajo el directorio `app/` definen tanto las rutas de la aplicación como el tipo de renderizado que aplica a cada una.

El App Router distingue dos tipos de componentes según dónde se ejecutan. Los **Server Components** son el tipo predeterminado: se ejecutan únicamente en el servidor, pueden acceder directamente a bases de datos o servicios sin exponer credenciales al cliente, y sus datos se serializan y se envían al navegador como HTML. Los **Client Components**, marcados con la directiva `"use client"` al inicio del archivo, se envían al navegador y pueden usar los *hooks* de React —como `useState` o `useEffect`— para gestionar estado local e interacciones del usuario. Esta distinción permite que las vistas con datos sensibles o que requieren consultas a la base de datos se procesen en el servidor, mientras que las partes interactivas se hidratan en el cliente.

En UCES Plataforma de Talento, los Route Handlers —archivos `route.ts` ubicados dentro de `app/api/`— actúan como los endpoints de la API. Cada archivo exporta funciones con los nombres de los métodos HTTP que maneja (`GET`, `POST`, `PATCH`, `DELETE`). Estas funciones reciben un objeto `Request` estándar de la Web API y devuelven un objeto `Response` o una respuesta estructurada mediante el helper `NextResponse` de Next.js. Este modelo sigue la especificación estándar de la plataforma web, lo que lo hace compatible con los mecanismos de seguridad y validación que aplican a cualquier API HTTP.

### 3.3.3 TypeScript y el tipado estático

TypeScript es un superconjunto tipado de JavaScript desarrollado por Microsoft (Microsoft, 2024). Añade al lenguaje un sistema de tipos estáticos que permite declarar la forma de los objetos, los parámetros de las funciones y los valores de retorno, y que el compilador verifica antes de ejecutar el código. Los tipos no existen en tiempo de ejecución —TypeScript se transpila a JavaScript puro— pero su verificación en tiempo de compilación elimina una categoría amplia de errores que de otro modo solo aparecerían durante la ejecución.

En un proyecto full-stack donde el mismo lenguaje se usa para la lógica del cliente, los Route Handlers y la definición de estructuras de datos, TypeScript facilita la coherencia entre las distintas capas. Cuando el código de un Route Handler especifica que devuelve un objeto con campos `theoryScore: number` y `summary: PsicometricoSummary`, el componente de React que consume esa respuesta puede declarar que espera exactamente esa forma. Si en algún momento el Route Handler cambia sin actualizar el tipo, el compilador señala la discrepancia antes de que el error llegue al usuario.

En UCES Plataforma de Talento, TypeScript se usó en toda la aplicación, incluyendo las rutas de API, las funciones de biblioteca (`lib/`) y los componentes de interfaz. El tipo `PsicometricoSummary` definido en `lib/psicometricoResults.ts` es un ejemplo de cómo TypeScript documenta las estructuras de datos del sistema: especifica los cinco rasgos del instrumento psicométrico, los campos de cada resultado de rasgo y los totales de respuestas, de forma que cualquier consumidor de esa función conoce exactamente qué puede esperar.

---

## 3.4 Supabase y PostgreSQL

### 3.4.1 Backend como Servicio

Un Backend como Servicio (BaaS) es un modelo de plataforma que proporciona infraestructura de servidor —base de datos, autenticación, almacenamiento, en ocasiones funciones computacionales— como un servicio administrado accesible a través de APIs (Supabase, 2024a). A diferencia de construir y administrar un servidor propio, un BaaS traslada responsabilidades operativas como la configuración del sistema operativo, la administración de la base de datos, los respaldos automáticos y la disponibilidad del servicio al proveedor. El desarrollador interactúa con la plataforma a través de SDKs y APIs documentadas.

Supabase es un BaaS de código abierto construido sobre PostgreSQL (Supabase, 2024a). Provee una instancia administrada del gestor de base de datos, un sistema de autenticación basado en JWT, un servicio de almacenamiento de objetos compatible con la API de Amazon S3, y un motor de funciones de borde (*Edge Functions*). La capa de API que expone Supabase hacia los clientes es generada automáticamente a partir del esquema de la base de datos mediante PostgREST, una herramienta que transforma las tablas y vistas de PostgreSQL en endpoints REST (Supabase, 2024b).

En UCES Plataforma de Talento, Supabase cumple tres funciones diferenciadas: gestionar la autenticación de usuarios, persistir todos los datos de la aplicación en PostgreSQL y almacenar los archivos de evidencia cargados por los candidatos. El SDK `@supabase/supabase-js` proporciona el cliente que el código de la aplicación usa para interactuar con estas tres capas desde el entorno del navegador y desde los Route Handlers del servidor.

### 3.4.2 PostgreSQL como sistema gestor de bases de datos relacionales

PostgreSQL es un sistema gestor de bases de datos objeto-relacional de código abierto con más de 35 años de desarrollo activo (The PostgreSQL Global Development Group, 2024). Implementa el estándar SQL con extensiones propias y es conocido por su robustez, su soporte de tipos de datos avanzados —incluyendo JSON, arrays y tipos geométricos— y su mecanismo de extensibilidad que permite añadir funciones, operadores y tipos de datos definidos por el usuario.

El modelo relacional organiza los datos en tablas compuestas por filas y columnas. Cada tabla representa una entidad del dominio; las relaciones entre entidades se expresan mediante claves foráneas (*foreign keys*) que garantizan la integridad referencial: no puede existir un registro hijo sin su registro padre correspondiente. Esta propiedad es fundamental en sistemas donde los datos están interconectados de forma compleja. En UCES Plataforma de Talento, la tabla `attempts` tiene una clave foránea hacia `applications`, que a su vez apunta a `profiles` y `vacancies`. Esta cadena de referencias garantiza que un intento de evaluación no puede existir sin una postulación válida, y que una postulación no puede existir sin un usuario y una vacante registrados.

El esquema de la aplicación, definido en `supabase/schema.sql`, declara 13 tablas con sus relaciones, tipos de datos y restricciones. La tabla `attempts`, por ejemplo, incluye columnas `started_at` y `deadline_at` de tipo `timestamptz` para registrar los tiempos con zona horaria, un campo `theory_score` de tipo `numeric` para el resultado calculado, y una columna `psychometric_summary` de tipo `jsonb` para almacenar el resumen estructurado del instrumento psicométrico. El tipo JSONB de PostgreSQL almacena datos JSON en formato binario, permitiendo realizar consultas sobre sus campos, indexarlos y utilizarlos en condiciones de filtrado, con mejor rendimiento que el tipo JSON textual equivalente.

### 3.4.3 Supabase Auth

Supabase Auth es el servicio de autenticación de la plataforma (Supabase, 2024c). Gestiona el registro de usuarios, la verificación de credenciales, la emisión de tokens JWT y su renovación automática. El servicio mantiene su propia tabla interna `auth.users`, separada de las tablas de la aplicación, y provee funciones de base de datos —como `auth.uid()`— que pueden invocarse desde las políticas de seguridad para identificar al usuario autenticado en el contexto de una consulta SQL.

Cuando un usuario se autentica con correo y contraseña, Supabase Auth verifica las credenciales, genera un par de tokens —un token de acceso de corta duración y un token de renovación (*refresh token*)— y los entrega al cliente. El token de acceso es un JWT firmado con la clave secreta del proyecto que incluye, entre otros datos, el identificador del usuario (`sub`), el momento de expiración y el rol configurado en Supabase. El cliente adjunta este token en el encabezado `Authorization` de las solicitudes subsecuentes para que el servidor pueda verificar la identidad sin consultar la base de datos en cada petición.

En UCES Plataforma de Talento, el cliente de navegador se instancia en `lib/supabaseClient.ts` con la clave anónima pública (`NEXT_PUBLIC_SUPABASE_ANON_KEY`), que permite operaciones de lectura sujetas a las políticas de RLS y la autenticación estándar. El cliente de servidor, instanciado en `lib/supabaseServer.ts` con la clave de rol de servicio (`SUPABASE_SERVICE_ROLE_KEY`), omite las políticas de RLS y se usa exclusivamente en los Route Handlers donde la lógica de negocio requiere acceso administrativo. Esta separación evita que la clave de servicio —que otorga acceso irrestricto a la base de datos— sea expuesta al navegador.

### 3.4.4 Supabase Storage

Supabase Storage es el servicio de almacenamiento de objetos de la plataforma (Supabase, 2024d). Los archivos se organizan en *buckets*, contenedores lógicos análogos a directorios de alto nivel. Cada bucket puede configurarse como público —sus URLs son accesibles sin autenticación— o privado —el acceso requiere autenticación y se sujeta a políticas de seguridad.

En UCES Plataforma de Talento, los archivos de evidencia —currículos, diplomas u otros documentos que los candidatos cargan durante la evaluación— se almacenan en el bucket `evidences`, configurado como privado. Para que un usuario o un administrador pueda acceder a un archivo, el sistema genera una URL firmada (*signed URL*) con tiempo de expiración mediante la API de Supabase Storage. Este mecanismo garantiza que los archivos no sean accesibles mediante URLs directas predecibles y que solo las partes autorizadas puedan obtener acceso temporal a ellos.

### 3.4.5 Row Level Security

Row Level Security (RLS) es una funcionalidad de PostgreSQL que permite definir políticas de acceso a nivel de fila dentro de una tabla (The PostgreSQL Global Development Group, 2024). Cuando RLS está habilitado en una tabla, cada operación de lectura, escritura o eliminación sobre esa tabla es evaluada contra las políticas definidas antes de ejecutarse. Una política especifica, para cada tipo de operación y rol de base de datos, una condición booleana que debe satisfacerse para que la operación sea permitida.

La ventaja de RLS frente a la validación exclusiva en la capa de aplicación es que las restricciones de acceso residen en la base de datos misma, no en el código que la consulta. Esto significa que si un fallo en la lógica de la aplicación omitiera una verificación de autorización, las políticas de RLS actuarían como segunda barrera de protección. Es el principio de defensa en profundidad aplicado al modelo de datos.

En UCES Plataforma de Talento, RLS está habilitado en todas las tablas de la aplicación. El archivo `supabase/rls.sql` define las políticas. Por ejemplo, la política `users-manage-own-attempts` sobre la tabla `attempts` utiliza una subconsulta que verifica si el `user_id` de la aplicación asociada al intento coincide con `auth.uid()`, la función que devuelve el identificador del usuario autenticado en el contexto de la sesión de base de datos. Esto garantiza que un usuario solo pueda leer o modificar los intentos que le pertenecen, independientemente de cómo se construya la consulta desde el código de la aplicación.

La función `get_my_role()`, definida también en `supabase/rls.sql`, es una función almacenada con la cláusula `SECURITY DEFINER`. Esto significa que se ejecuta con los permisos del usuario que la definió —en este caso, el rol administrador de la base de datos— en lugar de con los permisos del usuario que la invoca. Esta propiedad es necesaria porque la función necesita acceder a la tabla `user_roles` para determinar el rol del usuario actual, y esa misma tabla tiene una política de RLS que podría generar una recursión si la función se ejecutara en el contexto de seguridad del usuario. Al usar `SECURITY DEFINER`, la función puede consultar `user_roles` directamente sin activar sus propias políticas, y devolver únicamente el rol del usuario autenticado, sin exponer información de otros usuarios.

---

## 3.5 Autenticación y autorización

La autenticación y la autorización son dos conceptos de seguridad relacionados pero distintos (OWASP Foundation, 2021). La **autenticación** responde a la pregunta "¿quién eres?": es el proceso mediante el cual un sistema verifica la identidad de quien solicita acceso. La **autorización** responde a "¿qué puedes hacer?": una vez que la identidad ha sido establecida, determina qué operaciones tiene permitido realizar esa identidad.

En sistemas web, la autenticación tradicional se basa en credenciales —combinación de nombre de usuario y contraseña— que el usuario presenta al servidor. Si las credenciales son válidas, el servidor emite algún tipo de prueba de identidad que el cliente puede presentar en solicitudes posteriores sin necesidad de repetir las credenciales en cada una. Esta prueba puede tomar la forma de una cookie de sesión almacenada en el servidor, o de un token que el cliente conserva y adjunta en cada solicitud.

### 3.5.1 JSON Web Tokens

Un JSON Web Token (JWT) es un estándar abierto (RFC 7519) para representar afirmaciones (*claims*) de forma segura entre dos partes (Jones, Bradley & Sakimura, 2015). Un JWT está compuesto por tres segmentos codificados en Base64URL y separados por puntos: el encabezado, que especifica el algoritmo de firma; la carga útil (*payload*), que contiene las afirmaciones; y la firma, que garantiza la integridad del token.

Las afirmaciones son pares clave-valor. Algunas están estandarizadas: `sub` identifica al sujeto del token, `exp` indica el momento de expiración, `iat` registra el momento de emisión. Otras son específicas de la aplicación. La firma se produce aplicando el algoritmo especificado en el encabezado sobre la concatenación del encabezado codificado y la carga útil codificada, usando una clave secreta. Quien recibe el token puede verificar que no fue modificado recalculando la firma con la misma clave y comparando el resultado.

La propiedad clave de un JWT es que es **autocontenido**: el servidor puede verificar la identidad y las afirmaciones del portador sin consultar una base de datos, únicamente verificando la firma criptográfica. Esto lo hace eficiente para sistemas distribuidos y APIs sin estado. La contrapartida es que un JWT válido no puede revocarse antes de su expiración sin mecanismos adicionales —como listas de revocación o validación contra la base de datos—, por lo que los tiempos de expiración cortos (típicamente 1 hora) son una práctica de seguridad recomendada.

En UCES Plataforma de Talento, Supabase Auth emite JWTs al autenticar a un usuario. Los Route Handlers de administración reciben este token en el encabezado `Authorization` y lo verifican mediante la función `requireAdmin()` en `app/api/admin/utils.ts`. Esta función extrae el token del encabezado, llama a `supabase.auth.getUser(token)` para verificar su validez contra la clave del proyecto, y posteriormente invoca el RPC `get_my_role()` —usando un cliente instanciado con las credenciales del usuario, no las del servidor— para confirmar que el rol devuelto por la base de datos es `admin`. Este diseño aplica verificación tanto a nivel del token como a nivel de datos de rol.

### 3.5.2 Control de acceso basado en roles

El control de acceso basado en roles (RBAC, *Role-Based Access Control*) es un modelo de autorización en el que los permisos se asignan a roles, y los roles se asignan a usuarios (Ferraiolo & Kuhn, 1992). En lugar de definir individualmente qué puede hacer cada usuario, el administrador define las capacidades de cada rol y asigna a cada usuario el rol correspondiente a sus funciones. Cuando los permisos de un rol cambian, el cambio se propaga automáticamente a todos los usuarios que lo tienen asignado.

En UCES Plataforma de Talento, el modelo de roles es sencillo: existen dos roles relevantes en la lógica de la aplicación, `user` (candidato) y `admin` (administrador). La tabla `user_roles` almacena la asignación de un rol a cada usuario identificado por su UUID. La función `get_my_role()` implementa una lógica de resolución con dos niveles: primero consulta `user_roles` y, si no encuentra una entrada, cae hacia la columna `role` de la tabla `profiles`. Este mecanismo de respaldo garantiza que el sistema funcione incluso si la entrada en `user_roles` no se insertó correctamente, devolviendo el rol `user` como valor predeterminado en ausencia de información.

La función `resolveRole()` en `lib/auth.ts` aplica una validación adicional sobre el valor devuelto: acepta únicamente las cadenas `"admin"` o `"user"` como roles válidos y retorna `"user"` ante cualquier otro valor. Esto previene que valores inesperados en la base de datos sean aceptados como roles con permisos elevados.

---

## 3.6 Protección de identificadores personales mediante HMAC

La Clave Única de Registro de Población (CURP) es un identificador alfanumérico de 18 caracteres asignado a cada persona en México por el Registro Nacional de Población (SEGOB, 2024). Contiene información derivada del nombre completo, fecha de nacimiento, sexo y entidad federativa de nacimiento. Por su naturaleza, la CURP es un dato personal que, si se expone o se asocia indebidamente con otro dato, puede usarse para identificar a una persona de forma inequívoca.

La Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su reglamento establecen que los datos personales deben protegerse mediante medidas técnicas adecuadas al riesgo que representa su exposición (Congreso de la Unión, 2010). Una de las medidas técnicas reconocidas es el uso de funciones criptográficas para transformar los datos de forma que no puedan ser recuperados por terceros no autorizados.

### 3.6.1 Funciones hash criptográficas y HMAC

Una función hash criptográfica es una función matemática que transforma una entrada de longitud arbitraria en una salida de longitud fija —el *digest* o resumen— con las siguientes propiedades: determinismo (la misma entrada siempre produce la misma salida), irreversibilidad práctica (no es computacionalmente factible recuperar la entrada a partir de la salida), y resistencia a colisiones (es computacionalmente difícil encontrar dos entradas distintas que produzcan la misma salida) (Menezes, van Oorschot & Vanstone, 1997).

SHA-256 es un algoritmo de hash perteneciente a la familia SHA-2 (Secure Hash Algorithm 2), diseñado por la Agencia de Seguridad Nacional de los Estados Unidos y estandarizado por el NIST (National Institute of Standards and Technology, 2015). Produce resúmenes de 256 bits (32 bytes), habitualmente representados como 64 caracteres hexadecimales. Es ampliamente usado en sistemas de seguridad, certificados digitales y protocolos de comunicación.

HMAC (*Hash-based Message Authentication Code*) es un mecanismo estándar (RFC 2104) para construir un código de autenticación de mensajes basado en una función hash (Krawczyk, Bellare & Canetti, 1997). A diferencia de aplicar la función hash directamente sobre el mensaje, HMAC incorpora una clave secreta en el cálculo. La operación puede describirse conceptualmente como: `HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))`, donde `H` es la función hash subyacente, `K` es la clave, `m` es el mensaje, y `opad` e `ipad` son constantes definidas en el estándar.

La diferencia fundamental entre un hash convencional y HMAC es que el primero produce siempre el mismo resultado para la misma entrada, independientemente de quién lo calcule. Esto hace al hash simple vulnerable a ataques de diccionario o de tabla arcoíris: un atacante que obtenga la base de datos puede precalcular los hashes de todas las CURP posibles y compararlos con los valores almacenados. HMAC resuelve este problema porque el resultado depende tanto de la entrada como de una clave secreta. Sin conocer la clave, no es posible reproducir el cálculo, lo que invalida los ataques de diccionario estándar.

### 3.6.2 Implementación en UCES Plataforma de Talento

En `lib/curp.ts`, la función `hashCurpHmac` implementa este mecanismo usando el módulo `crypto` de Node.js: recibe la clave secreta y la CURP, normaliza la CURP a mayúsculas sin espacios, y produce el resumen hexadecimal del HMAC-SHA256. La clave secreta se lee de la variable de entorno `CURP_HASH_SECRET`, que no se expone al navegador.

Este mecanismo permite detectar registros duplicados —si dos intentos de registro presentan la misma CURP, producirán el mismo hash, y la restricción de unicidad sobre la columna `curp_hash` en la tabla `curp_hashes` rechazará el segundo— sin almacenar en ningún momento la CURP en texto claro. El único valor que persiste en la base de datos es el hash, que por las propiedades de HMAC no permite recuperar la CURP original ni ser utilizado por un tercero que no posea la clave secreta.

Es importante distinguir este mecanismo de la **criptografía simétrica** (como AES), que sí permite recuperar el valor original a partir del texto cifrado y una clave. HMAC es una transformación unidireccional; una vez calculado el hash, no existe operación de descifrado. Esta propiedad es la adecuada para el caso de uso de UCES: el sistema no necesita conocer la CURP original una vez completado el registro, solo necesita detectar si una CURP ya fue usada, lo que puede determinarse comparando hashes.

---

## 3.7 Evaluaciones digitales y control de tiempo

Las evaluaciones digitales de conocimientos son instrumentos que presentan al candidato una serie de reactivos —preguntas de opción múltiple, verdadero/falso, respuesta abierta— y registran sus respuestas en un sistema centralizado (Clariana & Wallace, 2002). Frente a las evaluaciones en papel, ofrecen ventajas de automatización: la corrección puede ejecutarse en el momento del envío, los resultados quedan disponibles inmediatamente y la información puede centralizarse y compararse entre candidatos sin procesamiento manual.

Un elemento crítico en muchas evaluaciones digitales es el control del tiempo disponible. Los temporizadores sirven para simular condiciones de presión reales, limitar la ventaja de quienes disponen de más tiempo para investigar respuestas, o garantizar que todas las evaluaciones se completen dentro de un periodo comparable. El diseño del control de tiempo en un sistema web requiere resolver una tensión inherente: la representación visual del tiempo transcurrido debe estar en el cliente —para actualizarse en tiempo real sin solicitudes constantes al servidor— pero la verificación de que el tiempo no ha expirado debe ocurrir en el servidor, ya que el cliente puede ser manipulado.

### 3.7.1 Modelo de control de tiempo en UCES Plataforma de Talento

En el sistema, cuando se crea un intento de evaluación, el servidor registra en la tabla `attempts` los campos `started_at` (momento de inicio) y `deadline_at` (fecha y hora límite), calculada como `started_at + duration_minutes`. El cliente calcula la diferencia entre `deadline_at` y la hora actual para mostrar el temporizador visual. Cuando el candidato envía la evaluación —o cuando el temporizador visual llega a cero y activa el envío automático— el Route Handler en `app/api/attempts/[attemptId]/submit/route.ts` verifica si `Date.now() > new Date(attempt.deadline_at).getTime()`. Si el tiempo ha expirado, el intento es igualmente procesado pero el campo `timedOutBeforeSubmit` en la respuesta y en el resumen almacenado refleja que el envío ocurrió fuera de tiempo.

Este diseño garantiza que la información sobre cumplimiento del tiempo provenga del servidor, que opera en un entorno controlado, y no de la representación visual en el navegador, que puede ser alterada por el usuario. El administrador que revisa el intento puede verificar los campos de tiempo para determinar si la evaluación se completó dentro del período establecido.

### 3.7.2 Persistencia de intentos y unicidad

El sistema implementa la restricción de un único intento por evaluación mediante el estado del registro en la tabla `attempts`. El guard de la ruta `/evaluacion/[attemptId]` verifica el campo `submitted_at`: si ya tiene un valor —lo que indica que el intento fue enviado—, redirige al candidato a la página de resultados en lugar de permitirle continuar. Esta verificación ocurre en el servidor durante la carga de la ruta, antes de que se presente la interfaz de la evaluación.

La respuesta del Route Handler de envío también verifica este estado antes de procesarlo: si `attempt.submitted_at` ya tiene un valor, devuelve un error 400 indicando que el intento ya fue enviado. Esto previene la condición de carrera en la que el candidato podría enviar el formulario dos veces de forma rápida antes de que el estado del primer envío se refleje en el cliente.

---

## 3.8 Modelo Big Five y evaluación psicométrica

La psicometría es la disciplina que estudia la medición de atributos psicológicos —aptitudes, rasgos de personalidad, actitudes— mediante instrumentos estandarizados (Muñiz, 2010). Los instrumentos psicométricos son cuestionarios o pruebas diseñados para cuantificar estos atributos de forma sistemática y reproducible. En contextos de selección de personal, se usan para obtener información sobre características de los candidatos que no son directamente observables a partir del currículum vitae o durante una entrevista breve.

### 3.8.1 El modelo de los Cinco Grandes factores

El modelo de los Cinco Grandes factores de personalidad (*Big Five*) es uno de los marcos teóricos más respaldados empíricamente en la psicología de la personalidad (McCrae & Costa, 1992). Propone que la personalidad puede describirse de forma comprensiva a través de cinco dimensiones ortogonales —es decir, estadísticamente independientes entre sí— que emergen de forma consistente en estudios de análisis factorial sobre diferentes poblaciones, idiomas e instrumentos de medición:

- **Apertura a la experiencia** (*Openness to experience*): tendencia hacia la curiosidad intelectual, la receptividad a ideas nuevas, la creatividad y la flexibilidad de pensamiento.
- **Responsabilidad** (*Conscientiousness*): disposición hacia la organización, la autodisciplina, la confiabilidad y la orientación al cumplimiento de metas.
- **Extroversión** (*Extraversion*): tendencia a la sociabilidad, la asertividad, el entusiasmo y la búsqueda de estimulación social.
- **Amabilidad** (*Agreeableness*): inclinación hacia la cooperación, la empatía, la confianza en los demás y el comportamiento prosocial.
- **Estabilidad emocional** (*Neuroticism*, medido inversamente): grado en que la persona experimenta con menor frecuencia emociones negativas como ansiedad, irritabilidad y vulnerabilidad al estrés.

El modelo ha sido validado en estudios transculturales y ha demostrado relaciones estadísticamente significativas con resultados relevantes en contextos laborales, como el desempeño en el trabajo, la satisfacción laboral y la permanencia en la organización (Barrick & Mount, 1991). Esta consistencia empírica lo ha convertido en el marco de referencia dominante para el diseño de instrumentos de selección de personal basados en personalidad.

### 3.8.2 Escalas tipo Likert

Las escalas Likert son un método de medición actitudinal en el que el respondiente expresa su grado de acuerdo o desacuerdo con una afirmación sobre una escala ordenada de opciones (Likert, 1932). La escala de cinco puntos es la más común: generalmente los extremos corresponden a "Totalmente en desacuerdo" y "Totalmente de acuerdo", y los puntos intermedios representan posiciones graduales entre ambos extremos. Los ítems se suman —o se promedian— para obtener una puntuación que representa la posición del respondiente en la dimensión medida.

La interpretación de puntuaciones en escalas Likert requiere cautela. Las puntuaciones obtenidas son ordinales —los intervalos entre puntos no son necesariamente iguales en términos psicológicos— aunque en la práctica se tratan frecuentemente como intervalares para facilitar el cálculo estadístico. La validez y confiabilidad del instrumento deben establecerse mediante estudios específicos que evalúen si el instrumento mide consistentemente lo que pretende medir (Muñiz, 2010).

### 3.8.3 Implementación en UCES Plataforma de Talento

El instrumento psicométrico utilizado en el sistema consta de 20 ítems de escala Likert con valores del 1 al 5, organizados en cinco rasgos con cuatro ítems cada uno. Esta estructura es consistente con versiones reducidas del Big Five, como el Mini-IPIP de 20 ítems desarrollado por Donnellan et al. (2006), aunque el instrumento específico utilizado fue proporcionado por personal del área de Recursos Humanos de UCES y su ficha de validación no está disponible en el expediente técnico del proyecto.

La lógica de cálculo, implementada en `lib/psicometricoResults.ts`, suma las respuestas Likert de los cuatro ítems de cada rasgo para obtener una puntuación por rasgo en el rango de 4 a 20. Los umbrales de clasificación aplicados —puntuación ≥ 16 como "Alta", entre 11 y 15 como "Adecuada" o "Funcional", y menor a 11 como indicador de riesgo— son criterios institucionales informados por el desarrollador durante el proceso de especificación del sistema y no corresponden a puntos de corte derivados de estudios de estandarización publicados.

La extroversión tiene un tratamiento diferenciado en la implementación: su puntuación se calcula pero su clasificación se etiqueta como "No es filtro de contratación, solo indicador de integración". Esta distinción refleja una decisión de diseño del sistema que reconoce la complejidad de usar la extroversión como criterio de selección, dado que su pertinencia varía considerablemente según el tipo de puesto.

Los resultados del instrumento se almacenan como objeto JSONB en el campo `psychometric_summary` de la tabla `attempts`, preservando tanto las puntuaciones por rasgo como el número de preguntas respondidas y metadatos del envío. Esto permite al administrador consultar el perfil completo del candidato sin necesidad de reconstruirlo a partir de las respuestas individuales.

---

## 3.9 Diseño de interfaces y experiencia de usuario

La experiencia de usuario (UX) es la disciplina que estudia y diseña la forma en que las personas interactúan con un sistema, con el objetivo de que esa interacción sea eficiente, comprensible y satisfactoria (Nielsen & Norman Group, 2024). En el contexto de aplicaciones web, la UX abarca desde la organización de la información y la coherencia visual hasta la retroalimentación que el sistema ofrece ante las acciones del usuario y la prevención de errores.

Algunos principios de usabilidad relevantes para sistemas de evaluación como el de UCES son:

- **Visibilidad del estado del sistema**: el usuario debe saber en todo momento en qué parte del proceso se encuentra, qué ha completado y qué falta. En el sistema, el temporizador visible y los indicadores de sección del cuestionario cumplen esta función.
- **Prevención de errores**: es preferible diseñar para que los errores sean difíciles de cometer, antes que depender en la detección y recuperación. La validación de la CURP en el registro —que verifica el formato antes de enviar la solicitud— es un ejemplo de esta estrategia.
- **Consistencia y estándares**: los usuarios no deben cuestionarse si palabras, situaciones o acciones diferentes significan lo mismo. El uso de una biblioteca de componentes como shadcn/ui garantiza que los elementos interactivos —botones, campos de formulario, modales— se comporten y presenten de manera coherente en toda la aplicación.
- **Retroalimentación**: las acciones del usuario deben tener respuesta visible. Los estados de carga, los mensajes de error descriptivos y las confirmaciones de operaciones exitosas informan al usuario que el sistema recibió su acción y está procesándola.

### 3.9.1 Tailwind CSS y shadcn/ui

Tailwind CSS es un framework de estilos que provee clases utilitarias de bajo nivel —`flex`, `p-4`, `text-sm`, `rounded-lg`— que se aplican directamente sobre los elementos HTML para construir la apariencia de la interfaz sin escribir CSS personalizado para cada componente (Tailwind Labs, 2024). A diferencia de frameworks como Bootstrap, que proveen componentes prediseñados con una apariencia fija, Tailwind provee las herramientas para construir cualquier diseño sin imponer una estética particular.

shadcn/ui es una colección de componentes de interfaz construidos sobre Radix UI, una biblioteca de primitivos de accesibilidad sin estilo para React (shadcn, 2024). Los componentes de shadcn/ui son accesibles por diseño —implementan los patrones de interacción y los atributos ARIA definidos por WAI-ARIA— y se estilizan con Tailwind CSS. Una característica distintiva de shadcn/ui es que los componentes no se instalan como dependencia de paquete: se copian al código fuente del proyecto, lo que permite modificarlos directamente sin depender de una versión específica de la biblioteca.

En UCES Plataforma de Talento, la combinación de Tailwind CSS y shadcn/ui permitió construir una interfaz coherente y funcional con tiempos de desarrollo razonables, aprovechando componentes base accesibles para formularios, tablas, botones y diálogos que se integran con el sistema de estilos global.

---

## 3.10 Despliegue de aplicaciones web en la nube

El despliegue (*deployment*) es el proceso de trasladar una aplicación desde el entorno de desarrollo del programador hacia un entorno accesible para los usuarios finales. En aplicaciones web modernas, este entorno es típicamente una plataforma en la nube que gestiona la infraestructura de servidores, la distribución geográfica del contenido y la disponibilidad del servicio (Kleppmann, 2017).

Un aspecto fundamental del despliegue es la separación entre entornos. El entorno de **desarrollo** es donde el programador escribe y prueba el código; normalmente opera con bases de datos locales o de prueba y con variables de configuración que no corresponden al servicio real. El entorno de **producción** es donde opera el sistema para los usuarios finales, con las credenciales definitivas, la base de datos real y las restricciones de seguridad completas. Mezclar ambos entornos —por ejemplo, conectar el entorno de desarrollo a la base de datos de producción— representa un riesgo operativo significativo.

### 3.10.1 Variables de entorno

Las variables de entorno son el mecanismo estándar para configurar aplicaciones web sin incluir valores sensibles en el código fuente (Twelve-Factor App, 2017). En lugar de escribir las credenciales de la base de datos directamente en el código, la aplicación las lee de variables definidas en el entorno de ejecución. Esto permite usar credenciales distintas en desarrollo y producción sin modificar el código, y evita que secretos como claves de API o contraseñas queden expuestos en el repositorio de código fuente.

En UCES Plataforma de Talento, las variables de entorno relevantes son: `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (accesibles desde el navegador, por eso el prefijo `NEXT_PUBLIC_`), `SUPABASE_SERVICE_ROLE_KEY` (disponible solo en el servidor, nunca expuesta al cliente) y `CURP_HASH_SECRET` (la clave de HMAC, solo disponible en el servidor). La convención de Next.js de usar el prefijo `NEXT_PUBLIC_` para variables accesibles en el cliente y omitirlo para las exclusivas del servidor es un mecanismo de seguridad por convención: garantiza que las claves sensibles no se incluyan en el bundle de JavaScript enviado al navegador.

### 3.10.2 Vercel y el despliegue de Next.js

Vercel es la plataforma de despliegue desarrollada por el mismo equipo que mantiene Next.js (Vercel, 2024b). Provee integración nativa con el framework: detecta automáticamente la estructura de un proyecto Next.js, lo construye y lo despliega en su red de distribución de contenido (CDN). Los Server Components y los Route Handlers se ejecutan en funciones sin servidor (*serverless functions*) distribuidas geográficamente, lo que elimina la necesidad de administrar servidores dedicados.

La integración con servicios de control de versiones como GitHub permite configurar despliegues automáticos: cada *push* a la rama principal activa una nueva construcción y despliegue, y cada *pull request* genera un entorno de vista previa (*preview deployment*) con una URL única. Este flujo de trabajo facilita la revisión de cambios antes de que lleguen a producción.

Supabase, por su parte, opera como el servicio de datos independiente del despliegue de la aplicación. La conexión entre la aplicación desplegada en Vercel y la base de datos en Supabase se configura mediante las variables de entorno del proyecto de Vercel, separando claramente la capa de presentación y lógica del sistema de persistencia de datos.

---

## 3.11 Conclusiones del capítulo

Los fundamentos revisados en este capítulo forman la base sobre la que se construyó UCES Plataforma de Talento. La ingeniería de software proveyó el marco conceptual para transformar requisitos en una solución implementable mediante un proceso sistemático. El modelo de arquitectura web moderna —con su separación de entornos, su API como punto de integración y sus mecanismos de seguridad por capas— determinó la estructura general del sistema.

Next.js y React definieron el modelo de componentes, el enrutamiento y la forma en que se procesa la lógica en el servidor y en el cliente. TypeScript añadió verificación estática que redujo los errores de integración entre capas. Supabase integró la base de datos relacional, el sistema de autenticación basado en JWT y el almacenamiento de archivos en una plataforma cohesionada con sus propias garantías de seguridad. El modelo RLS de PostgreSQL y la función `get_my_role()` permitieron definir reglas de acceso que operan directamente sobre los datos, independientemente del código de la aplicación.

El HMAC-SHA256 aplicado a la CURP resolvió la necesidad de detectar registros duplicados respetando la privacidad del dato original. El modelo Big Five proveyó el marco conceptual para el instrumento psicométrico, y las escalas Likert el mecanismo de captura de respuestas. El control de tiempo en las evaluaciones se diseñó para que la verificación definitiva ocurriera en el servidor, no en el cliente. Las herramientas de interfaz —Tailwind CSS y shadcn/ui— facilitaron construir una experiencia coherente y accesible sin comprometer la velocidad de desarrollo.

El Capítulo V retomará cada uno de estos fundamentos en el contexto específico de las decisiones de implementación: qué fragmentos de código aplican estos principios, qué diferencias emergieron entre el diseño previo y la implementación resultante, y qué consideraciones técnicas determinaron la forma final del sistema.
