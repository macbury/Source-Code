window.TabView = Backbone.View.extend({
  tagName: "div",
  
  initialize: function() {
    _.bindAll(this, "render", "remove");
    this.model.bind('change', this.render);
    this.model.bind('remove', this.remove);
    $(this.el).attr("id", 'tab_'+this.model.cid);
  },
  
  render: function() {
    $(this.el).append("<pre id='editor_"+this.model.cid+"' />");
    $(this.el).data("file_id",this.model.cid);
    this.editor = ace.edit($(this.el).find("pre")[0]);
    this.editor.setTheme("ace/theme/idle_fingers");
    this.editor.setShowPrintMargin(false);
    this.editor.getSession().setUseWrapMode(true);
    this.editor.getSession().setTabSize(2);
    this.editor.getSession().setUseSoftTabs(true);
    this.editor.setShowInvisibles(true);
    var JavaScriptMode = require("ace/mode/ruby").Mode;
    this.editor.getSession().setMode(new JavaScriptMode());
    return this;
  },
  
  resize: function() {
    $(this.el).find("pre").css({
      width: $('body').width() + "px",
      height: (window.innerHeight - 55) + "px",
    });
    this.editor.renderer.onResize();
  },
  
  remove: function() {
    $(this.el).remove();
  },
});
