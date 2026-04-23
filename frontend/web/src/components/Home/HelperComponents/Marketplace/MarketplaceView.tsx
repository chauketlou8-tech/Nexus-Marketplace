import { BookOpen, Package } from "lucide-react"
import { useState } from "react";

export default function MarketplaceView() {

    const [activeTab, setActiveTab] = useState<string>("textbooks");
    const [course, setCourse] = useState<string>("All Courses");
    const [category, setCategory] = useState<string>("All Categories");
    const [sort, setSort] = useState<string>("recently listed");

    console.log(course, sort, category);

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            <div className="flex justify-center items-center w-fit gap-2 bg-gray-200 px-1 rounded-[20px] min-w-[600px] h-[42px]">
                <span onClick={() => setActiveTab?.("textbooks")} className={`flex justify-center items-center gap-2 px-4 py-1.5 rounded-[16px] w-[100%] transition-[.25s] ${activeTab === "textbooks" ? "bg-white" : ""}`}>
                    <BookOpen className="w-[16px] h-[16px]"/>
                    Textbooks
                </span>
                <span onClick={() => setActiveTab?.("items")} className={`flex justify-center items-center gap-2 px-4 py-1.5 rounded-[16px] w-[100%] transition-[.25s] ${activeTab === "items" ? "bg-white" : ""}`}>
                    <Package className="w-[16px] h-[16px]"/>
                    Items
                </span>
            </div>

            <div className="flex justify-between items-center w-full p-4">
                {activeTab === "textbooks" ?

                    <div className="flex justify-between items-center w-full p-4">
                        <div>
                            <h2 className="text-black text-[22px] font-bold">Course Textbooks</h2>
                            <p className="text-[#999]">0 textbooks available</p>
                        </div>

                        <div className="flex items-center justify-end p-4 gap-2">
                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Course filter</h3>
                                <select onChange={(e) => setCourse?.(e.target.value)} name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[150px] outline-0">
                                    <option value="All Courses">All Courses</option>
                                    <option value="BIO1004F">BIO1004F</option>
                                </select>
                            </div>

                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Sort By</h3>
                                <select onChange={(e) => setSort?.(e.target.value)} name="sort" id="sort" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] w-[150px] font-[500] outline-0">
                                    <option value="recently listed">Recently Listed</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="discount">Best Discount</option>
                                    <option value="sellers">Top Sellers</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex justify-between items-center w-full p-4">
                        <div>
                            <h2 className="text-black text-[22px] font-bold">Student Items</h2>
                            <p className="text-[#999]">0 items available</p>
                        </div>

                        <div className="flex items-center justify-end p-4 gap-2">
                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Category</h3>
                                <select onChange={(e) => setCategory?.(e.target.value)} name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[150px] outline-0">
                                    <option value="All Courses">All Categories</option>
                                    <option value="BIO1004F">Electronics</option>
                                </select>
                            </div>

                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Sort By</h3>
                                <select onChange={(e) => setSort?.(e.target.value)} name="sort" id="sort" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] w-[150px] font-[500] outline-0">
                                    <option value="recently listed">Recently Listed</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="sellers">Top Sellers</option>
                                </select>
                            </div>
                        </div>
                    </div>
                }

            </div>

            <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
                <Package className="w-10 h-10 text-gray-400" />
                <p className="text-sm">No products available</p>
            </div>
        </div>
    )
}