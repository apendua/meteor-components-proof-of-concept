/*jshint -W020*/
'use strict';

ImageUploader = function (options) {
    var isUploading = new ReactiveVar(false);
    var currentUploadId = new ReactiveVar();
    var currentUploader = null;
    var currentFile = null;
    var dependency = new Tracker.Dependency();
    var template = new Template('imageUploader', Template.__imageUploader.renderFunction);
    
    template.onCreated(function () {
        this.autorun(function () {
            var uploadId = currentUploadId.get();
            if (!uploadId) {
                return;
            }
            if (currentUploader) {
                return;
            }
            dependency.changed();
            currentUploader = new Slingshot.Upload(options.directive, {
                uploadId: uploadId,
            });
            isUploading.set(true);
            currentUploader.send(currentFile, function(error, downloadUrl) {
                currentUploader = null;
                currentFile = null;
                isUploading.set(false);
                //---------------------
                if (error) {
                    if (options.onError) {
                        options.onError(uploadId, error);
                    }
                } else {
                    if (options.onSuccess) {
                        options.onSuccess(uploadId, downloadUrl);
                    }
                }
            });
        });
    });
    
    template.onRendered(function () {
        var that = this;
        this.autorun(function () {
            var percent;
            dependency.depend();
            if (currentUploader && isUploading.get()) {
                // note that this is a reactive data source ...
                percent = Math.round(currentUploader.progress() * 100);
            } else {
                percent = 100;
            }
            that.$('.ui.progress').progress({
                percent: percent
            });
        });
    });
    
    template.helpers({
        isUploading: function () {
            return isUploading.get();
        },
        getImageUrl: function() {
            dependency.depend();
            if (currentUploader) {
                return currentUploader.url(true);
            }
            if (options.getImageUrl) {
                return options.getImageUrl();
            }
        },
    });
    
    template.events({
        'drop': function(e) {
            e.preventDefault();
            if (isUploading.get()) {
                // do not upload another one yet ...
                return;
            }
            var dt = event && event.dataTransfer;
            if (!dt || !dt.files || dt.files.length === 0) {
                return;
            }
            var file = dt.files[0];
            if (options.getUploadId) {
                options.getUploadId(file, function (err, id) {
                    if (err) {
                        toastr.error(err.message, 'While preparing your upload');
                        return;
                    }
                    currentUploadId.set(id);
                    currentFile = file;
                });
            } else {
                console.warn('Cannot acquire uploadId.');
            }
        }
    });
    
    return template;
};
