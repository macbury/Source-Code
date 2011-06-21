window.ConsoleView = Backbone.View.extend({
  tagName: "footer",
  className: "command-line",
  
  initialize: function() {
    _.bindAll(this, "render", "resize", "execCommand", "commands", "onCommandKey");
    $(window).resize(this.resize);
    this.canon = require('pilot/canon');
    this.tabsView = null;
    this.resize();
    
    var self = this;
    this.canon.addCommand({
      name: 'command',
      bindKey: {
        win: 'Alt-C',
        mac: 'Alt-C',
        sender: "editor|console"
      },
      exec: function(env, args, request) {
        self.input.focus();
      }
    });
  },
  
  onCommandKey: function(e, hashId, keyCode) {
    var self = this;
    var keyUtil = require("pilot/keys");
    var keyString = keyUtil.keyCodeToString(keyCode);
    var command = self.canon.findKeyCommand({ editor: self.tabsView.selectedTab.editor }, "editor", hashId, keyString);
    
    if (command) {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
      self.input.val(command.name);
      self.input.parents("form").submit();
    }
  },
  
  commands: function() {
    var commands = [];
    var canon = this.canon;
    _.each(canon.getCommandNames(), function(command_name) {
      var command = canon.getCommand(command_name);
      var item = {
        value: command.name,
        label: command.name,
        key: "None"
      };
      
      if (command.bindKey && command.bindKey["win"]) {
        item.key = command.bindKey["win"].split("|").join(" ");
      }
      commands.push(item);
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
      minLength: 3,
			source: this.commands(),
			autoFocus: false,
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
				.append( "<a><span class='shortcut'>"+item.key+"</span>" + item.value + "</a>" )
				.appendTo( ul );
		};
		
		var event = require("pilot/event");
    event.addCommandKeyListener(document.body, this.onCommandKey);
    //event.addCommandKeyListener(this.input, this.onCommandKey);
    this.resize();
    return this;
  }
});
