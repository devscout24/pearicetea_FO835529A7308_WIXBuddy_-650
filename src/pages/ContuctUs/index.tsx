import useSetting from "@/lib/useSetting";
import ContactUsForm from "./components/ContuctUsForm";


export default function ContactUs() {
    const {basicData} = useSetting(); 
    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Contact Us
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-5">
                <div className="w-full md:w-1/2 text-center">
                    <label className="text-lg font-semibold">Address</label>
                    <p className="text-sm font-normal">{basicData.address}</p>
                </div>
                <div className="w-full md:w-1/2 text-center">
                    <label htmlFor="" className="text-lg font-semibold">Message</label>
                    <p className="text-sm font-normal">{basicData.email}</p>
                    <p className="text-sm font-normal">{basicData.phone_code} {basicData.phone_number}</p>
                </div>
            </div>
            <ContactUsForm />
        </section>
    )
}
