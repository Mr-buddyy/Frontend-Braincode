import { Component, Show, onMount, createSignal } from "solid-js";
import { Timeline, Skill } from "./index";
import { logo } from "../assets/index";

interface EdukasiItem {
    id: string;
    title: string;
    major: string;
    periode: string;
    description: string;
    logo: string;
}
interface ExperienceItem {
    id: string;
    periode: string;
    title: string;
    division: string;
    description: string;
}
interface EdukasiItem {
    id: string;
    title: string;
    major: string;
    periode: string;
    description: string;
    logo: string;
}
function fetchData() {
    // State untuk menyimpan data edukasi
    const [edukasi, setEdukasi] = createSignal<EdukasiItem[]>([]);
    const [experience, setExperience] = createSignal<ExperienceItem[]>([]);

    onMount(async () => {
        try {
            // Lakukan permintaan GET ke URL edukasi
            const response = await fetch("http://127.0.0.1:8000/edukasi");

            // Periksa apakah permintaan sukses dan respon memiliki status 200 OK
            if (response.ok) {
                // Ambil data JSON dari respons
                const data: EdukasiItem[] = await response.json();

                // Update state edukasi dengan data yang diterima
                setEdukasi(data);
            } else {
                // Jika respons tidak berhasil, lemparkan kesalahan
                throw new Error("Failed to fetch edukasi data");
            }
        } catch (error) {
            console.error("Error fetching edukasi data:", error);
        }
    });

    onMount(async () => {
        try {
            // Lakukan permintaan GET ke URL edukasi
            const response = await fetch("http://127.0.0.1:8000/experience");

            // Periksa apakah permintaan sukses dan respon memiliki status 200 OK
            if (response.ok) {
                // Ambil data JSON dari respons
                const data: ExperienceItem[] = await response.json();

                // Update state edukasi dengan data yang diterima
                setExperience(data);
            } else {
                // Jika respons tidak berhasil, lemparkan kesalahan
                throw new Error("Failed to fetch edukasi data");
            }
        } catch (error) {
            console.error("Error fetching edukasi data:", error);
        }
    });

    return { edukasi, experience };
}
const about: Component = () => {
    const { edukasi, experience } = fetchData();
    return (
        <Show when={edukasi} fallback={<p>Loading...</p>}>
            {/* about */}
            <div class="px-20 text-center flex flex-col gap-10 items-center">
                <div class="text-5xl font-bold">About Me</div>
                <div class="bg-gradient-to-tr from-violet-700 to-blue-600 h-2 w-20 rounded-full"></div>
                <div class="text-lg max-w-2xl">Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology</div>
            </div>
            {/* education */}
            <section class="py-10 sm:py-16 lg:py-20">
                <div class=" text-center">
                    {" "}
                    <div class="text-4xl font-bold mb-10">Education</div>
                </div>
                {edukasi().map((education) => (
                    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div class="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
                            <div>
                                <img class="w-full max-w-xs mx-auto" src={logo} alt="" />
                            </div>
                            <div class="text-center lg:text-left">
                                <h2 class="text-3xl font-bold leading-tight  sm:text-4xl lg:text-5xl">{education.title}</h2>
                                <p class="mt-6 text-lg font-bold leading-tight  sm:text-xl lg:text-2xl">{education.major}</p>
                                <p class=" text-base">{education.periode}</p>
                                <p class="mt-6 text-base text-gray-600">{education.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            {/* end education */}
            {/* skill */}
            <section class="py-10 sm:py-16 lg:py-20 text-center">
                {" "}
                <div class="text-4xl font-bold mb-10">Skills</div>
                <Skill />
            </section>
            {/* end skill */}
            {/* experience */}
            <section class="py-10 sm:py-16 lg:py-20">
                {" "}
                <div class="text-4xl font-bold text-center mb-10">Experience</div>
                {experience().map((experience, index) => (
                    <Timeline
                        hr={true}
                        timelinetype={index % 2 === 0 ? "timeline-start md:text-end mb-10" : "timeline-end"}
                        timelinedate={experience.periode}
                        timelinecompany={experience.title}
                        timelineposition={experience.division}
                        timelinedesc={experience.description}
                    />
                ))}
            </section>
            {/* end experience */}
            {/* end about */}
        </Show>
    );
};

export default about;
