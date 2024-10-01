const { BlobServiceClient } = require('@azure/storage-blob');
const { config } = require('./../config/config');

const blobServiceClient = BlobServiceClient.fromConnectionString(
	config.connectionString
);

class UploadFileService {
	constructor() {}

	async uploadFile(userName, tipoExamen, buffer) {
		const fileName = `${userName}_${tipoExamen}_${Date.now()}`.replaceAll(
			' ',
			'-'
		);
		const containerClient =
			blobServiceClient.getContainerClient('results-documents');
		const blobResponse = await containerClient
			.getBlockBlobClient(fileName + '.pdf')
			.uploadData(buffer);

		return { fileName, url: blobResponse._response.request.url };
	}

	async uploadImg(originalName, buffer) {
		const containerClient =
			blobServiceClient.getContainerClient('examenes-imgs');
		const blobResponse = await containerClient
			.getBlockBlobClient(originalName)
			.uploadData(buffer);

		return { fileName, url: blobResponse._response.request.url };
	}
}

module.exports = UploadFileService;
