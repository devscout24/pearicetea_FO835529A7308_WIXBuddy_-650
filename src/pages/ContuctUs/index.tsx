import useSetting from "@/lib/useSetting";
import ContactUsForm from "./components/ContuctUsForm";


export default function ContactUs() {
    const {basicData} = useSetting(); 
    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Contact Us
            </h1>
            <div className="flex items-center justify-between gap-5">
                <div className="w-1/2">
                    <label className="text-lg font-semibold">Address</label>
                    <p className="text-sm font-normal">{basicData.address}</p>
                </div>
                <div className="w-1/2">
                    <label htmlFor="" className="text-lg font-semibold">Message</label>
                    <p className="text-sm font-normal">{basicData.email}</p>
                    <p className="text-sm font-normal">{basicData.phone_code} {basicData.phone_number}</p>
                </div>
            </div>
            <ContactUsForm />
        </section>
    )
}
