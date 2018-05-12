module.exports = {
  headlines: {
    code: 200,
    list: [
      {
        id: 1,
        img: 'static/images/one.png'
      },
      {
        id: 2,
        img: 'static/images/two.png'
      },
      {
        id: 5,
        img: 'static/images/five.png'
      }
    ]
  },
  news: {
    code: 200,
    total: 2,
    list: [
      {
        "newsid":1,
        "newstitle": "新闻主题",
        "belongscategory": 0,
        "createdate": "2018-02-25 00:00:00"
      },
      {
        "newsid":2,
        "newstitle": "新闻主题",
        "belongscategory": 1,
        "createdate": "2018-02-25 00:00:00"
      }
    ]
  },
  events: {
    code: 200,
    list: [
      {
        date: '2018/2/15',
        title: '准备合同',
        desc: '需要在张总3月1日出国前准备好'
      },
      {
        date: '2018/2/12',
        title: '找郑总确认金额'
      }
    ]
  }
}
