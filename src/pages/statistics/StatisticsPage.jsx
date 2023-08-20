import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useUsersContext } from '../../context/usersContext';
import styles from './statistics.module.css';

function StatisticsPage() {
  const { usersData } = useUsersContext();
  const [ stats, setStats ] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];

  useEffect(()=>{
    const newStats = [];
     usersData.map(({country})=>{
      const currIndex = newStats.findIndex((obj => obj.country == country));
      if(currIndex === -1) {
        newStats.push({
          "country": country,
          "users": 1
        });
      }
      else {
        newStats[currIndex].users = newStats[currIndex].users + 1;
      }
    });
    setStats(newStats)
  }, [usersData]);


  const CustomTooltip = ({ active, payload }) => {
    if (active) {
       return (
       <div
          className="custom-tooltip"
          style={{
             backgroundColor: "#ffff",
             color: "#000",
             padding: "5px",
             border: "1px solid #cccc"
          }}>
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
       </div>
    );
 }
 return null;
};

  return <div className={styles.pageRoot}>
    <PieChart width={730} height={300}>
      <Pie
         data={stats}
         color="#000000"
         dataKey="users"
         nameKey="country"
         cx="50%"
         cy="50%"
         outerRadius={120}
         fill="#8884d8"
      >
      {stats.map((entry, index) => (
        <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
        />
      ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      </PieChart>
  </div>;
}

export default StatisticsPage;
