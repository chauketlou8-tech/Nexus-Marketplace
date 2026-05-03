import Header from "../components/Home/Header.tsx";
import Body from "../components/Home/Body.tsx";
import { useState, useEffect } from "react";
import type { User } from "../components/shared/Types/User.ts"
import type { Product, Category, Course, Service } from "../components/shared/Types/interface.ts";
import getProducts from "../api/products/getProducts.ts";
import getCategories from "../api/categories/getCategories.ts";
import getCourses from "../api/courses/getCourses.ts";
import getServices from "../api/services/getServices.ts";

export default function Home({ user }: { user : User }) {

    const [tab, setTab] = useState<string>("marketplace");
    const [search, setSearch] = useState<string>("");

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const p: Product[] = await getProducts();
                setProducts(p);
            }
            catch (e) {
                console.log(e);
            }
        }

        const fetchCategories = async () => {
            try{
                const cs: Category[] = await getCategories();
                setCategories(cs);
            }
            catch (e) {
                console.log(e);
            }
        }

        const fetchCourses = async () => {
            try{
                const cs = await getCourses();
                setCourses(cs);
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

        void fetchProducts();
        void fetchCategories();
        void fetchCourses();
        void fetchServices();
    }, []);

    function formatInit(name: string) : string {
        if (!name) return "";

        const splitName: string[] = name.split(' ');
        let initials: string = "";

        if (splitName.length == 1) {
            initials += splitName[0].charAt(0).toUpperCase() + splitName[0].charAt(1).toUpperCase();
        }
        else if (splitName.length >= 2) {
            initials += splitName[0].charAt(0).toUpperCase() + splitName[splitName.length - 1].charAt(0).toUpperCase();
        }

        return initials;
    }

    return (
        <div className="flex flex-col items-center justify-center text-gray-500 gap-2 bg-blue-50/30 h-full">
            <Header tab={tab} setTab={setTab} search={search} setSearch={setSearch} user={user} formatInit={formatInit} />
            <Body tab={tab}
                  setTab={setTab}
                  search={search}
                  setSearch={setSearch}
                  products={products}
                  formatInit={formatInit}
                  categories={categories}
                  courses={courses}
                  services={services}
            />
        </div>
    );
}