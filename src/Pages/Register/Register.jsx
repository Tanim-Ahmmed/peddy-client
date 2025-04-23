import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { MdPets } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';

function Register() {
  const { createUser, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const { email, password, name } = formData;
      await createUser(email, password);


      await updateUser({ data: { full_name: name } });

      navigate('/');
    } catch (err) {
      console.error(err.message);
      setError(err.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-primary text-3xl font-bold flex justify-center gap-3">
            <MdPets className="text-indigo-600" /> Paddy
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-dark">Create an account</h2>
          <p className="mt-2 text-gray-600">Join our pet-loving community</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <InputField
            id="name"
            icon={<FiUser />}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            label="Full Name"
          />
          <InputField
            id="email"
            icon={<FiMail />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            label="Email address"
          />
          <InputField
            id="password"
            icon={<FiLock />}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            label="Password"
          />
          <InputField
            id="confirmPassword"
            icon={<FiLock />}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            label="Confirm Password"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prbg-primary"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({ id, icon, type, name, value, onChange, placeholder, label }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default Register;
