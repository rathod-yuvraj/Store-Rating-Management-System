import {
  useForm
} from "react-hook-form";

import api from "../api/axios";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

export default function Login() {

  const {
    register,
    handleSubmit
  } = useForm();

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const onSubmit =
  async data => {

    try {

      const res =
        await api.post(
          "/auth/login",
          data
        );

      login(res.data);

      const role =
        res.data.user.role;

      if (
        role === "ADMIN"
      ) {
        navigate(
          "/admin"
        );
      }
      else if (
        role ===
        "STORE_OWNER"
      ) {
        navigate(
          "/owner"
        );
      }
      else {
        navigate(
          "/stores"
        );
      }

    } catch (err) {

      alert(
        err.response.data.message
      );

    }
  };

  return (

    <form
      onSubmit=
      {handleSubmit(onSubmit)}
    >

      <input
        placeholder="Email"
        {...register("email")}
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <button>
        Login
      </button>

    </form>
  );
}