import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input";
import useContactUsForm from '../hooks/use-contuce-us';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone,} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { icons } from '@/lib/imageProvider';

export default function ContactUsForm() {
    // Use the hook without any parameters - it handles submission internally
    const { form, onSubmit, isSubmitting } = useContactUsForm();

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={onSubmit}
                    className="space-y-6 rounded-md bg-white py-8"
                >
                    <div>
                        <div className="w-full space-y-6">
                            {/* name field */}
                            <div className="flex flex-col gap-4 md:flex-row">
                                {/* First Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="text-lg font-normal">

                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="name..."
                                                        {...field}
                                                        className="custom-focus"
                                                    />
                                                    <User strokeWidth={1.75} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 size-5' />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Last Name */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="text-lg font-normal">

                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="email..."
                                                        {...field}
                                                        className="custom-focus pr-10"
                                                    />
                                                    <Mail strokeWidth={1.75} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 size-5' />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex items-center gap-4'>
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Subject..."
                                                        {...field}
                                                        className="custom-focus pr-10"
                                                    />
                                                    <img src={icons.physics} alt="" className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5'  />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* phone number */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder='phone number...'
                                                        {...field}
                                                        className="custom-focus pr-10"
                                                    />
                                                    <Phone strokeWidth={1.75} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 size-5' />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* Business Name */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="w-full mt-6">
                                    <FormControl>
                                        <div className="relative">
                                            <Textarea
                                                placeholder='tell us a few words...'
                                                {...field}
                                                className="pl-10"
                                            />
                                            <img src={icons.pen} alt="" className='absolute left-3 top-2.5 text-gray-400 size-5'/>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    {/* Buttons */}
                    <div className="mt-10 flex justify-center gap-3 md:justify-end">
                        <Button
                            variant={"default"}
                            // type="submit"
                            disabled={isSubmitting}
                            className="border-button-border border px-14 py-5 text-lg font-normal shadow-2xl cursor-pointer"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
