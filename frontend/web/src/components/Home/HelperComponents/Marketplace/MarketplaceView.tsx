import { BookOpen, MessageCircle, Package, ShieldCheck, SlidersHorizontal } from "lucide-react"
import {useEffect, useState} from "react";
import type {Category, Product, User, Course, Listing, Chat} from "../../../shared/interface.ts";
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
    const [Categories, setCategories] = useState<Category[]>([]);

    const [allTextbooks, setAllTextbooks] = useState<Product[]>([]);
    const [allItems, setAllItems] = useState<Product[]>([]);

    const colors : string[] = ["blue", "green", "purple", "red", "orange", "yellow"];
    const [color] = useState<string>(colors[Math.floor(Math.random() * colors.length)]);

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
            setCategories(itemsCategories);
        }

        void sortProducts();
        void sortCategories();
    }, [products]);

    async function changeCurrentCourseFilter(e: { target: { value: string } }) {
        const newCourse: string = e.target.value;
        setCourse(newCourse);

        if (newCourse === "All Courses") {
            return setTextbooks(allTextbooks);
        }

        const filtered: Product[] = [];

        for (const book of allTextbooks) {
            for (const id of book.courseIds) {
                const c = await getCourse(id);
                if (c.name === newCourse) {
                    filtered.push(book);
                    break;
                }
            }
        }

        setTextbooks(filtered);
    }

    async function changeCategoryFilter(e: { target: { value: string } }) {
        console.log(e.target);
        const newCategory: string = e.target.value;
        setCategory(newCategory);

        if (newCategory === "All Categories") {
            return setItems(allItems);
        }

        const filtered: Product[] = [];

        for (const item of allItems) {
            if(!item.courseIds.length) continue;

            for (const id of item.courseIds) {
                const c = await getCourse(id);

                if (c.name === newCategory) {
                    filtered.push(item);
                    break;
                }
            }
        }

        setItems(filtered);
    }

    async function changeSortFilter(e: { target: { value: string } }) {
        const newSort: string = e.target.value;
        setSort?.(newSort);

        if (activeTab === "textbooks") {
            if (newSort === "Recently Listed") {
                const sorted = [...textbooks].sort((a, b) => {
                    const listingA = listings?.find(l => l.itemId === a._id);
                    const listingB = listings?.find(l => l.itemId === b._id);

                    return new Date(listingB?.createdAt || 0).getTime() -
                        new Date(listingA?.createdAt || 0).getTime();
                });

                setTextbooks(sorted);
            }

            else if (newSort === "Price: Low to High") {
                const sorted = [...textbooks].sort((a, b) => a.price - b.price);
                setTextbooks(sorted);
            }
            else if (newSort === "Price: High to Low") {
                const sorted = [...textbooks].sort((a, b) => b.price - a.price);
                setTextbooks(sorted);
            }
            else{
                setTextbooks(allTextbooks);
            }
        }

        else if (activeTab === "items") {
            if (newSort === "Recently Listed") {
                const sorted = [...textbooks].sort((a, b) => {
                    const listingA = listings?.find(l => l.itemId === a._id);
                    const listingB = listings?.find(l => l.itemId === b._id);

                    return new Date(listingB?.createdAt || 0).getTime() -
                        new Date(listingA?.createdAt || 0).getTime();
                });

                setItems(sorted);
            }

            else if (newSort === "Price: Low to High") {
                const sorted = [...textbooks].sort((a, b) => a.price - b.price);
                setItems(sorted);
            }
            else if (newSort === "Price: High to Low") {
                const sorted = [...textbooks].sort((a, b) => b.price - a.price);
                setItems(sorted);
            }
            else{
                setItems(allItems);
            }
        }
    }

    async function contactSeller(item: Product): Promise<void> {
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
        <div className="flex flex-col justify-center items-center w-full p-4">
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

                <span className="flex justify-center items-center gap-2 text-[15px] bg-gray-400/10 px-4 py-2 rounded-[8px] border border-gray-200/10 transition-[all .25s] hover:text-gray-200/50"><SlidersHorizontal size={18}/> Filters</span>
            </div>

            <div className="flex justify-between items-center w-full p-4">
                {activeTab === "textbooks" ?

                    <div className="flex justify-between items-center w-full p-4">
                        <div>
                            <h2 className="text-black text-[22px] font-bold">Course Textbooks</h2>
                            <p className="text-[#999]">{textbooks.length} {textbooks.length === 1 ? "textbook" : "textbooks"} available</p>
                        </div>

                        <div className="flex items-center justify-end p-4 gap-2">
                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Course filter</h3>
                                <select onChange={ changeCurrentCourseFilter } name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[150px] outline-0">
                                    <option value="All Courses">All Courses</option>
                                    {courses?.map((c: Course) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Sort By</h3>
                                <select onChange={ changeSortFilter } name="sort" id="sort" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] w-[150px] font-[500] outline-0">
                                    <option value="recently listed">Recently Listed</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="sellers">Top Sellers</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex justify-between items-center w-full p-4">
                        <div>
                            <h2 className="text-black text-[22px] font-bold">Student Items</h2>
                            <p className="text-[#999]">{items.length} {items.length === 1 ? "item" : "items"} available</p>
                        </div>

                        <div className="flex items-center justify-end p-4 gap-2">
                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Category</h3>
                                <select onChange={ changeCategoryFilter } name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[150px] outline-0">
                                    <option value="All Courses">All Categories</option>
                                    {Categories.map((c: Category) => (
                                        <option value={c.name} key={c._id}>{c.slug}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Sort By</h3>
                                <select onChange={ changeSortFilter } name="sort" id="sort" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] w-[150px] font-[500] outline-0">
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
                                    <div className="grid grid-cols-4 gap-4 w-full">
                                        {
                                            textbooks.map((book) => (
                                                <div key={book._id} className="group flex flex-col items-start justify-start relative bg-gray-400/15 border border-gray-400/50 rounded-[5px] hover:border hover:border-purple-400 transition-all duration-250">
                                                    <div className="flex items-center justify-center w-full relative">
                                                        <div className="w-fit h-fit">
                                                            <img src={`${book.images[0]}`} alt={`${book.tags[0] + " textbook"}`} className="w-[400px] h-[250px] rounded-t-[5px]"/>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col justify-center items-start w-full p-5 gap-[2px]">
                                                        <div>
                                                            {/*course*/}
                                                        </div>

                                                        <h2 className="text-black font-[600] text-[18px]">{book.title}</h2>
                                                        <p className="text-[12px] text-[#333]">{book.description}</p>

                                                        <div className="flex items-center justify-start w-full gap-4 pt-4">
                                                            <span className="flex justify-center items-center text-black text-[14px] rounded-[4px] border border-gray-400 px-5 h-[20px] py-1">{book.condition}</span>
                                                            <p className="text-[#999] text-[14px]">{book._id}</p>
                                                        </div>

                                                        <div className="flex items-center justify-start w-full gap-1 py-4">
                                                            <span style={{ background: color }} className="flex justify-center items-center w-[16px] h-[16px] rounded-[50%] p-4.5 text-[14px] text-white">{formatInit(sellers[book.sellerId])}</span>
                                                            <h3 className="text-[#333] text-[15px] font-[400]">{sellers[book.sellerId]}</h3>
                                                            <ShieldCheck className="text-blue-700 w-[18px] h-[18px]"/>
                                                        </div>

                                                        <hr className="w-full"/>

                                                        <div className="flex items-center justify-between w-full py-4">
                                                            <div>
                                                                <h2 className="text-black text-[25px] font-[500]">R{book.price}</h2>
                                                            </div>

                                                            <div>
                                                                <span onClick={() => contactSeller(book)}  className="flex justify-start items-center w-full bg-black text-white px-6 py-2 gap-2 rounded-[10px] cursor-pointer hover:bg-black/80">
                                                                    <MessageCircle/>
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
                                                <div key={item._id} className="group flex flex-col items-start justify-start relative bg-gray-400/15 border border-gray-400/50 rounded-[5px] hover:border hover:border-purple-400 transition-all duration-250">
                                                    <div className="flex items-center justify-center w-full relative">
                                                        <img src={`${item.images[0]}`} alt={`${item.tags[0]}`} className="w-[400px] h-[250px] rounded-t-[5px]" />
                                                    </div>

                                                    <div className="flex flex-col justify-center items-start w-full p-5 gap-[2px]">
                                                        <div></div>

                                                        <h2 className="text-black font-[600] text-[18px]">{item.title}</h2>
                                                        <p className="text-[12px] text-[#333]">{item.description}</p>

                                                        <div className="flex items-center justify-start w-full gap-4 pt-4">
                                                            <span className="flex justify-center items-center text-black text-[14px] rounded-[4px] border border-gray-400 px-5 h-[20px] py-1">{item.condition}</span>
                                                            <p className="text-[#999] text-[14px]">{item._id}</p>
                                                        </div>

                                                        <div className="flex items-center justify-start w-full gap-1 py-4">
                                                            <span style={{ background: color }} className="flex justify-center items-center w-[16px] h-[16px] rounded-[50%] p-4.5 text-[14px] text-white">{formatInit(sellers[item.sellerId])}</span>
                                                            <h3 className="text-[#333] text-[15px] font-[400]">{sellers[item.sellerId]}</h3>
                                                            <ShieldCheck className="text-blue-700 w-[18px] h-[18px]"/>
                                                        </div>

                                                        <hr className="w-full"/>

                                                        <div className="flex items-center justify-between w-full py-4">
                                                            <div>
                                                                <h2 className="text-black text-[25px] font-[500]">R{item.price}</h2>
                                                            </div>

                                                            <div>
                                                                <span onClick={() => contactSeller(item)} className="flex justify-start items-center w-full bg-black text-white px-6 py-2 gap-2 rounded-[10px] cursor-pointer hover:bg-black/80">
                                                                    <MessageCircle/>
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