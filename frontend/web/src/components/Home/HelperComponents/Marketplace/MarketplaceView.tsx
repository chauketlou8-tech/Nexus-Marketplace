import { BookOpen, MessageCircle, Package, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react";
import type { Category, Product, User, Course } from "../../../shared/Types/interface.ts";
import getCategory from "../../../../api/categories/getCategory.ts";
import getUser from "../../../../api/user/getUser.ts";
import getCourse from "../../../../api/courses/getCourse.ts";

interface Props {
    products?: Product[];
    formatInit: (name: string) => string;
    categories?: Category[];
    courses?: Course[];
}

export default function MarketplaceView({products, formatInit, categories, courses}: Props) {

    const [textbooks, setTextbooks] = useState<Product[]>([]);
    const [items, setItems] = useState<Product[]>([]);
    const [sellers, setSellers] = useState<Record<string, string>>({});

    const [activeTab, setActiveTab] = useState<string>("textbooks");
    const [course, setCourse] = useState<string>("All Courses");
    const [category, setCategory] = useState<string>("All Categories");
    const [sort, setSort] = useState<string>("recently listed");
    const [Categories, setCategories] = useState<Category[]>([]);

    const [allTextbooks, setAllTextbooks] = useState<Product[]>([]);

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
            setSellers(sellerMap);
        }

        const sortCategories = () => {
            const itemsCategories: Category[] = categories?.filter(category => category.slug !== "books") ?? [];
            setCategories(itemsCategories);
        }

        void sortProducts();
        void sortCategories()
    }, [products]);

    async function changeCurrentCourseFilter(e: { target: { value: string } }) {
        const newCourse: string = e.target.value;
        setCourse(newCourse);

        if (newCourse === "All Courses") {
            setTextbooks(allTextbooks);
            return;
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

    void course
    void sort
    void category

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
                            <p className="text-[#999]">{textbooks.length} textbooks available</p>
                        </div>

                        <div className="flex items-center justify-end p-4 gap-2">
                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Course filter</h3>
                                <select onChange={changeCurrentCourseFilter} name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[150px] outline-0">
                                    <option value="All Courses">All Courses</option>
                                    {courses?.map((c: Course) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
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
                            <p className="text-[#999]">{items.length} items available</p>
                        </div>

                        <div className="flex items-center justify-end p-4 gap-2">
                            <div className="flex flex-col items-start justify-center p-4 gap-2">
                                <h3 className="text-[14px] font-[600]">Category</h3>
                                <select onChange={(e) => setCategory?.(e.target.value)} name="course" id="course" className="bg-gray-200/60 text-[12px] px-4 py-2 rounded-[8px] font-[500] w-[150px] outline-0">
                                    <option value="All Courses">All Categories</option>
                                    {Categories.map((c: Category) => (
                                        <option value={c.name} key={c._id}>{c.slug}</option>
                                    ))}
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
                                    <div>
                                        {
                                            textbooks.map((book) => (
                                                <div key={book._id}>
                                                    <div>
                                                        <img src={`${book.images[0]}`} alt={`${book.tags[0] + " textbook"}`} />
                                                    </div>

                                                    <div>
                                                        <div></div>
                                                        <h2>{book.title}</h2>
                                                        <p>{book.description}</p>
                                                        <div>
                                                            <span>{book.condition}</span>
                                                            <p>{book._id}</p>
                                                        </div>
                                                        <div>
                                                            <span>{formatInit(sellers[book.sellerId])}</span>
                                                            <h3>{sellers[book.sellerId]}</h3>
                                                            <ShieldCheck/>
                                                        </div>
                                                        <hr/>
                                                        <div>
                                                            <div>
                                                                <h2>R{book.price}</h2>
                                                            </div>

                                                            <div>
                                                                <span>
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
                                    <div>
                                        {
                                            items.map((item) => (
                                                <div key={item._id}>
                                                    <div>
                                                        <img src={`${item.images[0]}`} alt={`${item.tags[0] + " textbook"}`} />
                                                    </div>

                                                    <div>
                                                        <div></div>
                                                        <h2>{item.title}</h2>
                                                        <p>{item.description}</p>
                                                        <div>
                                                            <span>{item.condition}</span>
                                                            <p>{item._id}</p>
                                                        </div>
                                                        <div>
                                                            <span>{formatInit(sellers[item.sellerId])}</span>
                                                            <h3>{sellers[item.sellerId]}</h3>
                                                            <ShieldCheck/>
                                                        </div>
                                                        <hr/>
                                                        <div>
                                                            <div>
                                                                <h2>R{item.price}</h2>
                                                            </div>

                                                            <div>
                                                                <span>
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