window.ConsoleView = Backbone.View.extend({
  tagName: "footer",
  className: "command-line",
  
  initialize: function() {
    _.bindAll(this, "render", "resize", "execCommand", "commands");
    $(window).resize(this.resize);
    this.canon = require('pilot/canon');
    this.tabsView = null;
    this.resize();
  },
  
  commands: function() {
    var commands = [];
    var canon = this.canon;
    _.each(canon.getCommandNames(), function(command) {
      commands.push(canon.getCommand(command));
    });
    
    return commands;
  },
  
  resize: function() {
    $(this.el).find("input").width( $(this.el).width() - $(this.el).find(".arrow").width() - 20 );
  },
  
  execCommand: function() {
    var command = this.input.val();
    this.canon.exec(command, { editor: this.tabsView.selectedTab.editor }, 'console', {});
    
    this.tabsView.selectedTab.focus();
    this.input.autocomplete("close").val("");
    return false;
  },
  
  render: function() {
    var self = this;
    $(this.el).append("<span class='arrow'>&nbsp;</span>").append("<form><input type='text' /></form>");
    $(this.el).find("form").submit(this.execCommand);
    this.input = $(this.el).find("form").find("input");
    this.input.autocomplete({
			source: this.canon.getCommandNames(),
			position: { my : "right bottom", at: "right top" },
			focus: function( event, ui ) {
				self.input.val(ui.item.value);
				return false;
			},
			select: function(event, ui) {
			  self.input.val(ui.item.value);
			  self.input.parents("form").submit();
			  return false;
			}
		}).data( "autocomplete" )._renderItem = function( ul, item ) {
			return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a><span class='shortcut'>Ctr+A</span>" + item.value + "</a>" )
				.appendTo( ul );
		};
    this.resize();
    return this;
  }
});
