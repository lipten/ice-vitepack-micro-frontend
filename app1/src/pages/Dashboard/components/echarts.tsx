import React from 'react';
import { useMount } from 'ahooks';
import * as echarts from 'echarts/core';
import type { GridComponentOption } from 'echarts/components';
import { GridComponent } from 'echarts/components';
import type { LineSeriesOption } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>;

export default () => {
  useMount(() => {
    const chartDom = document.getElementById('line-charts')!;
    const myChart = echarts.init(chartDom);
    let option: EChartsOption = {};

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };

    option && myChart.setOption(option);
  });
  return <div id="line-charts" style={{ width: 800, height: 600 }} />;
};
