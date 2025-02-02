import { createSignal, type Component, createEffect, onCleanup } from "solid-js";

const Navbar: Component = () => {
    const [theme, setDarkTheme] = createSignal(getInitialTheme());
    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
    };
    createEffect(() => {
        const htmlElement = document.querySelector("html");
        if (htmlElement) {
            htmlElement.setAttribute("data-theme", theme() ? "dark" : "light"); // Convert boolean to string

            // Cleanup function to remove the attribute when the component unmounts
            onCleanup(() => {
                htmlElement.removeAttribute("data-theme");
            });
        }
        localStorage.setItem("theme", theme() ? "dark" : "light");
    });
    function getInitialTheme() {
        // Get theme from localStorage or default to light theme
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark";
    }

    return (
        <>
            <div class="navbar bg-base-100 fixed z-50">
                <div class="navbar-start">
                    <div class="dropdown">
                        <div tabIndex={0} role="button" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </svg>
                        </div>
                        <ul tabIndex={0} class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about">About</a>
                            </li>
                            <li>
                                <a href="/portofolio">Portofolio</a>
                            </li>
                            <li>
                                <a href="/contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <a class="btn btn-ghost text-xl">Singgih Budi Hartono</a>
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal px-1">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About</a>
                        </li>
                        <li>
                            <a href="/portofolio">Portofolio</a>
                        </li>
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="navbar-end">
                    <label class="cursor-pointer grid place-items-center">
                        <input type="checkbox" value="synthwave" class="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" checked={theme()} onChange={toggleTheme} />
                        <svg
                            class="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <svg
                            class="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>
                </div>
            </div>{" "}
        </>
    );
};
export default Navbar;
