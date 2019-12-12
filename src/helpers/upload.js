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
  refresh_token:"1//04zalNEh0DpyDCgYIARAAGAQSNwF-L9IriWFjE8GVYraE9bdLRkf_gmjrhV6blSDBYtTv6X-Hy9tj9Ouj3srGtX3ykomRGTYuxRE",
  access_token:"ya29.Il-0BwvUj4DOeoSRGwGYTYMRwSyLqIOcyhdZb0LkTO9o0mbliMPpuGRcPvlrVZSvDyh8jpuX7ddvpnZK3gOey7M6gzN0iZkEZCv5sPJWDcHjdFeyKwGEjGlq9pmGVcvvbA",
  token_expiry:"none"
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