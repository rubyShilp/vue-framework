import echarts from "@/util/echarts.js";
export default (el, options) => {
  const chartInstance = echarts.init(el);
  var option = {
    title: {
      text: "堆叠区域图",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["2012", "2013", "2014", "2015", "2016"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Forest",
        type: "bar",
        data: [320, 332, 301, 334, 390],
      },
      {
        name: "Steppe",
        type: "bar",
        data: [220, 182, 191, 234, 290],
      },
      {
        name: "Desert",
        type: "bar",
        data: [150, 232, 201, 154, 190],
      },
      {
        name: "Wetland",
        type: "bar",
        data: [98, 77, 101, 99, 40],
      },
    ],
  };
  chartInstance.setOption(option);
  return chartInstance;
};
