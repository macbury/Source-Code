window.File = Backbone.Model.extend({
  EMPTY: "Empty File",
  
  initialize: function() {
    if (!this.get("name")) {
      //.set({"name": this.EMPTY});
    }
  },
});
