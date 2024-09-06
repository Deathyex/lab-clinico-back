const express = require('express');
const {
	uploadFile,
	getFiles,
	getFile,
	downloadFile,
	getFileURL
} = require('../../s3');

const router = express.Router(); // Creación del router

// Ruta para obtener la lista de archivos
router.get('/files', async (req, res) => {
	const result = await getFiles(); // Obtener la lista de archivos
	res.json(result.Contents); // Responder con la lista de archivos
});

// Ruta para obtener la URL de un archivo
router.get('/files/:fileName', async (req, res) => {
	const result = await getFileURL(req.params.fileName); // Obtener la URL de un archivo
	res.send({
		url: result // Responder con la URL del archivo
	});
});

// Ruta para descargar un archivo en formato PDF
router.get('/descargarpdf/:fileName', async (req, res) => {
	await downloadFile(req.params.fileName); // Descargar un archivo en formato PDF
	res.json({ message: ' Descarga exitosa ' }); // Responder con un mensaje de éxito
});

// Ruta para cargar un archivo
router.post('/files', async (req, res) => {
	const result = await uploadFile(req.files.file); // Cargar un archivo
	res.json({ result }); // Responder con el resultado de la carga del archivo
});
