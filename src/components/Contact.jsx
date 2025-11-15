import React from "react";
export default function Contact() {
return (
<section id="contact" className="mt-16 grid gap-8 items-start">
<div className="bg-white p-6 rounded-xl shadow-sm">
<h3 className="text-2xl font-semibold">Contact</h3>
<p className="mt-3 text-gray-600">Want to work together? Drop me an email or message on LinkedIn.</p>
<div className="mt-6">
<p><strong>Email:</strong> <a href="mailto:nirupamchakraborty04@gmail.com" className="underline">nirupamchakraborty04@gmail.com</a></p>
<p className="mt-2"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/nirupam-chakraborty-01a55b254/" target="_blank" rel="noreferrer" className="underline">Nirupam Chakraborty</a></p>
<p className="mt-2"><strong>Location:</strong> Digboi, India</p>
</div>
</div>


{/* 
<br />
<div>
<form className="bg-white p-6 rounded-xl shadow-sm" action={"mailto:nirupamforwhatsapp@gmail.com"}>
<h4 className="font-semibold">Send a message</h4>
<div className="mt-4">
<label className="text-sm">Name</label>
<input className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="Your name" />
</div>
<div className="mt-3">
<label className="text-sm">Email</label>
<input className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="Your email" />
</div>
<div className="mt-3">
<label className="text-sm">Message</label>
<textarea className="w-full mt-1 px-3 py-2 border rounded-md" rows="4" placeholder="How can I help?"></textarea>
</div>
<div className="mt-4">
<button type="button" className="px-4 py-2 rounded-md bg-yellow-300">Send message</button>
</div>
</form> */}
{/* </div> */}
</section>
);
}