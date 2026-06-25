import { BookOpen, MessageCircle, Package, ShieldCheck, SlidersHorizontal, ArrowUp, ArrowDown, X } from "lucide-react"
import { useEffect, useState } from "react";
import type { Category, Product, User, Course, Listing, Chat } from "../../../shared/interface.ts";
import type { setString, setChat } from "../../../shared/types.ts";
import getCategory from "../../../../api/categories/getCategory.ts";
import getUser from "../../../../api/user/getUser.ts";
import getCourse from "../../../../api/courses/getCourse.ts";
import formatInit from "../../../../utils/formatInit.ts";
import getChat from "../../../../api/chats/getChat.ts";
import createChat from "../../../../api/chats/createChat.ts";

interface Props {
    products?: Product[];
    categories?: Category[];
    courses?: Course[];
    setTab: setString;
    listings?: Listing[];
    user: User;
    currChat?: Chat;
    setCurrChat: setChat;
}

export default function MarketplaceView({ products, categories, courses, setTab, listings, user, setCurrChat, currChat }: Props) {

    const [textbooks, setTextbooks] = useState<Product[]>([]);
    const [items, setItems] = useState<Product[]>([]);
    const [sellers, setSellers] = useState<Record<string, string>>({});

    const [activeTab, setActiveTab] = useState<string>("textbooks");
    const [course, setCourse] = useState<string>("All Courses");
    const [category, setCategory] = useState<string>("All Categories");
    const [sort, setSort] = useState<string>("recently listed");
    const [itemCategories, setItemCategories] = useState<Category[]>([]);

    const [allTextbooks, setAllTextbooks] = useState<Product[]>([]);
    const [allItems, setAllItems] = useState<Product[]>([]);

    const colors : string[] = ["blue", "green", "purple", "red", "orange", "yellow"];
    const [color] = useState<string>(colors[Math.floor(Math.random() * colors.length)]);

    const [isShowFilters, setShowFilters] = useState<boolean>(false);
    const [currFilterIdx, setCurrFilterIdx] = useState<number>(0);

    const filters = [
        {
            name: "Newest",
            icon: "",
            sort: "recently listed",
        },
        {
            name: "Price",
            icon: <ArrowUp size={16}/>,
            sort: "low to high",
        },
        {
            name: "Price",
            icon: <ArrowDown size={16}/>,
            sort: "high to low",
        },
        {
            name: "Best Deals",
            icon: "",
            sort: "best deals",
        },
        {
            name: "Top Rated",
            icon: "",
            sort: "top rated",
        }
    ]

    useEffect(() => {
        const sortProducts = async () => {

            const books: Product[] = []
            const others: Product[] = []
            const sellerMap: Record<string, string> = {};

            if (products) {

                for (const product of products) {
                    const slug: string = await getCategory(product.categoryId);

                    if (slug === "books") {
                        books.push(product);
                    } else {
                        others.push(product);
                    }

                    if (!sellerMap[product.sellerId]) {
                        const seller: User = await getUser(product.sellerId);
                        if (seller.name) {
                            sellerMap[product.sellerId] = seller.name;
                        }
                    }
                }

            }

            setTextbooks(books);
            setAllTextbooks(books);
            setItems(others);
            setAllItems(others);
            setSellers(sellerMap);
        }

        const sortCategories = () => {
            const itemsCategories: Category[] = categories?.filter(category => category.slug !== "books") ?? [];
            setItemCategories(itemsCategories);
        }

        void sortProducts();
        void sortCategories();
    }, [products]);

    async function changeCourseFilter(newCourse: string) {
        setCourse(newCourse);

        if (newCourse === "All Courses") {
            return setTextbooks(allTextbooks);
        }

        const filtered: Product[] = [];

        for (const book of allTextbooks) {
            for (const id of book.courseIds) {
                const c: Course = await getCourse(id);
                if (c.code === newCourse) {
                    filtered.push(book);
                }
            }
        }

        setTextbooks(filtered);
    }

    async function changeCategoryFilter(newCategory: string) {
        setCategory(newCategory);

        if (newCategory === "All Categories") {
            return setItems(allItems);
        }

        const filtered: Product[] = [];

        for (const item of allItems) {
            const category: string = await getCategory(item.categoryId);
            if (category === newCategory) {
                filtered.push(item);
            }
        }

        setItems(filtered);
    }

    async function changeSortFilter(newSort: string) {
        setSort?.(newSort);

        if (activeTab === "textbooks") {
            if (newSort === "recently listed") {
                const sorted = [...textbooks].sort((a, b) => {
                    const listingA = listings?.find(l => l.itemId === a._id);
                    const listingB = listings?.find(l => l.itemId === b._id);

                    return new Date(listingB?.createdAt || 0).getTime() -
                        new Date(listingA?.createdAt || 0).getTime();
                });

                setTextbooks(sorted);
            }

            else if (newSort === "low to high") {
                const sorted = [...textbooks].sort((a, b) => a.price - b.price);
                setTextbooks(sorted);
            }
            else if (newSort === "high to low") {
                const sorted = [...textbooks].sort((a, b) => b.price - a.price);
                setTextbooks(sorted);
            }
            else{
                setTextbooks(allTextbooks);
            }
        }

        else if (activeTab === "items") {
            if (newSort === "recently listed") {
                const sorted = [...items].sort((a, b) => {
                    const listingA = listings?.find(l => l.itemId === a._id);
                    const listingB = listings?.find(l => l.itemId === b._id);

                    return new Date(listingB?.createdAt || 0).getTime() -
                        new Date(listingA?.createdAt || 0).getTime();
                });

                setItems(sorted);
            }

            else if (newSort === "low to high") {
                const sorted = [...items].sort((a, b) => a.price - b.price);
                setItems(sorted);
            }
            else if (newSort === "high to low") {
                const sorted = [...items].sort((a, b) => b.price - a.price);
                setItems(sorted);
            }
            else{
                setItems(allItems);
            }
        }
    }

    async function contactSeller(item: Product) {
        if (item.sellerId === user.id){
            return window.location.reload();//don't know what to do here so relead
        }

        //get the chat if it exists
        const chat: Chat = await getChat([item.sellerId, user.id]);

        //check if chat exist
        if (chat) {
            setCurrChat(chat);
            return setTab?.("messages");
        }
        else {
            //create and get the chat if it doesn't exist
            const c: Chat = await createChat([item.sellerId, user.id]);
            setCurrChat(c);
            setTab?.("messages");
        }
    }

    void course
    void sort
    void category
    void currChat

    return (
        <div className="flex flex-col justify-center items-center w-full p-4 gap-6">
            <div className="flex flex-col justify-center items-center w-full gap-4">
                <div className="flex justify-between items-center w-full">
                    <div className="flex justify-center items-center w-fit gap-2 bg-gray-400/10 border border-gray-400/10 px-0.5 rounded-[10px] min-w-[300px] h-[42px]">
                    <span onClick={() => setActiveTab?.("textbooks")} className={`flex justify-center items-center gap-2 px-4 py-1.5 rounded-l-[10px] w-[100%] transition-[.25s] ${activeTab === "textbooks" ? "bg-amber-400 text-black" : ""}`}>
                        <BookOpen className="w-[16px] h-[16px]"/>
                        <p className="whitespace-nowrap">Textbooks ({textbooks.length})</p>
                    </span>
                        <span onClick={() => setActiveTab?.("items")} className={`flex justify-center items-center gap-2 px-4 py-1.5 rounded-r-[10px] w-[100%] transition-[.25s] ${activeTab === "items" ? "bg-amber-400 text-black" : ""}`}>
                        <Package className="w-[16px] h-[16px]"/>
                        <p className="whitespace-nowrap">Items ({items.length})</p>
                    </span>
                    </div>

                    <span className="flex justify-center items-center gap-2 text-[15px] bg-gray-400/10 px-4 py-2 rounded-[8px] border border-gray-200/10 transition-[all .25s] hover:text-gray-200/50" onClick={() => setShowFilters(!isShowFilters)}><SlidersHorizontal size={18}/> Filters</span>
                </div>

                <div className="flex justify-start items-center w-full gap-2">
                    {
                        filters.map((filter, i) => (
                            <span key={i} className={`flex justify-center items-center gap-1 text-[13px] text-[#444] font-[600] cursor-pointer px-4 py-2 rounded-[2rem] ${i === currFilterIdx ? "bg-gray-400/10 text-[#666] border border-gray-200/10" : "hover:bg-gray-500/10 hover:text-[#555]"}`} onClick={() => {
                                setCurrFilterIdx(i);
                                void changeSortFilter(filter.sort)
                            }}>
                                {filter.name}
                                {filter.icon}
                            </span>
                        ))
                    }
                </div>
            </div>

            {
                isShowFilters &&

                <div className="flex justify-between items-center w-full">
                    {activeTab === "textbooks" ?

                        <div className="flex flex-col justify-center items-start w-full gap-4 p-4 bg-gray-400/10 rounded-[10px] border border-gray-200/15">
                            <div className="flex justify-between items-center w-full">
                                <h2 className="uppercase font-[600] text-[14px] text-[#666]">Filter by course</h2>
                                <X size={14} cursor="pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFilters(false);
                                }} />
                            </div>

                            <div className="flex justify-start items-center w-full pr-1 gap-2 overflow-x-auto scroll-hide">
                                <span className={`flex justify-center items-center text-[12px] text-[#444] font-[600] cursor-pointer px-4 py-2 rounded-[2rem] border whitespace-nowrap ${course === "All Courses" ? "bg-amber-400/10 text-[#ffb84d] border-amber-400/20": "bg-gray-600/10 text-[#666] border-gray-200/10"}`} onClick={() => changeCourseFilter("All Courses")}>All Courses</span>
                                {
                                    courses?.map((c, i) => (
                                        <span key={i} className={`flex justify-center items-center text-[12px] text-[#444] font-[600] cursor-pointer px-4 py-2 rounded-[2rem] border whitespace-nowrap ${c.code === course ? "bg-amber-400/10 text-[#ffb84d] border-amber-400/20" : "bg-gray-600/10 text-[#666] border-gray-200/10"}`} onClick={() => changeCourseFilter(c?.code ?? "")}>{c.code}</span>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-start w-full gap-4 p-4 bg-gray-400/10 rounded-[10px] border border-gray-200/15">
                            <div className="flex justify-between items-center w-full">
                                <h2 className="uppercase font-[600] text-[14px] text-[#666]">Filter by category</h2>
                                <X size={14} cursor="pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFilters(false);
                                }} />
                            </div>

                            <div className="flex justify-start items-center w-full pr-1 gap-2 overflow-x-auto scroll-hide">
                                <span className={`flex justify-center items-center text-[12px] text-[#444] font-[600] cursor-pointer px-4 py-2 rounded-[2rem] border whitespace-nowrap ${category === "All Categories" ? "bg-amber-400/10 text-[#ffb84d] border-amber-400/20": "bg-gray-600/10 text-[#666] border-gray-200/10"}`} onClick={() => changeCategoryFilter("All Categories")}>All Categories</span>
                                {
                                    itemCategories?.map((c, i) => (
                                        <span key={i} className={`flex justify-center items-center text-[12px] text-[#444] font-[600] cursor-pointer px-4 py-2 rounded-[2rem] border whitespace-nowrap ${c.slug === category ? "bg-amber-400/10 text-[#ffb84d] border-amber-400/20" : "bg-gray-600/10 text-[#666] border-gray-200/10"}`} onClick={() => changeCategoryFilter(c.slug ?? "")}>{c.name}</span>
                                    ))
                                }
                            </div>
                        </div>
                    }

                </div>
            }

            {
                textbooks && items &&

                <div>
                    {activeTab === "textbooks" ?
                        (
                            (
                                textbooks.length === 0 ?
                                    <div className="flex flex-col items-center justify-center w-full text-gray-500 gap-2">
                                        <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
                                            <Package className="w-10 h-10 text-gray-400" />
                                            <p className="text-sm">No products available</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex flex-col items-center justify-center w-full gap-4">
                                        <div>{/*top-rated book*/}</div>

                                        <div className="flex justify-between items-center w-full">
                                            <h2 className="text-[14px] font-[600] text-[#666]">{course === "All Courses" ? "All Textbooks" : course}</h2>
                                            <hr className="w-[82%] opacity-[0.3]"/>
                                            <p className="text-[14px] font-[600] text-[#666]">{textbooks.length} {textbooks.length === 1 ? "Listing" : "Listings"}</p>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 w-full">
                                            {
                                                textbooks.map((book) => (
                                                    <div key={book._id} className="group flex flex-col items-start justify-start relative bg-gray-400/15 border border-gray-400/50 rounded-[5px] hover:border hover:border-amber-400 hover:translate-y-[-8px] transition-[.5s ease-in-out] duration-400">
                                                        <div className="flex items-center justify-center w-full relative">
                                                            <div className="w-fit h-fit relative overflow-hidden">
                                                                <img src={`${book.images[0]}`} alt={`${book.tags[0] + " textbook"}`} className="group-hover:scale-[1.05] w-[400px] h-[250px] rounded-[5px] transition-[.5s ease-in-out] duration-400"/>
                                                            </div>

                                                            <div className="absolute bottom-0 inset-x-0 p-3">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[#ffb84d] text-[10px] font-bold tracking-wider">

                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                                                                        <span className="text-[10px] text-white/60 font-medium">{book.condition}</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <hr className="w-full opacity-0 group-hover:opacity-100"/>

                                                        <div className="flex flex-col justify-center items-start w-full h-full py-4 px-4 gap-[2px]">
                                                            <div>
                                                                {/*course*/}
                                                            </div>

                                                            <h2 className="text-white font-[600] text-[14px] whitespace-nowrap">{book.title}</h2>
                                                            <p className="text-[12px] text-[#999] leading-6 line-clamp-3 flex-grow">{book.description}</p>

                                                            <div className="flex items-center justify-start w-full gap-1">
                                                                {
                                                                    book.tags.map((tag, i) => (
                                                                        i <= 4 && <div key={i} className="text-[12px] text-[#fff] mt-4 backdrop-blur-sm bg-white/[0.02] border border-white/[0.06] p-1 rounded-[2px]">{tag}</div>
                                                                    ))
                                                                }
                                                            </div>

                                                            <div className="flex items-center justify-start w-full gap-1 py-4">
                                                                <span style={{ background: color }} className="flex justify-center items-center w-[14px] h-[14px] rounded-[50%] p-4 text-[14px] text-white">{formatInit(sellers[book.sellerId])}</span>
                                                                <h3 className="text-[#fff] text-[14px] font-[600]">{sellers[book.sellerId]}</h3>
                                                                <ShieldCheck className="text-blue-700 w-[18px] h-[18px] ml-auto"/>
                                                            </div>

                                                            <hr className="w-full"/>

                                                            <div className="flex items-center justify-between w-full h-full pt-4 flex-1">
                                                                <div>
                                                                    <h2 className="text-amber-400 text-[25px] font-[600]">R{book.price}</h2>
                                                                </div>

                                                                <div>
                                                                <span onClick={() => contactSeller(book)}  className="flex justify-start items-center w-full text-[14px] bg-amber-400/5 text-amber-400 border border-amber-400/20 px-4 py-2 gap-2 rounded-[8px] cursor-pointer hover:bg-amber-400/10">
                                                                    <MessageCircle size={16}/>
                                                                    Contact
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                            )

                        )
                        :

                        (
                            (
                                items.length === 0 ?
                                    <div className="flex flex-col items-center justify-center w-full text-gray-500 gap-2">
                                        <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
                                            <Package className="w-10 h-10 text-gray-400" />
                                            <p className="text-sm">No products available</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="grid grid-cols-4 gap-4 w-full">
                                        {
                                            items.map((item) => (
                                                <div key={item._id} className="group flex flex-col items-start justify-start relative bg-gray-400/15 border border-gray-400/50 rounded-[5px] hover:border hover:border-amber-400 hover:translate-y-[-8px] transition-[.5s ease-in-out] duration-400">
                                                    <div className="flex items-center justify-center w-full relative">
                                                        <div className="w-fit h-fit relative overflow-hidden">
                                                            <img src={`${item.images[0]}`} alt={`${item.tags[0] + " item"}`} className="group-hover:scale-[1.05] w-[400px] h-[250px] rounded-[5px] transition-[.5s ease-in-out] duration-400"/>
                                                        </div>

                                                        <div className="absolute bottom-0 inset-x-0 p-3">
                                                            <div className="flex items-center justify-between mb-1">
                                                                    <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[#ffb84d] text-[10px] font-bold tracking-wider">

                                                                    </span>
                                                                <span className="flex items-center gap-1">
                                                                        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                                                                        <span className="text-[10px] text-white/60 font-medium">{item.condition}</span>
                                                                    </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr className="w-full opacity-0 group-hover:opacity-100"/>

                                                    <div className="flex flex-col justify-center items-start w-full h-full py-4 px-4 gap-[2px]">
                                                        <div>
                                                            {/*course*/}
                                                        </div>

                                                        <h2 className="text-white font-[600] text-[14px] whitespace-nowrap">{item.title}</h2>
                                                        <p className="text-[12px] text-[#999] leading-6 line-clamp-3 flex-grow">{item.description}</p>

                                                        <div className="flex items-center justify-start w-full gap-1">
                                                            {
                                                                item.tags.map((tag, i) => (
                                                                    i <= 4 && <div key={i} className="text-[12px] text-[#fff] mt-4 backdrop-blur-sm bg-white/[0.02] border border-white/[0.06] p-1 rounded-[2px]">{tag}</div>
                                                                ))
                                                            }
                                                        </div>

                                                        <div className="flex items-center justify-start w-full gap-1 py-4">
                                                            <span style={{ background: color }} className="flex justify-center items-center w-[14px] h-[14px] rounded-[50%] p-4 text-[14px] text-white">{formatInit(sellers[item.sellerId])}</span>
                                                            <h3 className="text-[#fff] text-[14px] font-[600]">{sellers[item.sellerId]}</h3>
                                                            <ShieldCheck className="text-blue-700 w-[18px] h-[18px] ml-auto"/>
                                                        </div>

                                                        <hr className="w-full"/>

                                                        <div className="flex items-center justify-between w-full h-full pt-4 flex-1">
                                                            <div>
                                                                <h2 className="text-amber-400 text-[25px] font-[600]">R{item.price}</h2>
                                                            </div>

                                                            <div>
                                                                <span onClick={() => contactSeller(item)}  className="flex justify-start items-center w-full text-[14px] bg-amber-400/5 text-amber-400 border border-amber-400/20 px-4 py-2 gap-2 rounded-[8px] cursor-pointer hover:bg-amber-400/10">
                                                                    <MessageCircle size={16}/>
                                                                    Contact
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            )
                        )}
                </div>
            }
        </div>
    )
}