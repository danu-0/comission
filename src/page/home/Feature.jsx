import { useNavigate } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";

function Feature() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/generate-invoice");
    };

    return (
        <section className="relative w-full h-auto px-4 py-20  overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 text-custom-secondary text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-2">
                    <FaFileInvoiceDollar className="text-yellow-700 drop-shadow-md" />
                    Generate Invoice
                </h1>
                <p className="text-lg text-custom-secondary max-w-xl mx-auto">
                    Create a detailed payment invoice for your commission clients with ease and style.
                </p>

                <div className="flex justify-center mt-10">
                    <div className="backdrop-blur-md bg-custom-secondary p-8 rounded-xl border max-w-md w-full space-y-4">
                        <h2 className="text-xl font-semibold text-white">Commission Invoice Generator</h2>
                        <p className="text-white text-sm">
                            Quickly export your invoice as PDF or image. Fill the form, preview, and send it to your client.
                        </p>
                        <button
                            onClick={handleNavigate}
                            className="mt-6 w-auto bg-white hover:bg-yellow-700 hover:text-white text-custom-secondary font-semibold p-4 rounded-xl transition duration-300 shadow-lg"
                        >
                            Launch Generate Page
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feature;
