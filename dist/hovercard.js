var hoverView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

hoverView = (function(superClass) {
  extend(hoverView, superClass);

  function hoverView() {
    return hoverView.__super__.constructor.apply(this, arguments);
  }

  hoverView.prototype.tagName = 'div';

  hoverView.prototype.className = 'hovercard';

  hoverView.prototype.defaultopt = {
    loadTimeOut: 1000,
    popover_opt: {
      placement: 'top',
      html: true
    }
  };

  hoverView.prototype.registerpopoverevent = function() {
    this.target.on('show.bs.popover', _.bind(this.onshowhandler, this));
    this.target.on('shown.bs.popover', _.bind(this.aftershowhandler, this));
    this.target.on('hide.bs.popover', _.bind(this.hidepopoverhandler, this));
    this.target.on('hidden.bs.popover', _.bind(this.hiddenpopoverhandler, this));
    this.target.on('inserted.bs.popover', _.bind(this.oninsertedhandler, this));
  };

  hoverView.prototype.oninsertedhandler = function() {
    console.log("testing");
  };

  hoverView.prototype.hiddenpopoverhandler = function() {
    console.log("hidding");
    this.$el.empty();
    delete this.model;
  };

  hoverView.prototype.hidepopoverhandler = function() {
    console.log("Testing");
  };

  hoverView.prototype.onshowhandler = function(e) {
    this.trigger("onShowEvent", e);
  };

  hoverView.prototype.aftershowhandler = function(e) {
    if (this.data_url) {
      setTimeout(_.bind(this.fetchData, this), this.defaultopt.loadTimeOut);
    }
    this.trigger("afterShowEvent", e);
  };

  hoverView.prototype.onShow = function(callback) {
    this.on("onShowEvent", callback);
    return this;
  };

  hoverView.prototype.afterShow = function(callback) {
    this.on("afterShowEvent", callback);
    return this;
  };

  hoverView.prototype.fetchData = function() {
    return $.get(this.data_url, (function(_this) {
      return function(data) {
        _this.model = new Backbone.Model(data);
        return _this.$el.html(_this.template(_this.model.attributes));
      };
    })(this));
  };

  hoverView.prototype.initialize = function(opt) {
    if (opt == null) {
      opt = {};
    }
    opt = _.defaults(opt, this.defaultopt.popover_opt);
    if (opt.template) {
      this.template = _.template(opt.template);
    }
    if (opt.popover_opt) {
      this.popover_opt = opt.popover_opt;
    }
    if (opt.data) {
      if (_.isString(opt.data)) {
        this.data_url = opt.data;
      } else {
        this.model = new Backbone.Model(opt.data);
      }
    }
    if (opt.target) {
      this.target = $(opt.target);
    }
    this.render();
    return this;
  };

  hoverView.prototype.show = function() {
    this.target.popover('show');
  };

  hoverView.prototype.destroy = function() {
    this.target.popover('destroy');
  };

  hoverView.prototype.hide = function() {
    this.target.popover('hide');
  };

  hoverView.prototype.render = function() {
    this.$el.empty();
    this.$el.html("loading please wait");
    if (this.model) {
      this.$el.html(this.template(this.model.attributes));
    }
    this.popover_opt['content'] = this.$el;
    this.target.popover(this.popover_opt);
    this.registerpopoverevent();
    return this;
  };

  return hoverView;

})(Backbone.View);

window.hoverCard = function(para) {
  var error, i, j, len;
  if (para == null) {
    para = {};
  }
  error = [];
  if (!para.template) {
    error.push("template parameter missing");
  }
  if (!para.popover_opt) {
    error.push("popover parameters missing");
  }
  if (!para.data) {
    error.push("data parameter missing");
  }
  if (!para.target) {
    error.push("target element is required");
  }
  if (error.length > 0) {
    for (j = 0, len = error.length; j < len; j++) {
      i = error[j];
      console.log(i);
    }
    return;
  }
  return new hoverView(para);
};
