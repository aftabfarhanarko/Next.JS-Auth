"use client";

const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      contactNo: form.contactNo.value,
      password: form.password.value,
      image: form.image.value,
      bloodgroup: form.bloodgroup.value,
    };

    console.log("Submitted Data:", formData);
  };

  const inputClass =
    "p-2 rounded border-2 bg-white text-black focus:outline-green-300";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      {/* Name */}
      <div className="flex flex-col space-y-1">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your official name"
          required
          className={inputClass}
        />
      </div>

      {/* Email + Blood Group */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Blood Group</label>
          <select name="bloodgroup" required className={inputClass}>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>

      {/* Contact No + Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNo"
            placeholder="01XXXXXXXXX"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Image URL */}
      <div className="flex flex-col space-y-1">
        <label>Profile Image URL</label>
        <input
          type="url"
          name="image"
          placeholder="https://example.com/image.jpg"
          className={inputClass}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
