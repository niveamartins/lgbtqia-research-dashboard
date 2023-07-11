
'use client';


import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart(props) {
    const forceUpdate = useForceUpdate();
  const [dataset, setDataset] = useState(props.dataset)
  const [id, setId] = useState(props.id)

  useEffect(() => {
    forceUpdate()
  }, [dataset])
  return (
    <Pie datasetIdKey={id} updateMode='normal' redraw data={dataset} />      
  )
}
