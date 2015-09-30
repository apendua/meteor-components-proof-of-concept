Package.describe({
    summary: "Form component for Meteor",
    version: "0.0.0",
    name: "custom:form",
    git: "https://github.com/anticoders/meteor-helpers.git"
});

Package.onUse(function(api) {
    'use strict';
    api.versionsFrom('METEOR@1.0');
    api.use(['templating', 'tracker']);
    api.addFiles([
        'form.html',
        'form.js',
        'formField.html',
    ]);
    api.export('Form');
});
