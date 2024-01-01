import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: () => {},
  });

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <label>username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
          ></input>
          <label>password</label>
          <input
            id="password"
            name="password"
            type="text"
            value={formik.values.password}
            onChange={formik.handleChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};
export default Login;
