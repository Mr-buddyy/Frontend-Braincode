import { Navbar, Footer, Portofolio } from "../../components/index";

const Portfolio = () => {
    return (
        <div>
            <Navbar />
            <section class="px-20 py-20 flex flex-col gap-10 w-full items-center">
                <Portofolio />
            </section>{" "}
            <Footer />
        </div>
    );
};

export default Portfolio;
