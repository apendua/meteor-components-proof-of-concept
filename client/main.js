'use strict';

Helpers.define('avatarUrl', function () {
    var user = Meteor.user();
    return (user && user.profile && user.profile.avatarUrl) || '/images/defaultAvatar.svg';
});

Helpers.registerAs('$');

