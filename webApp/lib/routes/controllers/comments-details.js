CommentsDetailsController = RouteController.extend({
    subscriptions: function () {
        this.subscribe('comments.one', this.params._id).wait();
    },

    data: function () {
        return Comments.findOne({_id: this.params._id});
    },

    action: function () {
        this.render('CommentsDetails');
    }    
});
