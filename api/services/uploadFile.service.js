const { BlobServiceClient } = require('@azure/storage-blob');
const { config } = require('./../config/config');

const blobServiceClient = new BlobServiceClient(
	`https://${config.accountName}.blob.core.windows.net/?${config.sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(
	config.containerName
);

class UploadFileService {
	constructor() {}

	async uploadFileStream(blobName, dataStream) {
		const blobClient = containerClient.getBlockBlobClient(blobName);
		await blobClient.uploadStream(dataStream);
		return blobClient.url;
	}
}

module.exports = UploadFileService;
