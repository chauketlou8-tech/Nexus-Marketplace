import Header from "../components/Home/Header.tsx";
import Body from "../components/Home/Body.tsx";
import { useState, useEffect } from "react";
import type { Product, Category, Course, Service, Chat, Listing, User } from "../components/shared/Types/interface.ts";
import getProducts from "../api/products/getProducts.ts";
import getCategories from "../api/categories/getCategories.ts";
import getCourses from "../api/courses/getCourses.ts";
import getServices from "../api/services/getServices.ts";
import getChats from "../api/chats/getChats.ts";
import getListings from "../api/listings/getListings.ts";

export default function Home({ user }: { user : User }) {

    const [tab, setTab] = useState<string>("marketplace");
    const [search, setSearch] = useState<string>("");

    const [products, setProducts] = useState<Product[]>([]);
    //const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [listings, setListings] = useState<Listing[]>([]);

    const [productCategories, setProductCategories] = useState<Category[]>([]);
    const [serviceCategories, setServiceCategories] = useState<Category[]>([]);

    const [currChat, setCurrChat] = useState<Chat | null>(() => {
        const saved = sessionStorage.getItem("currChat");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const allProducts: Product[] = await getProducts();
                setProducts(allProducts);
            }
            catch (e) {
                console.log(e);
            }
        }

        const fetchCategories = async () => {
            try{
                const allCategories: Category[] = await getCategories();
                const prodCategories: Category[] = [];
                const servCategories: Category[] = [];

                if(allCategories){
                    for (const category of allCategories){
                        const type: string | undefined = category.categoryType;

                        if (type && type === "Product"){
                            prodCategories.push(category);
                        }
                        else{
                            servCategories.push(category);
                        }
                    }
                }

                setProductCategories(prodCategories);
                setServiceCategories(servCategories);
            }
            catch (e) {
                console.log(e);
            }
        }

        const fetchCourses = async () => {
            try{
                const allCourses = await getCourses();
                setCourses(allCourses);
            }
            catch (e) {
                console.log(e)
            }
        }

        const fetchServices = async () => {
            try{
                const allServices: Service[] = await getServices();
                setServices(allServices);
            }
            catch (e) {
                console.log(e)
            }
        }

        const fetchChats = async () => {
            try{
                const allChats: Chat[] = await getChats();
                setChats(allChats);
            }
            catch (e) {
                console.log(e)
            }
        }

        const fetchListings = async () => {
            try{
                const allListings: Listing[] = await getListings();
                setListings(allListings);
            }
            catch (e) {
                console.log(e)
            }
        }

        void fetchProducts();
        void fetchCategories();
        void fetchCourses();
        void fetchServices();
        void fetchChats();
        void fetchListings()
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-gray-500 gap-2 bg-blue-50/30 h-full">
            <Header tab={tab} setTab={setTab} search={search} setSearch={setSearch} user={user} />
            <Body tab={tab}
                  setTab={setTab}
                  search={search}
                  setSearch={setSearch}
                  products={products}
                  productCategories={productCategories}
                  serviceCategories={serviceCategories}
                  courses={courses}
                  services={services}
                  chats={chats}
                  listings={listings}
                  user={user}
                  setChats={setChats}
                  currChat={currChat}
                  setCurrChat={setCurrChat}
            />
        </div>
    );
}