// pages/personMessage/personMessage.js
const optionsAge = [
    {
        text: '7',
        value: '330007',
    },
    {
        text: '8',
        value: '330008',
    },
    {
        text: '9',
        value: '330009',
    },
    {
        text: '10',
        value: '330010',
    },
];

const optionsAnimal = [];
let value = 330020;

for (let i = 0; i < 12; i++) {
    let animal = {};
    animal.text = ['子鼠', '丑牛', '寅虎', '卯兔', '辰龙', '巳蛇', '午马', '未羊', '申猴', '酉鸡', '戌狗', '亥猪'][i];
    animal.value = value + i;
    optionsAnimal.push(animal);
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fileList: [],
        isFormOpen: false,
        pname: '',
        age: '',
        email: '',
        phone: '',
        address: '',
        school: '',
        animal: '',
        birthday: '',
        username: '',
        nickname: '',
        picture: '',
        cascaderValue1: '',
        cascaderValue2: '',
        optionsAge,
        optionsAnimal,
        pictureShow: false,
    },
    showForm() {
        this.setData({ show: true, });
        this.setData({ show: true, });
    },
    upload(event) {
        var that = this;
        console.log("===", event);
        const { file } = event.detail;
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        wx.uploadFile({
            url: "http://127.0.0.1:8888/upload/mypicture",
            filePath: file.url,
            name: "photo",
            formData: { token: token, },
            method: "POST",
            header: {
                "Content-Type": "multipart/form-data",
            }, // 设置请求的 header
            // formData: {}, // HTTP 请求中其他额外的 form data
            success: function (res) {
                console.log('===头像上传成功',)
                that.setData({ pictureShow: true });
                that.getUserinfo();
            },

        });
    },
    save() {
        console.log('===login  cookie', wx.getStorageSync('cookie').split('token=')[1]);
        console.log('===', this.data)
        var that = this
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        wx.request({
            url: "http://127.0.0.1:8888/update/userinfo",
            data: { token: token, name: this.data.pname, age: this.data.age, email: this.data.email, phone: this.data.phone, address: this.data.address, school: this.data.school, animal: this.data.animal, birthday: this.data.birthday, username: this.data.username, nickname: this.data.nickname },
            method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
            }, // 设置请求的 header
            success: function (res) {
                if (res['data']['code'] === 4000) {
                    console.log("===res", res['data']['code'])

                    Notify({
                        message: res['data']['message'],
                        type: 'danger'
                    });
                } else if (res['data']['code'] === 200) {
                    that.setData({ show: false, });
                }
            },
        });
    },
    cancel() {
        this.setData({ show: false, });
    },
    changePicture() {
        this.setData({ pictureShow: false, });
    },
    onClickage() {
        this.setData({ show2: true, });
    },
    onCloseage() {
        this.setData({ show2: false });
    },
    onClickanimal() {
        this.setData({ show3: true, });
    },
    onCloseanimal(e) {
        console.log('===', e)
        this.setData({ show3: false });
    },

    onFinish(e) {
        if (e.detail.value >= 330020) {
            console.log('===', typeof e.detail.value)
            const { selectedOptions, value } = e.detail;
            const animal = selectedOptions
                .map((option) => option.text || option.name)
                .join('/');
            this.setData({
                animal,
                cascaderValue2: value,
            })
            this.setData({ show3: false });
        } else if (330000 < e.detail.value < 330020) {
            console.log('===', typeof e.detail.value)
            const { selectedOptions, value } = e.detail;
            const age = selectedOptions
                .map((option) => option.text || option.name)
                .join('/');
            this.setData({
                age,
                cascaderValue1: value,
            })
            this.setData({ show2: false });
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    getUserinfo() {
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        var that = this;
        wx.request({
            url: "http://127.0.0.1:8888/cuser/info?token=" + token,
            method: "GET",
            success: function (res) {
                console.log('===用户信息', res)
                var userInfo = res['data'][0]
                const app = getApp()
                app.globalData.userInfo = res['data'][0]
                console.log('===', userInfo)
                that.setData({ pname: userInfo['name'] })
                that.setData({ age: userInfo['age'] })
                that.setData({ picture: "http://127.0.0.1:8888/" + userInfo['picture'] })
            },
        });
    },
    onLoad() {
        this.getUserinfo();
        const app = getApp()
        var userInfo = app.globalData.userInfo
        console.log('===', userInfo)
        this.setData({ pname: userInfo['name'] })
        this.setData({ age: userInfo['age'] })
        this.setData({ email: userInfo['email'] })
        this.setData({ phone: userInfo['phone'] })
        this.setData({ address: userInfo['address'] })
        this.setData({ school: userInfo['school'] })
        this.setData({ animal: userInfo['animal'] })
        this.setData({ birthday: userInfo['birthday'] })
        this.setData({ username: userInfo['username'] })
        this.setData({ nickname: userInfo['nickname'] })
        this.setData({ picture: "http://127.0.0.1:8888/" + userInfo['picture'] })
        if (userInfo['picture'] != '') {
            console.log('===', this.data.picture)
            this.setData({ pictureShow: true, });
        }
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