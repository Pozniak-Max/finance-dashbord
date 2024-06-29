import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { priceFormatter } from "@/utils/index";

const Row1 = () => {
  const { palette } = useTheme();

  const  { data }  = useGetKpisQuery()
  

  const revenue= useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({month, revenue})=> {
        return {
          name: month.substring(0, 3),
          revenue: Number(revenue),
          }
      })
    )
  }, [data])
  
  
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({month, revenue, expenses})=> {
        return {
          name: month.substring(0, 3),
          revenue: Number(revenue),
          expenses: Number(expenses),
        }
      })
    )
  }, [data])

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({month, revenue, expenses})=> {
        return {
          name: month.substring(0, 3),
          revenue: Number(revenue),
          profit: (Number(revenue) - Number(expenses)).toFixed(2),
        }
      })
    )
  }, [data])



  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader 
          title="Revenue and Expenses"
          subtitle="Revenue (top line) vs. Expenses (bottom line)"
          sideText="+4%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>

          </defs>
          <XAxis dataKey="name" tickLine={false} style={{
            fontSize: "10px"
          }}/>
          <YAxis tickFormatter={priceFormatter} tickLine={false} axisLine={{ strokeWidth: "0"}} style={{
            fontSize: "10px"
          }} domain={[8000, 23000]}/>
          <Tooltip formatter={(value) => priceFormatter(value as number)} />
          <Area type="monotone" dataKey="revenue" stroke={palette.primary.main} dot={true} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="expenses" stroke={palette.primary.main} dot={true} fillOpacity={1} fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
      <BoxHeader 
          title="Profit and Revenue"
          subtitle="Revenue (top line) vs. Profit (bottom line)"
          sideText="+4%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={revenueProfit}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
       <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{
            fontSize: "10px"
          }}/>
          <YAxis tickFormatter={priceFormatter} yAxisId="left" tickLine={false} axisLine={false} style={{
            fontSize: "10px"
          }} domain={[8000, 23000]}/>
          <YAxis  tickFormatter={priceFormatter} yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{
            fontSize: "10px"
          }} domain={[8000, 23000]}/>
          <Tooltip formatter={(value) => priceFormatter(value as number)}  />
          <Legend height={20} wrapperStyle={{
            margin: "0 0 10px 0"
          }}/>          
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={palette.primary.main} />

          <Line yAxisId="left" type="monotone" dataKey="profit" stroke={palette.tertiary[500]} />

        </LineChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
      <BoxHeader 
          title="Monthly Revenue"
          subtitle="Graph represents the revenue for each month of the year"
          sideText="+4%"
        />
      <ResponsiveContainer width="100%" height="100%">
      
        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >

          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px"}}/>
          <YAxis tickFormatter={priceFormatter} axisLine={false} tickLine={false} style={{ fontSize: "10px"}}/>
          <Tooltip  formatter={(value) => priceFormatter(value as number)}/>
         
          <Bar dataKey="revenue" fill="url(#colorRevenue)" /> 
        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
