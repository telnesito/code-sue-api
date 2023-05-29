// Importamos el archivo de la aplicación
import app from "./app.js";

// Definimos la función principal
const main = () => {
	// Indicamos al servidor que escuche en el puerto definido en la aplicación
	app.listen(app.get("port"));
};
// Llamamos a la función principal para iniciar el servidor
main();
