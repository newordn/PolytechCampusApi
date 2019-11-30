const mkdirp = require('mkdirp')
const UPLOAD_DIR='./uploads'
const shortid = require('shortid')
const { createWriteStream, unlink } = require('fs')

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR)

const storeUpload = async upload => {
  
    const { createReadStream, filename, mimetype } = await upload
    console.log(filename)
    const stream = createReadStream()
    const id = shortid.generate()
    const path = `${UPLOAD_DIR}/${id}-${filename}`
    const file = { id, filename, mimetype, path }
  
    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
      stream
        .on('error', error => {
          unlink(path, () => {
            reject(error)
          })
        })
        .pipe(createWriteStream(path))
        .on('error', reject)
        .on('finish', resolve)
    })
  
  
    return file
  }
  module.exports={
      storeUpload
  }