import { Sparkles, Zap, Brain, MessageCircle, BookOpen, Briefcase, Package, Star } from "lucide-react"
import type { setBool } from "../../../shared/types.ts";

interface recommendationsProps {
    dismissed: boolean;
    setDismissed: setBool;
}

export default function RecommendationsPage({ dismissed, setDismissed }: recommendationsProps) {

    const topListings = [
        {
            _id: "69f28af3a44dbbe5c29c93d7",
            type: "textbook",
            title: "Intro to advanced linear algebra",
            description: "mathematics textbook talking about the vastness of linear systems",
            price: 500,
            sellerId: 6,
            categoryId: "69fe4822d93a2c0d21e7ffcd",
            condition: "new",
            images: [
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
            ],
            tags: [
                "maths",
                "linear algebra"
            ],
            status: "active",
            createdAt: "2026-04-29T22:49:23.387+00:00",
            updatedAt: "2026-04-29T22:49:23.387+00:00",
            courseIds: [
                "69fe46dea64770d2ccdd839b"
            ]
        },
        {
            _id: "69fe46dea64770d2ccdd839b",
            type: "item",
            title: "TI-84 Plus Scientific Calculator",
            description: "Texas Instruments TI-84 Plus graphing calculator, perfect for MAM1000W",
            price: 350,
            sellerId: 7,
            categoryId: "69fe4822d93a2c0d21e7ffce",
            condition: "used",
            images: ["https://images.unsplash.com/photo-1611532736597-de2d4265fba3"],
            tags: ["calculator", "ti-84", "mathematics", "statistics"],
            status: "active",
            courseIds: [],
            createdAt: "2026-05-08T20:26:06.169+00:00",
            updatedAt: "2026-05-08T20:26:06.169+00:00"
        },
        {
            _id: "69f91f3352a30f2889c8ad6d",
            type: "service",
            serviceType: "Tutoring",
            title: "MAM2011 Tutoring",
            description: "Linear Algebra tutoring service",
            providerId: 6,
            categoryId: "69fe4822d93a2c0d21e7ffcf",
            courses: [],
            skills: [],
            availability: "weekends",
            pricing: {
                amount: 150
            },
            images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b"],
            createdAt: "2026-05-04T22:35:31.553+00:00",
            updatedAt: "2026-05-04T22:35:31.553+00:00"
        }
    ];

    const types = {
        service: (
            <span className="flex justify-center items-center gap-1">
                <Briefcase size={12} />
                <p className="text-[10px] font-[600] uppercase">Service</p>
            </span>
        ),
        textbook: (
            <span className="flex items-center gap-1">
              <BookOpen size={12} />
              <p className="text-[10px] font-[600] uppercase">Textbook</p>
            </span>
        ),
        item: (
            <span className="flex items-center gap-1">
              <Package size={12} />
              <p className="text-[10px] font-[600] uppercase">Item</p>
             </span>
        )
    };

    const colors = {
        service: "cyan",
        textbook: "orange",
        item: "blue"
    }

    return (
        <div className="w-full">
            {
                !dismissed &&
                <div className="flex flex-col justify-center items-center w-full p-4 gap-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex justify-start items-center w-full gap-4">
                            <span className="flex justify-center items-center w-[40px] h-[40px] rounded-[50%] relative border border-amber-400/25">
                                <span></span>
                                <Sparkles width={18} height={18} className="text-amber-400" />
                                <span className="absolute w-full h-full rounded-[50%] bg-gray-700/10 border-amber-400/20"></span>
                                <span className="absolute w-full h-full rounded-[50%] bg-linear-to-br from-0% from-amber-300/10 via-20% via-amber-200/5 to-amber-100/5"></span>
                            </span>

                            <div className="flex flex-col items-start justify-center w-full gap-0">
                                <h2 className="text-white font-[600] text-[20px]">Smart Picks</h2>
                                <p className="text-[#999] text-[12px]">Personalised for your courses · CSC, MAM</p>
                            </div>
                        </div>
                        <span onClick={() => setDismissed(true)} className="text-[14px] font-[600] cursor-pointer">Dismiss</span>
                    </div>

                    <div className="flex justify-center items-center w-full gap-4">
                        <div className="flex flex-col items-center justify-start text-gray-500 gap-2 border border-gray-300/20 h-[500px] w-[40%] relative overflow-hidden rounded-[10px]" style={{ background: 'linear-gradient(160deg, #0d1017 0%, #080a10 100%)' }}>
                            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-[0.12] group-hover:opacity-[0.18] transition-opacity duration-500" alt=""/>
                            <div className="absolute inset-0 bg-black/70"/>
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, #ffb84d33, transparent 70%)` }} />

                            <div className="relative z-10 flex flex-col w-full h-full  p-6 rounded-[10px]">
                                <div className="flex flex-col justify-start items-start w-full gap-6">
                                    <div className="flex justify-start items-center w-full gap-4">
                                        <span className="flex justify-start items-center w-fit px-3 py-1 gap-1 text-[#ffb84d] bg-amber-400/10 border border-amber-400/20 text-[12px] rounded-[2rem] font-[600] uppercase">
                                            <Zap width={15} height={15} />
                                            Top pick
                                        </span>

                                        <span></span>
                                    </div>

                                    <div className="flex flex-col justify-start items-start w-full gap-2">
                                        <div className="flex flex-col justify-start items-start w-full gap-1">
                                            <div className="flex justify-between items-center w-full gap-4">
                                                <p className="uppercase font-bold text-[12px]">AI confidence</p>
                                                <span>92%</span>
                                            </div>

                                            <div className="flex flex-col justify-start items-start w-full gap-2">
                                                <div className="flex justify-start items-center w-full h-[6px] gap-4 bg-gray-100/15 rounded-[2rem]">
                                                    <div className={`flex justify-start items-center h-[6px] gap-4 bg-linear-to-r from-amber-300 via-orange-600 to-orange-400 rounded-[2rem]`}></div>
                                                </div>

                                                <span className="bg-amber-400/10 text-[#ffb84d] text-[10px] px-3 py-1 rounded-[1.5rem]">CSC2001F</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-start items-start w-full gap-2">
                                            <h2 className="text-white font-[600] text-[22px]">Introduction to Algorithms</h2>
                                            <span className="flex justify-start items-center w-full gap-2 text-[14px] bg-amber-400/5 text-[#ffb84d] p-4 rounded-[8px] border border-amber-300/10"><Brain width={16} height={16}/> Based on your CS course</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end w-full gap-4 flex-1">
                                    <h3 className="text-[35px] font-[600] text-amber-400/90">R450</h3>
                                    <span className="flex justify-center items-center gap-2 text-black bg-amber-300 px-4 py-2 rounded-[10px] font-[600] cursor-pointer"><MessageCircle width={16} height={16}/> Contact</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col h-[500px] w-[60%]">
                            <div className="flex flex-col flex-1 gap-6">
                                {
                                    topListings.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start w-full gap-4 bg-gray-400/5 pr-4 rounded-[12px]">
                                            <div className="flex justify-start items-center w-[40%] gap-2">
                                                <img src={item.images[0]} alt={item.type} className="object-cover w-[180px] h-[120px] rounded-l-[12px]" />
                                            </div>

                                            <div className="flex flex-col items-start justify-start w-full py-4 gap-1">
                                                <div style={{color: colors[item.type]}}>
                                                    {types[item.type]}
                                                </div>

                                                <div className="text-white font-[600] text-[14px]">
                                                    <h2>{item.title}</h2>
                                                </div>

                                                <div>
                                                    {/*comment*/}
                                                </div>

                                                <div className="w-full">
                                                    <div className="flex justify-start items-center w-full h-[2px] gap-4 bg-gray-100/15 rounded-[2rem]">
                                                        <div className="flex justify-start items-center w-full h-[2px] gap-4 rounded-[2rem]" style={{background: colors[item.type]}}></div>
                                                    </div>
                                                    <span>{/*ai confidence level*/}</span>
                                                </div>
                                            </div>

                                            <div className="h-full w-[1px] bg-gray-500 opacity-[0.2]"></div>

                                            <div className="flex flex-col justify-center items-center h-full gap-1">
                                                <span className="text-[18px] font-bold" style={{color: colors[item.type]}}>R{item.type === "service" ? item.pricing.amount : item.price}</span>
                                                <div>
                                                    <Star fill={"gold"} stroke={"gold"} size={14}/>
                                                    {/*rating*/}
                                                </div>

                                                <div>
                                                    <span style={{background: colors[item.type]}} className="flex justify-center items-center text-white gap-2 px-2 py-1 text-[12px] rounded-[10px] font-[600] cursor-pointer"><MessageCircle size={14}/> Chat</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="flex items-center gap-2 bg-cyan-400/10 p-4 rounded-[10px] border border-cyan-200/20 flex-none">
                                <Sparkles size={18} className="text-cyan-400"/>
                                <p className="text-[12px] #bbb">Picks are based on your course registration, campus browsing patterns, and what students in CSC · MAM are buying this week.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}