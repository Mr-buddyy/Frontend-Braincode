import { Component, createEffect, Show, onMount, createSignal } from "solid-js";

interface ContactItem {
    id: string;
    location: string;
    phone_number: string;
    email: string;
}

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

function fetchData() {
    // State untuk menyimpan data edukasi
    const [contact, setContact] = createSignal<ContactItem[]>([]);

    onMount(async () => {
        try {
            // Lakukan permintaan GET ke URL edukasi
            const response = await fetch("http://127.0.0.1:8000/contact");

            // Periksa apakah permintaan sukses dan respon memiliki status 200 OK
            if (response.ok) {
                // Ambil data JSON dari respons
                const data: ContactItem[] = await response.json();

                // Update state edukasi dengan data yang diterima
                setContact(data);
                console.log("fetch berhasil", data);
            } else {
                // Jika respons tidak berhasil, lemparkan kesalahan
                throw new Error("Failed to fetch edukasi data");
            }
        } catch (error) {
            console.error("Error fetching edukasi data:", error);
        }
    });
    return { contact };
}

const contact: Component = () => {
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
    const { contact } = fetchData();
    return (
        <Show when={contact} fallback={<p>Loading...</p>}>
            <section class="px-20 text-center flex flex-col gap-10 items-center w-full">
                {" "}
                <div class="text-5xl font-bold">Contact</div>
                <div class="bg-gradient-to-tr from-violet-700 to-blue-600  h-2 w-20 rounded-full"></div>
                <div class="text-lg max-w-2xl">Ready to start a conversation? Reach out to me below.</div>
                {/* contact */}
                {contact().map((contact) => (
                    <div class="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10 mx-20">
                        <div class="card shadow-2xl">
                            <div class="card-body items-center text-center">
                                <div class="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                                        />
                                    </svg>
                                </div>
                                <p>{contact.phone_number}</p>
                            </div>
                        </div>
                        <div class="card shadow-2xl">
                            <div class="card-body items-center text-center">
                                <div class="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                                        <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
                                    </svg>
                                </div>
                                <p>{contact.email}</p>
                            </div>
                        </div>
                        <div class="card shadow-2xl">
                            <div class="card-body items-center text-center">
                                <div class="card-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                                        <path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" />
                                    </svg>
                                </div>
                                <p>{contact.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* alert */}
                <div class=" text-center">
                    {" "}
                    <div class="text-4xl font-bold mb-10">Message Me</div>
                </div>
                <div role="alert" class="alert alert-success hidden lg:w-1/2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pesan Berhasil Dikirim!</span>
                    <button class="close btn-sm btn-primary" onClick={closeModal}>
                        close
                    </button>
                </div>
                {/* form */}
                <div class="flex flex-col drop-shadow-md shadow-2xl p-10 gap-4 lg:w-1/2 rounded">
                    {" "}
                    <form ref={setForm} id="Contact-From">
                        <label class="flex flex-col">
                            <div class="label">
                                <span class="label-text">Name</span>
                            </div>
                            <input type="text" class="grow input input-bordered " placeholder="Enter Your Name" name="nama" />
                        </label>
                        <label class="flex flex-col">
                            <div class="label">
                                <span class="label-text">Email</span>
                            </div>
                            <input type="email" class="grow input input-bordered " placeholder="Email" name="email" />
                        </label>
                        <label class="flex flex-col">
                            <div class="label">
                                <span class="label-text">Message</span>
                            </div>
                            <textarea class="textarea textarea-bordered h-24" placeholder="message" name="pesan"></textarea>
                        </label>
                        <button type="submit" class="btn send mt-10">
                            submit
                        </button>
                        <button class="btn loading hidden">
                            <span class="loading loading-spinner loading-xs"></span>
                        </button>
                    </form>
                </div>
            </section>{" "}
        </Show>
    );
};

export default contact;
