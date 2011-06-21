window.MainView = Backbone.View.extend({
  tagName: "section",
  
  initialize: function() {
    _.bindAll(this, "render", "resize");
    var self = this;
    this.tabs = new TabsView();
    this.consoleView = new ConsoleView();
    this.consoleView.tabsView = this.tabs;
    this.fileManagerView = new FileManagerView();
    this.render();
    
    $(document).resize(this.resize);
    

  },
  
  render: function() {
    var self = this;
    $(this.el).empty()
              .append(this.tabs.render().el)
              .append(this.consoleView.render().el)
              .append(this.fileManagerView.render().el);
    $(self.tabs.el).resizable({
      handles: 'w',
      resize: function(event, ui) {
        $(self.fileManagerView.el).css({
          width: $('body').width() - $(self.tabs.el).width() + "px",
          left: "0px"
        });
        
        self.tabs.resize();
      },
    });
    $("body").append(this.el);
    this.resize();
  },
  
  resize: function() {
    this.consoleView.resize();
    this.tabs.resize();
    
    $(this.fileManagerView.el).height($('body').height() - $(this.consoleView.el).height());
  }
});
