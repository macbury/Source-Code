window.ConsoleView = Backbone.View.extend({
  tagName: "footer",
  className: "command-line",
  
  initialize: function() {
    _.bindAll(this, "render", "resize");
    $(window).resize(this.resize);
    this.resize();
  },
  
  resize: function() {
    $(this.el).find("input").width( $(this.el).width() - $(this.el).find(".arrow").width() - 20 );
  },
  
  render: function() {
    $(this.el).append("<span class='arrow'>&nbsp;</span>").append("<input type='text' />");
    var canon = require('pilot/canon');
    $(this.el).find("input").autocomplete({
			source: canon.getCommandNames(),
			position: { my : "right bottom", at: "right top" }
		});
    this.resize();
    return this;
  }
});
