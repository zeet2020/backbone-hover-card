var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(w) {
  var hoverView;
  return hoverView = (function(superClass) {
    extend(hoverView, superClass);

    function hoverView() {
      return hoverView.__super__.constructor.apply(this, arguments);
    }

    hoverView.prototype.tagName = 'div';

    hoverView.prototype.delegate = function() {
      this.selector.on('show.bs.popover', this.onshowcallback);
      this.selector.on('shown.bs.popover', this.aftershowcallback);
    };

    hoverView.prototype.onShow = function(callback) {
      this.onshowcallback = callback;
      return this;
    };

    hoverView.prototype.afterShow = function(callback) {
      this.aftershowcallback = callback;
      return this;
    };

    hoverView.prototype.initialize = function(opt) {
      if (opt.selector) {
        this.selector = $(opt.selector);
      }
      if (opt.template) {
        this.template = _.template(opt.template);
      }
      if (opt.popover_opt) {
        this.popover_opt = opt.popover_opt;
      }
      if (opt.model) {
        this.model = new Backbone.Model(opt.model);
      }
    };

    hoverView.prototype.show = function() {
      this.selector.popover('show');
    };

    hoverView.prototype.destroy = function() {
      this.selector.popover('destroy');
    };

    hoverView.prototype.hide = function() {
      this.selector.popover('hide');
    };

    hoverView.prototype.render = function() {
      this.$el.empty();
      this.$el.html(this.template(this.model.attributes));
      this.popover_opt['content'] = this.$el.html();
      this.delegate();
      this.selector.popover(this.popover_opt);
      return this;
    };

    window.hover = function(opt) {
      return new hoverView(opt).render();
    };

    return hoverView;

  })(Backbone.View);
})(window);
