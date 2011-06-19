window.FileManagerView = Backbone.View.extend({
  tagName: "nav",
  className: "file-manager",
  
  initialize: function() {
    _.bindAll(this, "render");
  },
  
  render: function() {
    $(this.el).append("<ul><li><a href='#'>Project</a></li></ul>");
    $(this.el).find("ul").append("<li><a href='#'>Project</a></li>");
    $(this.el).find("ul").append("<li><a href='#'>Project</a><ul><li><a href='#'>File</a></li></ul></li>");
    for(var i = 0; i < 20; i++) { 
      $(this.el).find("ul").append("<li><a href='#'>Project</a></li>");
    }
    return this;
  }
});
