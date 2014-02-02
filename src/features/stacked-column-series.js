/* global d4: false */
(function() {
  'use strict';
  d4.features.stackedColumnSeries = function(name) {
    return {
      accessors: {
        x: function(d) {
          return this.x(d[this.xKey()]);
        },

        y: function(d) {
          var yVal = d.y0 + d.y;
          return  yVal < 0 ? this.y(d.y0) : this.y(yVal);
        },

        width: function() {
          return this.x.rangeBand();
        },

        height: function(d) {
          return Math.abs(this.y(d.y0) - this.y(d.y0 + d.y));
        }
      },
      render: function(scope, data) {
        this.featuresGroup.append('g').attr('class', name);
        var group = this.svg.select('.' + name).selectAll('.group')
          .data(data)
          .enter().append('g')
          .attr('class', function(d,i) {
            return 'series'+ i + ' ' + this.xKey();
          }.bind(this));

        group.selectAll('rect')
          .data(function(d) {
            return d.values;
          }.bind(this))
          .enter().append('rect')
          .attr('class', function(d, i){
            return 'fill item'+ i + ' ' + d[this.yKey()];
          }.bind(this))
          .attr('x', scope.accessors.x.bind(this))
          .attr('y', scope.accessors.y.bind(this))
          .attr('width', scope.accessors.width.bind(this))
          .attr('height', scope.accessors.height.bind(this));
      }
    };
  };
}).call(this);
