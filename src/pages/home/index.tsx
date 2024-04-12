import { Component, createEffect, createSignal, onMount } from "solid-js";
import { Navbar, Footer, Contact, About } from "../../components/index";
// import { climateaware, desa, event, gamis, stoik, foto } from "../../assets/index";
import { Portofolio } from "../../components/index";

const scriptURL = "https://script.google.com/macros/s/AKfycbwDQN2AF1ZzQn0jek3sTjJSpuXqiKhDLc--s5wP0PJS6BgrgHmUuHffLvWEdsjTiRreAA/exec";

const handleSubmit = (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const success = document.querySelector(".alert-success");
    const loading = form.querySelector(".loading");
    const send = form.querySelector(".send");

    if (loading) {
        loading.classList.remove("hidden");
    }
    if (send) {
        send.classList.add("hidden");
    }
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
            if (send) {
                send.classList.remove("hidden");
            }
            if (loading) {
                loading.classList.add("hidden");
            }
            if (success) {
                success.classList.remove("hidden");
            }
            form.reset();
            console.log("Success!", response);
        })
        .catch((error) => console.error("Error!", error.message));
};
interface HeroItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

function fetchData() {
    // State untuk menyimpan data edukasi
    const [hero, setHero] = createSignal<HeroItem[]>([]);

    onMount(async () => {
        try {
            // Lakukan permintaan GET ke URL edukasi
            const response = await fetch("http://127.0.0.1:8000/hero");

            // Periksa apakah permintaan sukses dan respon memiliki status 200 OK
            if (response.ok) {
                // Ambil data JSON dari respons
                const data: HeroItem[] = await response.json();

                // Update state edukasi dengan data yang diterima
                setHero(data);
                console.log("fetch berhasil", data);
            } else {
                // Jika respons tidak berhasil, lemparkan kesalahan
                throw new Error("Failed to fetch edukasi data");
            }
        } catch (error) {
            console.error("Error fetching edukasi data:", error);
        }
    });
    return { hero };
}

const home: Component = () => {
    const [route] = createSignal(location.pathname);

    const [form, setForm] = createSignal<HTMLFormElement | null>(null);

    createEffect(() => {
        if (form()) {
            form()!.addEventListener("submit", handleSubmit);

            return () => {
                form()!.removeEventListener("submit", handleSubmit);
            };
        }
    });
    const closeModal = () => {
        const success = document.querySelector(".alert-success");
        if (success) {
            success.classList.toggle("hidden");
        }
    };
    const { hero } = fetchData();
    return (
        <div>
            <Navbar />
            {/* Hero */}
            <div class="hero min-h-screen bg-base-200 ">
                {hero().map((hero) => (
                    <div class="hero-content flex-col lg:flex-row-reverse lg:p-40 items-center justify-center">
                        <img src={hero.image} class="max-w-48 rounded-lg shadow-2xl" />
                        <div class="grid lg:grid-cols-2 grid-cols-1 w-full lg:text-start text-center">
                            <div class="">
                                {" "}
                                <h1 class="lg:text-6xl text-4xl font-bold">
                                    {hero.title}
                                    {/* <span class="">
                                        <br /> Website <br /> Developer
                                    </span> */}
                                </h1>
                                <p class="py-6">{hero.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* end hero */}
            {/* about */}
            <div class=" py-20">
                <About />
            </div>
            {/* end about */}
            {/* portofolio */}
            <section class="flex flex-col gap-10 w-full items-center border-t">
                <Portofolio />
            </section>
            {/* end portofolio */}
            {/* contact */}
            <div class=" border-t py-20">
                <Contact />
            </div>
            {/* end contact */}
            <Footer />
        </div>
    );
};

export default home;
