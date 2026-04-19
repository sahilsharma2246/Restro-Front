import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(name, email, password);

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-sm text-center text-base-content/70 mb-4">
            Register once, then log in as a user.
            Admin role is managed from backend.
          </p>

          {error && (
            <div className="alert alert-error text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success text-sm">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Full Name
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                autoComplete="name"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                autoComplete="email"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Password
                </span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full ${
                loading ? "loading" : ""
              }`}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;