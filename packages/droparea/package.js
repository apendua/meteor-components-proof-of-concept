Package.describe({
    name: 'custom:droparea',
    version: '0.0.0',
    describe: 'Droparea component'
});

Package.onUse(function (api) {
    'use strict';
    
    api.versionsFrom('METEOR@1.0');
    
    api.use([ 'tracker', 'templating' ]);
    
    api.addFiles([
        
        'droparea.html',
        'droparea.css',
        'droparea.js',
        
    ], 'client');
});