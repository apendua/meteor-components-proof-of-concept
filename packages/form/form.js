/*jshint -W020*/
'use strict';

Form = function (options) {
    var template = new Template('form', Template.__form.renderFunction);

    template.fields = {};

    _.each(options.fields, function (field, name) {
        var t = new Template('field', Template.__formField.renderFunction);
        t.helpers(field);
        t.helpers({
            name: name,
            value: function () {
                if (options.getValue) {
                    return options.getValue(name);
                }
                return this && this.value;
            },
            typeIs: function (type) {
                return this.type === type;
            },
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
    
    var update = _.debounce(function (e) {
        if (options.onUpdate) {
            options.onUpdate($(e.target).attr('name'), $(e.target).val());
        }
    }, 500);

    template.events({
        'change [name]': update,
        'keyup [name]': update,
    });


    return template;
};
