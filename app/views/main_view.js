window.MainView = Backbone.View.extend({
  tagName: "section",
  
  initialize: function() {
    _.bindAll(this, "render");
    this.tabs = new TabsView();
    
    this.render();
  },
  
  render: function() {
    $(this.el).empty().append(this.tabs.render().el);
    $("body").append(this.el);
  }
});
