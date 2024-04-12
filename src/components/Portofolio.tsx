// import { climateaware, desa, event, gamis, stoik } from "../assets/index";
import Button from "./atoms/Button";
import { onMount, createSignal } from "solid-js";

interface PortofolioItem {
    id: string;
    title: string;
    description: string;
    skills: string;
    link: string;
    image: string;
}

function fetchData() {
    // State untuk menyimpan data edukasi
    const [portofolio, setPortofolio] = createSignal<PortofolioItem[]>([]);

    onMount(async () => {
        try {
            // Lakukan permintaan GET ke URL edukasi
            const response = await fetch("http://127.0.0.1:8000/portofolio");

            // Periksa apakah permintaan sukses dan respon memiliki status 200 OK
            if (response.ok) {
                // Ambil data JSON dari respons
                const data: PortofolioItem[] = await response.json();

                // Update state edukasi dengan data yang diterima
                setPortofolio(data);
                console.log("fetch berhasil", data);
            } else {
                // Jika respons tidak berhasil, lemparkan kesalahan
                throw new Error("Failed to fetch edukasi data");
            }
        } catch (error) {
            console.error("Error fetching edukasi data:", error);
        }
    });
    return { portofolio };
}

const Portofolio = () => {
    const { portofolio } = fetchData();
    return (
        <div>
            {" "}
            <section class="px-20 py-20 flex flex-col gap-10 w-full items-center">
                <div class="text-5xl font-bold text-center">Project</div>
                <div class="bg-gradient-to-tr from-violet-700 to-blue-600  h-2 w-20 rounded-full"></div>
                <div class="text-lg max-w-2xl text-center">Here you will find more information about my project mostly in terms of website development</div>
                <ul class="gap-10 flex flex-col items-center justify-center p-20">
                    {portofolio().map((portofolio) => (
                        <li class="p-4 grid grid-cols-8 gap-6 whitespace-no-wrap group hover:bg-white hover:bg-opacity-10 hover:rounded-lg hover:transition hover:duration-300 hover:ease-in-out">
                            <img src={portofolio.image} class="col-span-8 sm:col-span-4 md:col-span-3 lg:col-span-3 bg-contain " />
                            <div class="flex flex-col gap-2 col-span-8 sm:col-span-4 md:col-span-5 lg:col-span-5 ">
                                <div class="font-bold group-hover:text-cyan-400">{portofolio.title}</div>
                                <div class="text-gray-400">{portofolio.description}</div>
                                <div class="group-hover:text-cyan-400">{portofolio.skills}</div>
                                <Button children="Github" href={portofolio.link} />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};
export default Portofolio;
