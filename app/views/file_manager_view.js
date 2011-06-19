window.FileManagerView = Backbone.View.extend({
  tagName: "nav",
  className: "file-manager",
  
  initialize: function() {

  },
  
  render: function() {
    $(this.el).append("sidebar");
    return this;
  }
});
