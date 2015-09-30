'use strict';

Template.example.helpers({
    myForm: function () {
        return Template.instance().form;
    },
    myUploader: function () {
        return Template.instance().uploader;
    },
});

Template.example.onCreated(function () {
  
    this.form = new Form({
        on: 'blur',
        inline: true,
        fields: {
            firstName: {
                placeholder: 'first name',
                label: 'First Name',
                rules: [
                    {
                       type   : 'empty',
                       prompt : 'Please enter your first name'
                     }
                ]
            },
            lastName: {
                placeholder: 'last name',
                label: 'Last Name',
                rules: [
                    {
                       type   : 'empty',
                       prompt : 'Please enter your last name'
                     }
                ]
            },
            biography: {
                placeholder: 'a few words about yourself',
                label: 'Biography',
                rules: [
                    {
                       type   : 'empty',
                       prompt : 'Please write a short biography'
                     }
                ]
            },
        }
    });
    
    this.uploader = new ImageUploader({
        directive: "imagesUploadedByUsers",
        getUploadId: function (file, cb) {
            var upload = new ImageUpload();
            upload.set('title', file.name);
            upload.set('size', file.size);
            upload.set('status', 'uploading');
            upload.set('createdBy', Meteor.userId());
            upload.save(cb);
        },
        getImageUrl: function () {
            return Helpers.avatarUrl();
        },
        onSuccess: function (uploadId, downloadUrl) {
            var upload = ImageUploads.findOne({ _id: uploadId });
            upload.set('downloadUrl', downloadUrl);
            upload.set('status', 'success');
            upload.save();
            Meteor.users.update({ _id: Meteor.userId() }, {
                $set: {
                    'profile.avatarUrl': downloadUrl
                }
            });
        },
        onError: function (uploadId, error) {
            var upload = ImageUploads.findOne({ _id: uploadId });
            upload.set('message', error.message);
            upload.set('status', 'failure');
            upload.save();
        },
    });
});
