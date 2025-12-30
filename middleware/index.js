
// Middleware en Express es una función que tiene acceso al objeto de solicitud (req), 
// al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de 
// solicitud-respuesta de una aplicación Express. El propósito principal del middleware 
// es procesar las solicitudes entrantes, realizar operaciones específicas 
// (como autenticación, registro, manejo de errores, etc.) y luego pasar el control a la 
// siguiente función de middleware o a la ruta final que maneja la solicitud.
// Los middleware se utilizan para modularizar y organizar el código de una aplicación Express, 
// permitiendo que diferentes funcionalidades se implementen de manera separada y reutilizable. 
// Pueden ser aplicados a nivel de aplicación, a nivel de ruta específica o incluso a nivel de grupo de rutas.


const runMiddlewares = (req, res, middlewares) => {
    index = 0;
    const next = () => {
        if (index < middlewares.length) {
            const currentMiddleware = middlewares[index];
            index++;
            currentMiddleware(req, res, next);
        }
    };
    next();
}


const middleware1 = (req, res, next) => {
    console.log('Middleware 1 Iniciado');
    console.log(`Autenticando usuario...`);
    if (req.user) {
        console.log(`Usuario autenticado: ${req.user.name}`);
        console.log('Middleware 1 ejecutado');
        next();
    }
    else {
        console.log('Usuario no autenticado. Acceso denegado.');
    }
    // next();
}

const middleware2 = (req, res, next) => {
    console.log('Middleware 2 ejecutado');
    next();
}

const middleware3 = (req, res, next) => {
    console.log('Middleware 3 ejecutado');
    next();
}

req2 = {};
req = {};
req.email = {name: "juan@mail.com", content: "Hola Juan, bienvenido a nuestra plataforma!"};
req.user = { id: 1, name: 'Juan' }; // Simulación de autenticación

res = {};
res.status = "201";
res.emailSended = true;

runMiddlewares(req2, res, [middleware1, middleware2, middleware3]);