import React, { useState } from "react";
import { useLeadStore } from "../store/useLeadStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
const LeadForm = () => {
  const { isAddingLead, addLead } = useLeadStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    city: "",
  });
  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Name Cannot be blank");
    if (!formData.email.trim()) return toast.error("Email Cannot be blank");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!formData.phone.trim()) return toast.error("Phone Cannot be blank");
    if (formData.message.trim().length < 20)
      return toast.error("Message must be of length 20 ");

    return true;
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      addLead(formData);
      setFormData({ name: "", email: "", phone: "", message: "", city: "" });
    }
  }

  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Get Free Design Consultation
        </h2>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="card bg-base-100 p-6 shadow space-y-4"
        >
          <input
            className="input input-bordered w-full"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <input
            className="input input-bordered w-full"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
          <input
            className="input input-bordered w-full"
            placeholder="City"
            value={formData.city}
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Message"
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
            }}
          />
          <button className="btn btn-primary w-full" disabled={isAddingLead}>
            {isAddingLead ? <Loader2 className="animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeadForm;
