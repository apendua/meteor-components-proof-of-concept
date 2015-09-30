'use strict';

Template.image1x1.helpers({
    style: function () {
        var chunks = [];
        if (this.src) {
            chunks.push('background-image:url(' + this.src + ')');
        }
        if (this.size) {
            chunks.push('background-size:' + this.size);
        }
        return chunks.join(';');
    },
});
