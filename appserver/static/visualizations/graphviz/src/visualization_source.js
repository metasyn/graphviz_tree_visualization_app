/*
 * Visualization source
 */
define([
            'jquery',
            'underscore',
            'vizapi/SplunkVisualizationBase',
            'vizapi/SplunkVisualizationUtils',
            'viz.js',
            'svg-pan-zoom'
        ],
        function(
            $,
            _,
            SplunkVisualizationBase,
            vizUtils,
            graphviz,
            svgPanZoom
        ) {
  
    // Extend from SplunkVisualizationBase
    return SplunkVisualizationBase.extend({
  
        initialize: function() {
            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
            this.$el = $(this.el);
            this.id = _.uniqueId('graphviz');
            this.$el.append('<div id="' + this.id + '" class="splunk-graphviz"></div>') 
            // Initialization logic goes here
        },

        // Optionally implement to format data returned from search. 
        // The returned object will be passed to updateView as 'data'
        formatData: function(data) {

            // Format data 

            return data;
        },
  
        // Implement updateView to render a visualization.
        //  'data' will be the data object returned from formatData or from the search
        //  'config' will be the configuration property object
        updateView: function(data, config) {
            
            container = $('#' + this.id)
            container.empty()

            if (data.rows.length > 0) {
                graph = graphviz(data.rows[0][0])
                container.append(graph)
                svg = container[0].getElementsByTagName('svg')[0]
                svg.id = 'graphsvg'
                svgPanZoom('#graphsvg', {
                    zoomEnabled: true, 
                    controlIconsEnabled: true,
                    fit: 1, center: 1
                })
            }

        },

        // Search data params
        getInitialDataParams: function() {
            return ({
                outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE,
                count: 10000
            });
        },

        // Override to respond to re-sizing events
        reflow: function() {
            //If size changed, redraw.
            if($('#' + this.id).height() !== this.$el.height()) {
                $('#' + this.id).height(this.$el.height())
                this.invalidateUpdateView();
            }

            if($('#' + this.id + ' .svg-container').width() !== this.$el.width()) {
                $('#' + this.id + ' .svg-container').width(this.$el.width())
                this.invalidateUpdateView();
            }
        }
    });
});
