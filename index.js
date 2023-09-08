const { createApp, ref } = Vue;

const app = createApp({
  data() {
    return {
      num: 21,
      startDate: new Date(),
      dataArr: [],
      weekday: "周一,周二,周三,周四,周五,周六,周天".split(","),
      isSetted: false,
      print: true,
    };
  },
  methods: {
    startPrint() {
      this.print = false;
      setTimeout(() => {
        window.print();
      }, 1000);
    },
    createArr(start, span) {
      const dataArr = [];
      let temLoop = [];
      let copyStart = dayjs(start) || dayjs();
      let i = span || 21;
      let preStart = copyStart.day() - 1 > 0 ? copyStart.day() - 1 : 6;
      while (preStart > 0) {
        temLoop.push({ str: "", index: "" });
        preStart--;
      }
      let currday = dayjs(copyStart);
      while (i > 0) {
        const showStr = currday.month() + 1 + "月" + currday.date() + "日";
        temLoop.push({ str: showStr, index: (span || 21) - i + 1 });
        if (temLoop.length === 7) {
          dataArr.push(temLoop.slice());
          temLoop = [];
        }
        currday = currday.add(1, "day");
        i--;
      }
      let backLen = 7 - temLoop.length;
      while (backLen > 0 && backLen < 7) {
        temLoop.push({ str: "", index: "" });
        backLen--;
      }
      dataArr.push(temLoop);
      return dataArr;
    },
    getMyCalendar() {
      if (!this.num || !this.startDate) {
        return;
      }
      this.dataArr = this.createArr(this.startDate, this.num);
    },
  },
  mounted() {
    this.dataArr = this.createArr();
  },
});
app.use(ElementPlus);
app.mount("#app");
