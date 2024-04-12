import { Component, Show, onMount, createSignal } from "solid-js";

interface SkillItem {
    id: string;
    skills: string;
}
function fetchData() {
    // State untuk menyimpan data edukasi

    const [skill, setSkill] = createSignal<SkillItem[]>([]);

    onMount(async () => {
        try {
            // Lakukan permintaan GET ke URL edukasi
            const response = await fetch("http://127.0.0.1:8000/skill");

            // Periksa apakah permintaan sukses dan respon memiliki status 200 OK
            if (response.ok) {
                // Ambil data JSON dari respons
                const data: SkillItem[] = await response.json();

                // Update state edukasi dengan data yang diterima
                setSkill(data);
            } else {
                // Jika respons tidak berhasil, lemparkan kesalahan
                throw new Error("Failed to fetch edukasi data");
            }
        } catch (error) {
            console.error("Error fetching edukasi data:", error);
        }
    });

    return { skill };
}
const Button: Component = () => {
    const { skill } = fetchData();
    return (
        <div>
            <div class="tooltip">
                <div class="flex flex-row flex-wrap justify-center gap-4 mx-40 ">
                    {skill().map((skill) => (
                        <button class="btn">{skill.skills}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Button;
