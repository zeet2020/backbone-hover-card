var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(w) {
  var hoverView;
  return hoverView = (function(superClass) {
    extend(hoverView, superClass);

    function hoverView() {
      return hoverView.__super__.constructor.apply(this, arguments);
    }

    hoverView.prototype.delegate = function() {
      this.el.on('show.bs.popover', this.onshowcallback);
      this.el.on('shown.bs.popover', this.aftershowcallback);
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
      if (opt.el) {
        this.el = opt.el;
      }
      if (opt.selector) {
        this.el = $(opt.selector);
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
      this.el.popover('show');
    };

    hoverView.prototype.destroy = function() {
      this.el.popover('destroy');
    };

    hoverView.prototype.hide = function() {
      this.el.popover('hide');
    };

    hoverView.prototype.render = function() {
      this.$el.empty();
      this.$el.html(this.template(this.model.attributes));
      this.popover_opt['content'] = this.$el.html();
      this.delegate();
      this.el.popover(this.popover_opt);
      return this;
    };

    Backbone.hovercard = function(opt) {
      return new hoverView(opt).render();
    };

    return hoverView;

  })(Backbone.View);
})(window);
