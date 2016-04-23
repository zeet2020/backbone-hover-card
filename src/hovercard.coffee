


    class hoverView extends Backbone.View

        tagName:'div'
        className:'hovercard'
        defaultopt:{
        loadTimeOut:1000
        popover_opt:{
        placement:'top',
        html:true
        
        }
        }
        registerpopoverevent:()->
            @target.on('show.bs.popover',_.bind(@onshowhandler,@))
            @target.on('shown.bs.popover',_.bind(@aftershowhandler, @))
            @target.on('hide.bs.popover',_.bind(@hidepopoverhandler, @))
            @target.on('hidden.bs.popover',_.bind(@hiddenpopoverhandler, @))
            @target.on('inserted.bs.popover',_.bind(@oninsertedhandler,@))
            return
        oninsertedhandler:()->
            console.log("testing")
            return
        hiddenpopoverhandler:()->
            console.log("hidding")
            @$el.empty()
            delete @model
            return
        hidepopoverhandler:()->
            console.log("Testing")
            return
        onshowhandler:(e)->
            @trigger("onShowEvent",e)
            return
        aftershowhandler:(e)->
            if @data_url
                setTimeout(_.bind(@fetchData,@),@defaultopt.loadTimeOut)
            @trigger("afterShowEvent",e)
            return
        onShow:(callback)->
            @on("onShowEvent",callback)
            return @
        afterShow:(callback)->
            @on("afterShowEvent",callback)
            return @
        fetchData:()->
            $.get(@data_url,(data)=>
                @model = new Backbone.Model(data)
                @$el.html @template(@model.attributes)
            )
        initialize:(opt = {})->
            opt = _.defaults(opt,@defaultopt.popover_opt)
            if(opt.template)
                @template = _.template(opt.template)
            if(opt.popover_opt)
                @popover_opt = opt.popover_opt
            if(opt.data)
                if _.isString(opt.data)
                    @data_url = opt.data
                else    
                    @model = new Backbone.Model(opt.data)
            if(opt.target)
                @target = $(opt.target)
            @render()    
            return @

        show:()->
            @target.popover('show')
            return
        destroy:()->
            @target.popover('destroy')
            return
        hide:()->
            @target.popover('hide')
            return
        

        render:() ->
            @$el.empty()
            @$el.html("loading please wait")
            if @model
                @$el.html @template(@model.attributes)
            @popover_opt['content'] = @$el
            @target.popover(@popover_opt)
            @registerpopoverevent()
            return @





     window.hoverCard = (para={})->
                error = []
                if(!para.template)
                    error.push "template parameter missing" 
                if(!para.popover_opt)
                    error.push "popover parameters missing" 
                if(!para.data)
                    error.push "data parameter missing"
                
                if(!para.target)
                    error.push "target element is required"
                
                if error.length > 0
                    for i in error
                        console.log i
                    return
                    
                return new hoverView(para)    
                