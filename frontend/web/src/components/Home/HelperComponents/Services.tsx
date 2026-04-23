import { Cog } from "lucide-react"

interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
}

export default function Services({ search, setSearch }: SearchProps) {
    console.log(search, setSearch);
    return (
        <div className="flex flex-col justify-center items-center w-full h-full p-4">
            <div className="flex justify-between items-center w-full p-4">
                <div>
                    <h2 className="text-black text-[22px] font-bold">Student Services</h2>
                    <p className="text-[#999]">Connect with skilled students for tutoring and services</p>
                </div>

                <div className="flex items-center justify-end p-4 gap-2">
                    <div className="flex flex-col items-start justify-center p-4 gap-2">
                        <h3 className="text-[14px] font-[500]">Category</h3>
                        <select name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[200px] outline-0">
                            <option value="All Courses">All Services</option>
                            <option value="tutoring">Tutoring</option>
                            <option value="design">Design</option>
                            <option value="coding">Coding</option>
                            <option value="writing">Writing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center text-gray-500 gap-2 w-full mt-30">
                <Cog className="w-10 h-10 text-gray-400" />
                <p className="text-sm">No services available</p>
            </div>
        </div>
    )
}