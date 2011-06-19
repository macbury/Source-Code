window.MainView = Backbone.View.extend({
  tagName: "section",
  
  initialize: function() {
    _.bindAll(this, "render");
    this.tabs = new TabsView();
    this.consoleView = new ConsoleView();
    this.fileManagerView = new FileManagerView();
    this.render();
  },
  
  render: function() {
    $(this.el).empty()
              .append(this.tabs.render().el)
              .append(this.consoleView.render().el)
              .append(this.fileManagerView.render().el);
    $("body").append(this.el);
    this.consoleView.resize();
  }
});
