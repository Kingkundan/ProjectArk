import { 
    faArrowAltCircleDown, 
    faDotCircle, 
    faFileLines, 
    faLineChart, 
    faLinesLeaning, 
    faLink, 
    faMapLocation, 
    faMarker, 
    faSquare, 
    faXmarkCircle, 
    faAnchor, 
    faLandmark 
} from '@fortawesome/free-solid-svg-icons';
import { fa2 } from '@fortawesome/free-solid-svg-icons/fa2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const generateRandomData = (numPoints: number) => {
    const data = [];
    let uv = 0;

    for (let i = 0; i < numPoints; i++) {
        uv = Math.abs(uv + (Math.random() - 0.5) * 1000); // Random walk for uv
        data.push({ name: `Aug ${i + 1}`, personal: uv });
    }
    return data;
};

type colors ={
    strokeColor:string,

}

const ChartBlock1 = ({strokeColor='#bd90ed'}:colors) => {
    const data = generateRandomData(14);
    

    return (
        <ResponsiveContainer width="100%" height={50}>
            <AreaChart
                data={data}
                margin={{
                    top: 10, right: 0, left: 0, bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id={`color${strokeColor}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor={strokeColor} stopOpacity={0.2} />
                        <stop offset="90%" stopColor={strokeColor} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area 
                    type="monotone" 
                    dataKey="personal"
                    stroke={strokeColor}
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill={`url(#color${strokeColor})`}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ChartBlock1;
