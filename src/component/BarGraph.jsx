import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export const BarGraph = (props) => {
  const [data, setData] = useState([]);
  // Fetch and process data on component mount

  useEffect(() => {
    const stateCount = props.data.reduce((acc, brewery) => {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
      return acc;
    }, {});

    // Format data for Recharts
    const chartData = Object.keys(stateCount).map((state) => ({
      state,
      count: stateCount[state],
    }));

    setData(chartData);
  }, [props.data]);

  return (
    <ResponsiveContainer width={700} height={500}>
      <BarChart
        // width={750}
        // height={425}
        data={data}
        // margin={{ top: 20, right: 30, left: 20, bottom: 5 }} //margins of graph
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <Legend align="center" verticalAlign="bottom" /> */}
        <XAxis dataKey="state">
          <Label value="States" offset={-15} position="insideBottom" />
          <Label
            value="Bewery in each state"
            className="graph-labelling"
            offset={30}
            position="bottom"
          />
        </XAxis>
        <YAxis dataKey={"count"}>
          <Label value="Num of Breweries" angle={-90} />
        </YAxis>
        <Tooltip
          position={{ y: 70 }} // Set y position closer to the bar top
          cursor={{ fill: "transparent", pointer: "pointer" }} // Make cursor transparent
          offset={-10} // Fine-tune tooltip alignment
        />
        <Bar dataKey="count" fill="#8884d8" barSize={40} />
        {/* Control bar width */}
      </BarChart>
    </ResponsiveContainer>
  );
};
