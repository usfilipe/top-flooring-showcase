
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: QuoteRequest = await req.json();

    console.log("Sending quote request email for:", name);

    // Send email to business owner
    const emailResponse = await resend.emails.send({
      from: 'Top Flooring Services <no-reply@topflooringservices.com>',
      to: ["usfilipe@gmail.com"],
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message provided'}</p>
        
        <hr>
        <p><em>This quote request was submitted through your website contact form.</em></p>
      `,
    });

    console.log("Quote request email sent successfully:", emailResponse);

    // Send confirmation email to customer
    const confirmationResponse = await resend.emails.send({
      from: "Top Flooring Services <no-reply@topflooringservices.com>",
      to: [email],
      subject: "Quote Request Received - We'll Contact You Soon!",
      html: `
        <h2>Thank you for your quote request, ${name}!</h2>
        <p>We have received your flooring quote request and will contact you within 24 hours to schedule your free consultation.</p>
        
        <h3>Your Request Details:</h3>
        <p><strong>Service:</strong> ${service || 'General consultation'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${message ? `<p><strong>Additional Details:</strong> ${message}</p>` : ''}
        
        <p>If you have any urgent questions, please call us at (689) 255-7378.</p>
        
        <p>Best regards,<br>
        Top Flooring Services Team</p>
      `,
    });

    console.log("Confirmation email sent successfully:", confirmationResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request sent successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-request function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
