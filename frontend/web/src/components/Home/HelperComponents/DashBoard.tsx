import { DollarSign, ShoppingCart, Package, Eye, TrendingUp, Lightbulb } from "lucide-react";
import SalesTrend from "./Charts/SalesTrend.tsx";
import PopularItems from "./Charts/PopularItems.tsx";

export default function Dashboard(){
    return (
        <div className="flex flex-col items-center justify-start w-full p-4">
            <div className="flex flex-col items-start justify-start w-full p-4">
                <h2 className="text-black text-[30px] font-[600]">Seller Dashboard</h2>
                <p className="text-[#333] text-[14px]">Track your performance and optimize your listings</p>
            </div>

            <div className="flex justify-between items-start w-full p-4">
                <div className="flex flex-col items-start justify-start gap-8 border border-gray-300 rounded-[10px] p-6 w-fit min-w-[300px] bg-white">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-black font-[500] text-[14px]">Total Revenue</h3>
                        <DollarSign className="w-[18px] h-[18px] text-green-600" />
                    </div>

                    <div className="flex flex-col items-start justify-start w-full">
                        <h2 className="text-black font-[600] text-[25px]">R0</h2>
                        <p className="text-[#333] text-[12px]"><span>0%</span> from last month</p>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-start gap-8 border border-gray-300 rounded-[10px] p-6 w-fit min-w-[300px] bg-white">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-black font-[500] text-[14px]">Total Sales</h3>
                        <ShoppingCart className="w-[18px] h-[18px] text-blue-600"/>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full">
                        <h2 className="text-black font-[600] text-[25px]">0</h2>
                        <p className="text-[#333] text-[12px]"><span>0%</span> from last month</p>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-start gap-8 border border-gray-300 rounded-[10px] p-6 w-fit min-w-[300px] bg-white">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-black font-[500] text-[14px]">Active Listings</h3>
                        <Package className="w-[18px] h-[18px] text-purple-600"/>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full">
                        <h2 className="text-black font-[600] text-[25px]">0</h2>
                        <p className="text-[#333] text-[12px]">Items currently listed</p>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-start gap-8 border border-gray-300 rounded-[10px] p-6 w-fit min-w-[300px] bg-white">
                    <div className="flex items-center justify-between w-full">
                        <h3 className="text-black font-[500] text-[14px]">Views This Week</h3>
                        <Eye className="w-[18px] h-[18px] text-orange-600"/>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full">
                        <h2 className="text-black font-[600] text-[25px]">0</h2>
                        <p className="text-[#333] text-[12px]"><span>0%</span> from last week</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 w-full">
                <SalesTrend/>
                <PopularItems />
            </div>

            <div className="flex items-center justify-between w-full p-4 gap-2">
                <div className="flex flex-col items-start justify-start w-[50%] border border-gray-300 rounded-[10px] p-6 h-[350px] bg-white">
                    <span className="flex items-center justify-start w-full gap-2">
                        <TrendingUp className="w-[20px] h-[20px] text-blue-700"/>
                        <h2 className="text-black font-[600] text-[20px]">Optimal Price Range</h2>
                    </span>

                    <div className="flex flex-col items-center justify-center w-full p-10 h-[100px]">
                        <span className="text-blue-600 font-[600] text-[30px]">R300-R600</span>
                        <p className="text-[#333] text-[14px]">Items priced in this range sell 2.3x faster on campus</p>
                    </div>

                    <hr className="border-gray-300 w-full p-4 pb-1" />
                    <div className="flex justify-start items-center w-full gap-2">
                        <span className="text-[12px] bg-blue-100 text-blue-700 font-[600] px-2 p-1 rounded-[10px]">Fast-selling range</span>
                        <span className="text-[12px] bg-green-100 text-green-700 font-[600] px-2 p-1 rounded-[10px]">Based on 23 sales</span>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-start w-[50%] border border-gray-300 rounded-[10px] gap-14 p-6 h-[350px] bg-white">
                    <span className="flex items-center justify-start w-full gap-2">
                        <Lightbulb className="w-[20px] h-[20px] text-yellow-600"/>
                        <h2 className="text-black font-[600] text-[20px]">Smart Insights</h2>
                    </span>

                    <div className="flex flex-col items-center justify-start w-full gap-4">
                        <div className="flex justify-start items-center w-full gap-2 bg-amber-50 px-4 py-2 border border-amber-500 rounded-[5px]">
                            <span className="flex justify-center items-center bg-amber-600 text-white text-[15px] font-[600] w-[25px] h-[25px] rounded-[50%]">1</span>
                            <p className="text-[#333] text-[12px]">Textbooks peak during start of semester</p>
                        </div>

                        <div className="flex justify-start items-center w-full gap-2 bg-amber-50 px-4 py-2 border border-amber-500 rounded-[5px]">
                            <span className="flex justify-center items-center bg-amber-600 text-white text-[15px] font-[600] w-[25px] h-[25px] rounded-[50%]">2</span>
                            <p className="text-[#333] text-[12px]">Electronics sell faster on Lower Campus</p>
                        </div>

                        <div className="flex justify-start items-center w-full gap-2 bg-amber-50 px-4 py-2 border border-amber-500 rounded-[5px]">
                            <span className="flex justify-center items-center bg-amber-600 text-white text-[15px] font-[600] w-[25px] h-[25px] rounded-[50%]">3</span>
                            <p className="text-[#333] text-[12px]">Tutoring services most requested before exams</p>
                        </div>

                        <div className="flex justify-start items-center w-full gap-2 bg-amber-50 px-4 py-2 border border-amber-500 rounded-[5px]">
                            <span className="flex justify-center items-center bg-amber-600 text-white text-[15px] font-[600] w-[25px] h-[25px] rounded-[50%]">4</span>
                            <p className="text-[#333] text-[12px]">Best selling time: Sunday evenings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}