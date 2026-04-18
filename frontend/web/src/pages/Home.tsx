import Header from "../components/Home/Header.tsx";
import Body from "../components/Home/Body.tsx";
import { useState } from "react";

export default function Home() {

    const [tab, setTab] = useState<string>("marketplace");
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <Header tab={tab} setTab={setTab} search={search} setSearch={setSearch} />
            <Body tab={tab} setTab={setTab} search={search} setSearch={setSearch} />
        </>
    );
}