const mkdirp = require('mkdirp')
const UPLOAD_DIR='./uploads'
const shortid = require('shortid')
const { createWriteStream, unlink } = require('fs')
const {google} = require('googleapis')
const oauth2Client = new google.auth.OAuth2(
  "350260510285-t7c9glq9o0gkcu3b3281qko95ruk2f5a.apps.googleusercontent.com",
  "QNYfXH6tW__UD3w7Va0dB15L"
)
oauth2Client.setCredentials({
  refresh_token:"1//04bPCamBqnr1hCgYIARAAGAQSNwF-L9Ir5iV2lintEgKcIQaTaViG0-uftr2_N8vHjl92lpMmPrQ5hoS9J8XW5byfW7cJdmswL24",
  access_token:"ya29.Il-0B6FqMpu5H0AkseWSeQmdQcBHc0RIiG_-AgJ1GUlwuak-opKv4PfxJ88H35ffqwRBq3cRZxnI8vxU4R3bG16VVim-D7QF-5jPiHEThte9-z2I8Yo-IBlSodiWP_9rlQ"
})
const drive = google.drive({
  version:'v3',
  auth: oauth2Client
})
// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR)

const storeUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload
    console.log(filename)
    const id = shortid.generate()
    let docId=""
    let path = `https://docs.google.com/uc?id=${docId}&amp;export=download`
  
    // Store the file in google
    try{
    const res = await drive.files.create({
      requestBody:{
        name: filename,
        mimeType: mimetype
      },
      media:{
        mimeType:mimetype,
        body: createReadStream(path)
      }
    })
    docId= res.data.id
    path = `https://docs.google.com/uc?id=${docId}&amp;export=download`
    console.log("success uploading",id)
  }
  catch(e){
    console.log("error uploading",e)
  }
  
  const file = { id, filename, mimetype, path }
    return file
  }
  module.exports={
      storeUpload
  }