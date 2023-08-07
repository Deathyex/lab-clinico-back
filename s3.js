const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { config } = require('./api/config/config');
const fs = require('fs');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
  region: config.aws_region,
  credentials: {
    accessKeyId: config.aws_key,
    secretAccessKey: config.aws_secret
  }
});

async function uploadFile(file){
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: config.aws_name,
    Key: file.name,
    Body: stream
  }
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}

async function getFiles(){
  const command = new ListObjectsCommand({
    Bucket: config.aws_name
  })
  return await client.send(command);
}

async function getFile(fileName){
  const command = new GetObjectCommand({
    Bucket: config.aws_name,
    Key: fileName
  })
  return await client.send(command);
}

async function downloadFile(fileName){
  const command = new GetObjectCommand({
    Bucket: config.aws_name,
    Key: fileName
  })
  const result = await client.send(command);
  console.log(result)
  result.Body.pipe(fs.createWriteStream(`./documents/${fileName}`))
}

async function getFileURL(fileName){
  const command = new GetObjectCommand({
    Bucket: config.aws_name,
    Key: fileName
  })
  return await getSignedUrl(client, command, { expiresIn: 3600 });
}

module.exports = { uploadFile, getFiles, getFile, downloadFile, getFileURL };
