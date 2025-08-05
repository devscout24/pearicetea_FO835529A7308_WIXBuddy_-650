import ContactUsForm from "./components/ContuctUsForm";


export default function ContactUs() {
    return (
        <section className="py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-semibold text-title02 text-center md:text-left mb-7">
                Contact Us
            </h1>
            <div className="flex items-center justify-between gap-5">
                <div className="w-1/2">
                    <label className="text-lg font-semibold">Address</label>
                    <p className="text-sm font-normal">131 Continental Drive, Suite 305Newark, DE 19713</p>
                </div>
                <div className="w-1/2">
                    <label htmlFor="" className="text-lg font-semibold">Message</label>
                    <p className="text-sm font-normal">info@onbengineering.com</p>
                    <p className="text-sm font-normal">(412) 294-6009</p>
                </div>
            </div>
            <ContactUsForm />
        </section>
    )
}
