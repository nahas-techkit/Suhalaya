import { ResponsiveLine } from "@nivo/line";
import { Box, Paper, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import { useMemo } from "react";
import { useChart } from './chart'
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ isCustomLineColors = false, tripData = [], isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const chartData = useMemo(() => tripData, [tripData])
  const labels = useMemo(() => tripData.reduce((acc, curr) => {
    curr.data.forEach(d => {
      const dateStr = new Date(d.x).toLocaleDateString();
      if (!acc.includes(dateStr)) {
        acc.push(dateStr);
      }
    });
    return acc;
  }, []), []);
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} INR`;
          }
          return y;
        },
      },
    },
  });

  return (

    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      <ReactApexChart type="line" series={chartData} options={{...chartOptions,tooltip: {
      shared: true,
      intersect: false,
      theme:theme.palette.mode,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} INR`;
          }
          return y;
        },
      },
    },}} height={364} />
    </Box>)
  // return (
  //   <ResponsiveLine
  //     data={chartData||[]}
  //     theme={{
  //       axis: {
  //         domain: {
  //           line: {
  //             stroke: colors.grey[100],
  //           },
  //         },
  //         legend: {
  //           text: {
  //             fill: colors.grey[100],
  //           },
  //         },
  //         ticks: {
  //           line: {
  //             stroke: colors.grey[100],
  //             strokeWidth: 1,
  //           },
  //           text: {
  //             fill: colors.grey[100],
  //           },
  //         },
  //       },
  //       legends: {
  //         text: {
  //           fill: colors.grey[100],
  //         },
  //       },
  //       tooltip: {
  //         container: {
  //           color: colors.primary[500],
  //         },
  //       },
  //     }}
  //     colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
  //     margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
  //     xScale={{ type: "point" }}
  //     yScale={{
  //       type: "linear",
  //       min: "auto",
  //       max: "auto",
  //       stacked: true,
  //       reverse: false,
  //     }}
  //     // yFormat=" >-.2f"
  //     curve="catmullRom"
  //     axisTop={null}
  //     axisRight={null}
  //     axisBottom={{
  //       orient: "bottom",
  //       tickSize: 0,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       legend: isDashboard ? undefined : "transportation", // added
  //       legendOffset: 36,
  //       legendPosition: "middle",
  //     }}
  //     axisLeft={{
  //       orient: "left",
  //       tickValues: 5, // added
  //       tickSize: 3,
  //       tickPadding: 5,
  //       tickRotation: 0,
  //       legend: isDashboard ? undefined : "count", // added
  //       legendOffset: -40,
  //       legendPosition: "middle",
  //     }}
  //     enableGridX={false}
  //     enableGridY={false}
  //     pointSize={8}
  //     pointColor={{ theme: "background" }}
  //     pointBorderWidth={2}
  //     pointBorderColor={{ from: "serieColor" }}
  //     pointLabelYOffset={-12}
  //     useMesh={true}
  //     legends={[
  //       {
  //         anchor: "bottom-right",
  //         direction: "column",
  //         justify: false,
  //         translateX: 100,
  //         translateY: 0,
  //         itemsSpacing: 0,
  //         itemDirection: "left-to-right",
  //         itemWidth: 80,
  //         itemHeight: 20,
  //         itemOpacity: 0.75,
  //         symbolSize: 12,
  //         symbolShape: "circle",
  //         symbolBorderColor: "rgba(0, 0, 0, .5)",
  //         effects: [
  //           {
  //             on: "hover",
  //             style: {
  //               itemBackground: "rgba(0, 0, 0, .03)",
  //               itemOpacity: 1,
  //             },
  //           },
  //         ],
  //       },
  //     ]}
  //     tooltip={ ({ point }) => {
  //       return (
  //         <Paper sx={{p:1}}>
  //           <div>{"Date: "+point.data.xFormatted}</div>
  //           <div>{"Average: ₹"+Math.round(point.data.y)}</div>
  //         </Paper>
  //       );
  //     }
  //     }
  //   />
  // );
};

export default LineChart;
