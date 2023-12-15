// pages/myWork/myWork.js
import * as echarts from "../../components/echarts/echarts.js"

function initChart(canvas, width, height, dpr, option) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    });
    canvas.setChart(chart);

    chart.setOption(option);
    return chart;
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        option: {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '-1%',
                left: 'center',
                selectedMode: false
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: true,
                    startAngle: 180,
                    label: {
                        show: true,
                        formatter(param) {
                            // correct the percentage
                            return param.name + ' (' + param.percent + '%)';
                        }
                    },
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        { value: 1, name: '一星' },
                        { value: 1, name: '二星' },
                        { value: 1, name: '三星' },
                        { value: 1, name: '四星' },
                        { value: 2, name: '五星' }
                    ]
                }
            ]
        },
        option1: {
            legend: {
                top: 'top'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [20, 100],
                    center: ['50%', '65%'],
                    roseType: 'area',
                    label: {
                        show: true,
                        formatter(param) {
                            return param.name + ' (' + param.percent + '%)';
                        }
                    },
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: [{ value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    ]
                }
            ]
        },
        option2: {
            title: {
                text: '用户发布作品媒体类型比例分析',
                subtext: 'User Data',
                right: 'right'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    label: {
                        show: true,
                        formatter(param) {
                            return param.name + ' (' + param.percent + '%)';
                        }
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
    },

    done() {
        const app = getApp()
        var list_items = app.globalData.list_items
        var arr = []
        console.log('===', list_items)
        for (var i in list_items) {
            // console.log('===', list_items[i][ii])
            if (list_items[i].rate != null) {
                console.log('===list_items[i].rate', list_items[i].rate)
                arr.push(list_items[i].rate)
            }
        }
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;

        for (let i = 0; i < arr.length; i++) {
            var num = arr[i];
            if (num >= 1 && num < 2) {
                one++;
            } else if (num >= 2 && num < 3) {
                two++;
            } else if (num >= 3 && num < 4) {
                three++;
            } else if (num >= 4 && num < 5) {
                four++;
            } else if (num >= 5) {
                five++;
            }
        }
        console.log('===arr', arr)
        console.log('===', one, two, three, four, five)
        var data = [
            { value: one, name: '一星' },
            { value: two, name: '二星' },
            { value: three, name: '三星' },
            { value: four, name: '四星' },
            { value: five, name: '五星' }
        ]
        var option = this.data.option
        option.series[0].data = data
        console.log('===', this.data.option.series[0].data)
        this.setData({ option: option })
    },

    done2() {
        let image = 0;
        let text = 0;
        let video = 0;
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        var that = this;
        var cate = []
        wx.request({
            url: "http://127.0.0.1:8888/my/type/stat?token=" + token,
            method: "GET",
            success: function (res) {
                // console.log('===res', res)
                image = res['data']['data']['image']
                text = res['data']['data']['text']
                video = res['data']['data']['video']
                console.log('===', res['data']['data']['cate'])
                for (var i in res['data']['data']['cate']) {
                    cate.push({ value: res['data']['data']['cate'][i], name: i })
                    console.log('===cate', cate)
                }
                var option1 = that.data.option1
                option1.series[0].data = cate
                that.setData({ option1: option1 })
                var data = [
                    { value: image, name: '图像作品' },
                    { value: text, name: '文本作品' },
                    { value: video, name: '视频作品' },
                ]
                console.log('===data', data)
                var option = that.data.option2
                option.series[0].data = data
                that.setData({ option2: option })

            },
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 初始化图表组件
        this.done()
        this.done2()
        this.lazyComponent1 = this.selectComponent('#mychart');
        this.lazyComponent1.init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr
            });
            canvas.setChart(chart);
            this.lazyChart = chart;
            var option = this.data.option
            chart.setOption(option);
            return chart;
        });
        var op = this.done2();
        this.lazyComponent2 = this.selectComponent('#mychart2');
        this.lazyComponent2.init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr
            });
            canvas.setChart(chart);

            this.lazyChart = chart;
            var option2 = this.data.option2
            chart.setOption(option2);

            return chart;
        });
        this.lazyComponent3 = this.selectComponent('#mychart1');
        this.lazyComponent3.init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr
            });
            canvas.setChart(chart);
            this.lazyChart = chart;
            var option1 = this.data.option1
            chart.setOption(option1);
            return chart;
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})