import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts";

export default function SalesTrend() {
    const months: string[] = ["JAN", "FEB", "MAR", "APR", "MAY"];
    const revenue: number[] = [0, 0, 0, 0, 0];
    const salesMoney: number[] = [0, 0, 0, 0, 0];

    const data = months.map((month, i) => ({
        month,
        revenue: revenue[i],
        sales: salesMoney[i],
    }));

    return (
        <div className="flex flex-col justify-center items-start w-[48.5%] h-[400px] bg-white p-4 py-8 border border-gray-200 gap-4 rounded-[10px]">
            <div className="flex p-4">
                <h2 className="text-black text-[16px] font-[600]">Sales Trend</h2>
            </div>

            <div className="flex justify-center items-center w-[100%]">
                <LineChart width={650} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 14 }} />
                    <YAxis ticks={[0, 500, 1000, 1500, 2000]} tick={{ fontSize: 12 }} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                </LineChart>
            </div>
        </div>
    );
}
