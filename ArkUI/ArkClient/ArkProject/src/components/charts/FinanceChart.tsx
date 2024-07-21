import { faArrowAltCircleDown, faCircle, faDotCircle, faFileLines, faLineChart, faLinesLeaning, faLink, faMapLocation, faMarker, faSquare, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { fa2 } from '@fortawesome/free-solid-svg-icons/fa2';
import { faAnchor } from '@fortawesome/free-solid-svg-icons/faAnchor';
import { faLandmark } from '@fortawesome/free-solid-svg-icons/faLandmark';
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
    let pv = 0;

    for (let i = 0; i < numPoints; i++) {
        uv = Math.abs(uv + (Math.random() - 0.5) * 1000); // Random walk for uv
        pv = Math.abs(pv + (Math.random() - 0.5) * 500);  // Random walk for pv
        data.push({ name: `Aug ${i + 1}`, personal:uv,work: pv });
    }
    return data;
};

const data = generateRandomData(14);

const FinancesChart = () => {

    const renderLegend = (props:any) => {
        const { payload } = props;

        return (
            <ul className='flex justify-center gap-14 absolute top-[-50px] left-1/2'>
                {
                    payload.map((entry:any, index:any) => (
                        <li  key={`item-${index}`} className='flex gap-2'>
                            <span><FontAwesomeIcon icon={faCircle} color={index== 0 ?'#bd90ed':'#90caed'} /></span>
                            <span>{entry.value}</span>
                            </li>
                    ))
                }
            </ul>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={300} className={`relative`}>
            <AreaChart
                data={data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#bd90ed" stopOpacity={0.2} />
                        <stop offset="90%" stopColor="#bd90ed" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#90caed" stopOpacity={0.2}  />
                        <stop offset="90%" stopColor="#90caed" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    vertical={false} // Disable vertical grid lines
                    stroke="#efefef"  // Customize the color of the grid lines
                />
                <XAxis dataKey="name" fontSize={12}
                    axisLine={{ stroke: '#efefef', strokeWidth: 2 }} // Customize axis line
                    tick={{ fill: '#cfcfcf' }}
                    tickSize={0}
                    tickMargin={20}
                // Customize tick color
                />
                <YAxis fontSize={12} axisLine={false} tickSize={0} />
                <Tooltip />
                <Area type="monotone" dataKey="personal"
                    stroke="#bd90ed"
                    strokeWidth={2}
                    fillOpacity={1} fill="url(#colorUv)"
                />
                <Area
                    type="monotone"
                    dataKey="work"
                    stroke="#90caed"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
                <Legend
                content={renderLegend}
                    layout="horizontal" 
                    align="center" 
                    verticalAlign="top" 
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default FinancesChart;
