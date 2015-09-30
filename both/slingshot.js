'use strict';

var maxKBytesPerImage = Meteor.settings.public.maxKBytesPerImage;

Slingshot.fileRestrictions('imagesUploadedByUsers', {
    allowedFileTypes : [
        'image/png',
        'image/jpeg',
    ],
    maxSize : maxKBytesPerImage * 1024
});
