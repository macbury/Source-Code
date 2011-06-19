window.TabsView = Backbone.View.extend({
  tagName: "section",
  className: "documents-tabs",
  tabs: [],
  initialize: function() {
    _.bindAll(this, "render", "open", 'resize', "create");
    $(window).resize(this.resize);
    
    OpenedFiles.bind('add', this.open);
    var self = this;
    var canon = require('pilot/canon');

    canon.addCommand({
      name: 'new',
      bindKey: {
        win: 'Alt-T',
        mac: 'Alt-T',
        sender: function() { return document.body; }
      },
      exec: function(env, args, request) {
        self.create();
      }
    });
    

  },
  
  resize: function(tab_id) {
    var self = this;
    
    _.each(this.tabs, function(tab){
      tab.resize();
    });
  },
  
  create: function() {
    OpenedFiles.add({ "name": "Empty file "+this.tabs.length });
  },
  
  open: function(file){
    var view = new TabView({model: file});
    $(this.el).append(view.render().el);
    $(this.el).tabs("add", '#tab_'+file.cid, file.get("name"));
    $(this.el).tabs( "select" , '#tab_'+file.cid );
    //$(this.el).find(".ui-tabs-nav").sortable({ axis: "x" });
    this.tabs.push(view);
    this.resize();
  },
  
  render: function() {
    var self = this;
    $(this.el).append("<ul />");
    $(this.el).tabs({
      show: function(event, ui){
        var file_id = $(ui.panel).attr("id").replace("tab_", "");
        var tabView = _.detect(self.tabs, function(tab) {
          return tab.model.cid == file_id;
        });
        
        if (tabView) {
          tabView.focus();
        }
      },
      tabTemplate: "<li><span class='ui-icon ui-icon-document'>File</span> <a href='#{href}' class='tab'>#{label}</a> <span class='ui-icon ui-icon-circle-close'>Close File</span></li>",
      remove: function(event, ui) {
        OpenedFiles.remove(OpenedFiles.getByCid($(ui.panel).attr("id").replace("tab_", "")));
      },
    });
    
    $(this.el).find("span.ui-icon-circle-close").live( "click", function() {
			var index = $( "li", $(self.el) ).index( $( this ).parent() );
			$(self.el).tabs( "remove", index );
		});
    return this;
  }
});
