'use strict';

Helpers.define('avatarUrl', function () {
    var user = Meteor.user();
    return (user && user.profile && user.profile.avatarUrl) || '/images/defaultAvatar.svg';
});

Helpers.registerAs('$');

Template.body.onCreated(function () {
    
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        Accounts.createUser({ username: 'test', password: 'secret' });
    }
    
});
