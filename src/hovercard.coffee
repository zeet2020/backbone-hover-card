((w) ->

	class hoverView extends Backbone.View
		tagName:'div'
		delegate:()->
			@selector.on('show.bs.popover',@onshowcallback)
			@selector.on('shown.bs.popover',@aftershowcallback)
			return

		onShow:(callback)->
			@onshowcallback = callback
			return @

		afterShow:(callback)->
			@aftershowcallback = callback
			return @

		initialize:(opt) ->
			if(opt.selector)
				@selector = $(opt.selector)
			if(opt.template)
				@template = _.template(opt.template)
			if(opt.popover_opt)
				@popover_opt = opt.popover_opt
			if(opt.model)
				@model = new Backbone.Model opt.model
			return

		show:()->
			@selector.popover('show')
			return
		destroy:()->
			@selector.popover('destroy')
			return
		hide:()->
			@selector.popover('hide')
			return			

		render:() ->
			@$el.empty()
			@$el.html @template(@model.attributes)
			@popover_opt['content'] = @$el.html()
			@delegate()
			@selector.popover(@popover_opt)
			return @


	
		Backbone.hovercard = (opt)->
			(new hoverView(opt).render())
	
)(window)