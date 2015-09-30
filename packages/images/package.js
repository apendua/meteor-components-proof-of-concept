Package.describe({
    name: 'custom:images',
    version: '0.0.0',
    description: 'Simple image tools',
});

Package.onUse(function (api) {
    'use strict';
    
    api.versionsFrom('METEOR@1.0');
    
    api.use([ 'tracker', 'templating' ]);
    
    api.addFiles([
        
        'image1x1.html',
        'image1x1.css',
        'image1x1.js',
        
    ], 'client');
});