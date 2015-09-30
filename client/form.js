Form = function (options) {
    'use strict';

    var template = new Template('form', Template.__form.renderFunction);
    var context = {};

    template.fields = {};

    _.each(options.fields, function (field, name) {
        var t = new Template('field', Template.__formField.renderFunction);
        t.helpers(field);
        t.helpers({
            name: name,
            value: function () {
                return this[name] || Template.parentData()[name];
            }
        });
        template.fields[name] = t;
    });

    template.onRendered(function () {
        var fields = {};
        
        _.each(options.fields, function (field, name) {
            fields[name] = {
                identifier: name,
                rules: field.rules || [],
            };
        });
        
        this.$('.ui.form').form(_.defaults({
            fields: fields
        }, options));
    });

    return template;
};
