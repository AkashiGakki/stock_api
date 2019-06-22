(function () {
    let stock_name;
    $(document).ready(function () {
        $('.btn').click(function () {
            console.log(($(this)[0].dataset.name));
            $('#container').fadeToggle();
            // $('#container').slideDown();
            stock_name = ($(this)[0].dataset.name);
        })
    });

    $(document).ready(function() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var chart;
        $('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // 当期时间
                                //转换为数值类型
                                y;
                            // y = parseFloat(ydata);
                            // console.log(y);
                            $.ajax({
                                type: 'get',
                                async: false,
                                cache: false,
                                dataType: 'json',
                                url: 'http://ec2-18-225-32-202.us-east-2.compute.amazonaws.com/stock?123&&token=14b1eddd4985fa1361684bb9018434bc&&stock_name= ' + stock_name + '&&user=xnmd',
                                success:function (res) {
                                    y = parseFloat(res.current_price);
                                    series.addPoint([x, y], true, true);
                                    // console.log(res);
                                }
                            });
                            // series.addPoint([x, y], true, true);

                        }, 2000);
                    }
                }
            },
            credits: {
                enabled:false
            },

            title: {
                text: '当前价格走势'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: '价格'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },

            series: [{
                name: '当前价格',
                lineWidth: 1,
                data: (function() {
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + i * 1000,
                            y: 0
                        });
                    }
                    return data;
                })()
            }]
        });
    });

})();
