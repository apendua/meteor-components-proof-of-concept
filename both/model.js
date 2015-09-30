/*jshint -W020*/
ImageUploads = new Mongo.Collection('imageUploads');

ImageUpload = Astro.Class({
    collection: ImageUploads,
    name: 'ImageUpload',
    fields: {
        'createdAt': {
            type: 'date',
            default: null
        },
        'changedAt': {
            type: 'date',
            default: null
        },
        'createdBy': {
            type: 'string',
            default: null
        },
        'title': {
            type: 'string',
            default: '',
        },
        'size': {
            type: 'number',
            default: null,
        },
        'status': {
            type: 'string',
            default: 'uploading',
        },
        'downloadUrl': {
            type: 'string',
            default: null,
        },
        'removed': {
            type: 'boolean',
            default: false,
        },
        'message': {
            type: 'string',
            default: null,
        }
    }
});
