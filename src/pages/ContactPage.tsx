
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  subject: z.string().min(2, { message: 'Subject must be at least 2 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    
    // Reset the form
    form.reset();
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass p-6 rounded-lg text-center">
            <Mail className="h-10 w-10 text-purple-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-300">support@purpleglass.com</p>
            <p className="text-gray-300">sales@purpleglass.com</p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center">
            <Phone className="h-10 w-10 text-purple-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
            <p className="text-gray-300">+1 (555) 123-4567</p>
            <p className="text-gray-300">Mon-Fri: 9am - 5pm EST</p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center">
            <MapPin className="h-10 w-10 text-purple-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
            <p className="text-gray-300">123 Tech Avenue</p>
            <p className="text-gray-300">San Francisco, CA 94107</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          className="glass-input text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Your Email" 
                          className="glass-input text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Message Subject" 
                          className="glass-input text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your Message" 
                          className="glass-input text-white min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-orange hover:bg-orange-dark text-white" 
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="glass p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What is your shipping policy?</h3>
                <p className="text-gray-300">
                  We offer free standard shipping on all orders over $100. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How do I return a product?</h3>
                <p className="text-gray-300">
                  If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. Products must be in their original packaging and in new condition.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Do you offer international shipping?</h3>
                <p className="text-gray-300">
                  Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import duties may apply.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">How can I track my order?</h3>
                <p className="text-gray-300">
                  Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
