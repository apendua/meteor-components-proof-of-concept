'use strict';

var bucketForUploads = Meteor.settings.AWSBucket;
var regionForUploads = Meteor.settings.AWSRegion;
var accessKeyId = Meteor.settings.AWSAccessKeyId;
var secretAccessKey = Meteor.settings.AWSSecretAccessKey;

Slingshot.createDirective("imagesUploadedByUsers", Slingshot.S3Storage, {
    
    AWSAccessKeyId: accessKeyId,
    AWSSecretAccessKey: secretAccessKey,

    bucket: bucketForUploads,
    region: regionForUploads,

    acl: "public-read",

    authorize: function(file, meta) {

        if (!this.userId) {
            var message = "Please login before uploading files.";
            throw new Meteor.Error("Login Required", message);
        }

        return ImageUploads.find({
            _id: meta.uploadId,
            createdBy: this.userId
        }).count() > 0;
    },

    key: function(file, meta) {
        return this.userId + "/" + meta.uploadId + '_' + file.name;
    },

});
