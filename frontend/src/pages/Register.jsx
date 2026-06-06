import { useForm }
from "react-hook-form";

import api
from "../api/axios";

export default function Register() {

  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit =
  async data => {

    await api.post(
      "/auth/register",
      data
    );

    alert(
      "Registration Successful"
    );
  };

  return (

    <form
      onSubmit=
      {handleSubmit(onSubmit)}
    >

      <input
        placeholder="Name"
        {...register("name")}
      />

      <input
        placeholder="Email"
        {...register("email")}
      />

      <input
        type="password"
        {...register("password")}
      />

      <select
        {...register("role")}
      >

        <option value="USER">
          User
        </option>

        <option value="STORE_OWNER">
          Store Owner
        </option>

      </select>

      <button>
        Register
      </button>

    </form>
  );
}