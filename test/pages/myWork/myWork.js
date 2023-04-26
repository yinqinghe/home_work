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
    },

    done() {
        const app = getApp()
        var list_items = app.globalData.list_items
        var arr = []
        console.log('===', list_items)
        for (var i in list_items) {
            for (var ii in list_items[i]) {
                // console.log('===', list_items[i][ii])
                if (list_items[i][ii].rate != null) {
                    console.log('===list_items[i][ii].rate', list_items[i][ii].rate)
                    arr.push(list_items[i][ii].rate)
                }
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 初始化图表组件
        this.done()
        this.lazyComponent = this.selectComponent('#mychart');
        this.lazyComponent.init((canvas, width, height, dpr) => {
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