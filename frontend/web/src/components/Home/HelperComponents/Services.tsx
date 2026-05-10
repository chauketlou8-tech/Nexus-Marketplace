import {Cog, Clock, MessageCircle, ShieldCheck} from "lucide-react"
import type { setString } from "../../shared/Types/Types.ts";
import type { Service, Category, User } from "../../shared/Types/interface.ts";
import { useState, useEffect } from "react";
import getCategory from "../../../api/categories/getCategory.ts";
import getUser from "../../../api/user/getUser.ts";
import formatInit from "../../../utils/formatInit.ts";

interface SearchProps {
    search?: string;
    setSearch?: setString;
    services?: Service[];
    categories?: Category[];
}

export default function Services({ search, setSearch, services, categories }: SearchProps) {

    const [shownServices, setShownServices] = useState<Service[]>([]);
    const [providers, setProviders] = useState<Record<string, string>>({});

    const colors : string[] = ["blue", "green", "purple", "red", "orange", "yellow"];
    const [color] = useState<string>(colors[Math.floor(Math.random() * colors.length)]);

    useEffect(() => {
        if (services) {
            setShownServices(services);
        }

        const getProviders = async () => {
            const providerMap: Record<string, string> = {};

            if (services) {
                for (const service of services){
                    //@ts-ignore
                    const user: User = await getUser(service.providerId);
                    //@ts-ignore
                    if (!providerMap[service.providerId]){
                        //@ts-ignore
                        providerMap[service.providerId] = user.name;
                    }
                }
            }
            setProviders(providerMap);
        }

        void getProviders();
    }, [services]);

    async function changeFilter(e: { target: { value: string } }) {
        const newFilter = e.target.value;
        const filter: Service[] = [];
        //console.log(newFilter);

        if (newFilter === "All Services") {
            if (services){
                return setShownServices(services);
            }

            return;
        }

        if (services) {
            for (const service of services) {
                if(service.categoryId){
                    const slug: string = await getCategory(service.categoryId);

                    if (slug === newFilter) {
                        console.log("slug:", slug, "newFilter:", newFilter);
                        filter.push(service);
                    }
                }
            }
        }

        setShownServices(filter);
        console.log(shownServices);
    }

    void search
    void setSearch

    return (
        <div className="flex flex-col justify-start items-center w-full h-screen p-4">
            <div className="flex justify-between items-center w-full p-4">
                <div>
                    <h2 className="text-black text-[22px] font-bold">Student Services</h2>
                    <p className="text-[#999]">Connect with skilled students for tutoring and services</p>
                </div>

                <div className="flex items-center justify-end p-4 gap-2">
                    <div className="flex flex-col items-start justify-center p-4 gap-2">
                        <h3 className="text-[14px] font-[500]">Category</h3>
                        <select onChange={changeFilter} name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[200px] outline-0">
                            <option value="All Services">All Services</option>
                            {
                                categories?.map(category => (
                                    <option key={category._id} value={`${category.slug}`}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>

            {
                services &&
                (
                    shownServices.length === 0 ?
                        <div className="flex items-center justify-center text-gray-500 gap-2 w-full h-full">
                            <Cog className="w-10 h-10 text-gray-400" />
                            <p className="text-sm">No services available</p>
                        </div>
                        :
                        <div className="grid grid-cols-4 gap-4 w-full">
                            {
                                shownServices.map((service: Service) => (
                                    <div key={service._id} className="group flex flex-col items-start justify-start relative bg-gray-400/15 border border-gray-400/50 rounded-[5px] hover:border hover:border-purple-400 transition-all duration-250">
                                        <div className="flex items-center justify-center w-full relative">
                                            <div className="w-fit h-fit">
                                                <img src={`${service.images?.[0]}`} alt={`${service.title}`}
                                                     className="w-[400px] h-[250px] rounded-t-[5px]"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center items-start w-full p-5 gap-[2px]">
                                            <div className="flex justify-between items-center w-full">
                                                <h2 className="text-black font-[600] text-[18px]">{service.title}</h2>
                                                <span className="bg-white text-black text-[12px] font-[500] px-4 py-0.5 rounded-[5px]">{service.serviceType}</span>
                                            </div>

                                            <p className="text-[14px] text-[#333] mt-2">{service.description}</p>

                                            <div className="flex items-center justify-start w-full gap-1 py-4">
                                                <span style={{ background: color }} className="flex justify-center items-center w-[16px] h-[16px] rounded-[50%] p-4.5 text-[14px] text-white">{formatInit(providers[service.providerId??""])}</span>
                                                <h3 className="text-[#333] text-[15px] font-[400]">{providers[service?.providerId??""]}</h3>
                                                <ShieldCheck className="text-blue-700 w-[18px] h-[18px]"/>
                                            </div>

                                            {
                                                service.courses?.length !== 0 &&

                                                <div className="flex flex-col items-start justify-start w-full gap-1 py-4">
                                                    <p className="text-[#333] font-[200] text-[14px]">Courses:</p>

                                                    <div className="flex justify-start items-center w-full gap-1">
                                                        {service.courses?.map((course) => (
                                                            <span key={course} className="bg-white text-black text-[10px] font-[500] px-2 py-1.5 rounded-[5px]">{course}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            }

                                            {
                                                service.skills?.length !== 0 &&
                                                <div className="flex flex-col items-start justify-start w-full gap-1 py-4">
                                                    <p className="text-[#333] font-[200] text-[14px]">Skills:</p>

                                                    <div className="flex justify-start items-center w-full gap-1 flex-wrap">
                                                        {service.skills?.map((skill) => (
                                                            <span key={skill} className="bg-white text-black text-[10px] font-[500] px-2 py-1.5 rounded-[5px] whitespace-nowrap">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            }

                                            <div className="flex justify-start items-center w-full gap-2 py-2 pb-4">
                                                <Clock className="w-[18px] h-[18px] text-[#333]" />
                                                <p className="text-[14px] text-[#333]">{service.availability}</p>
                                            </div>

                                            <hr className="w-full py-2"/>

                                            <div className="flex items-center justify-between w-full py-4">
                                                <div className="flex justify-start items-center w-full gap-1">
                                                    <h2 className="text-black text-[25px] font-[500]">R{service.pricing?.amount}</h2>
                                                    <p>{service.pricing?.unit}</p>
                                                </div>

                                                <div className="flex justify-start items-center w-fit bg-black text-white px-6 py-2 gap-2 rounded-[10px] cursor-pointer hover:bg-black/80">
                                                    <MessageCircle/>
                                                    Contact
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                )
            }
        </div>
    )
}