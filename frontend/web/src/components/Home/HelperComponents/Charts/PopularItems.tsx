import { CartesianGrid, Bar, BarChart, Legend, XAxis, YAxis } from "recharts";

export default function PopularItems() {
    const items: string[] = ["Introduction to Algorithms", "Calculus Textbook", "CS Tutoring", "MacBook Pro"];
    const views: number[] = [0, 0, 0, 0];
    const sales: number[] = [0, 0, 0, 0];

    const data = items.map((item, i) => ({
        item,
        views: views[i],
        sales: sales[i],
    }));

    return (
        <div className="flex flex-col justify-center items-start w-[48.5%] h-[400px] bg-white p-4 py-8 border border-gray-200 gap-4 rounded-[10px]">
            <div className="flex p-4">
                <h2 className="text-black text-[16px] font-[600]">Popular Items</h2>
            </div>

            <div className="flex justify-center items-center w-[100%]">
                <BarChart width={650} height={300} data={data}  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="item"
                        interval="preserveStartEnd"
                        angle={-15}
                        textAnchor="end"
                        tick={{ fontSize: 10 }}
                    />
                    <YAxis ticks={[0, 60, 120, 180, 240]} tick={{ fontSize: 12 }} />
                    <Legend/>
                    <Bar dataKey="sales" fill="blue" />
                    <Bar dataKey="views" fill="green" />
                </BarChart>
            </div>
        </div>
    );
}
