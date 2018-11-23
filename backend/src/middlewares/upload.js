const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuidv4 = require('uuid/v4')
const path = require('path')
const config = require('./../config')

aws.config.update(config.awsaccess)

var s3 = new aws.S3()
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.bucket,
    key: function (req, file, cb) {
      console.log(file)
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`
      cb(null, newFilename)
    }
  })
})

module.exports = upload
