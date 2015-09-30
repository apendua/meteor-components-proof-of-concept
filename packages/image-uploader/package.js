Package.describe({
    name: 'custom:image-uploader',
    version: '0.0.0',
    describe: 'A simple pattern for image uploads'
});

Package.onUse(function (api) {
    'use strict';
    api.versionsFrom('METEOR@1.0');
    
    api.use([
        'templating',
        'reactive-var',
        'edgee:slingshot@0.7.1',
        'custom:droparea',
        'custom:images',
    ]);
    
    api.imply('edgee:slingshot');
    
    api.addFiles([

        'imageUploader.css',
        'imageUploader.html',
        'imageUploader.js',

    ], 'client');
    
    api.export('ImageUploader');
});
