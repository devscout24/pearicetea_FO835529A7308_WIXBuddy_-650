import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxiosCommon from "@/hooks/useAxiousCommon";
import toast from "react-hot-toast";


export const useFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50, { message: "Name must be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone must be at least 10 digits" }).regex(/^[+]?[1-9]?[\d\-\s()]*$/, { message: "Invalid phone number format" }),
    subject: z.string().min(3, { message: "Subject must be at least 3 characters" }).max(100, { message: "Subject must be less than 100 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(1000, { message: "Description must be less than 1000 characters" }),
});

export type ContactUsValues = z.infer<typeof useFormSchema>;

export default function useContactUsForm() {
    const axiosCommon = useAxiosCommon();

    const form = useForm<ContactUsValues>({
        resolver: zodResolver(useFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            description: "",
        },
    });

    const handleSubmit = async (data: ContactUsValues) => {
        event?.preventDefault(); // Prevent default form submission if needed
        
        try {
            // Submit the form data to your API
            await axiosCommon.post('/contact/store', data);

            // Reset form after successful submission
            toast.success('Thanks for contacting us!');
            form.reset();
            
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Failed to send message. Please try again.");
            // Handle error (you might want to show a toast or error message)
            // toast.error("Failed to send message. Please try again.");
        }
    }

    return { 
        form, 
        onSubmit: form.handleSubmit(handleSubmit),
        isSubmitting: form.formState.isSubmitting 
    };

}