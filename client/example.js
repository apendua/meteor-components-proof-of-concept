Template.example.helpers({
    myForm: function () {
        return Template.instance().form;
    }
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
        }
    });
});
