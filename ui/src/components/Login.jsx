import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [token, setToken] = useState();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        values
      );
      const { token } = response.data;
      setEmail(response.data.message);
      setPassword(response.data.message);
      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);
      console.log("=-============>", response.data.token);
    } catch (error) {
      console.log("==>", error.response.data.errors.email);
      console.log("==>", error.response.data.errors.password);
      setEmail(error.response.data.errors.email);
      setPassword(error.response.data.errors.password);
    }
    console.log("Received values of form: ", values);
  };

  useEffect(() => {
    if (token) {
      navigate("/upload");
    } else {
      navigate("/");
    }
  }, [token, email, password]);

  return (
    <>
      <Form
        name="normal_login"
        className="login-form custom-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h5 className="login-head">Login</h5>
        <Form.Item name="email" rules={[{ required: true, message: email }]}>
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <p>{email}</p>
        <Form.Item
          name="password"
          rules={[{ required: true, message: password }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <p>{password}</p>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <Link className="login-form-forgot" >
          Forgot password
        </Link> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          {/* Or <Link >register now!</Link> */}
        </Form.Item>
      </Form>
    </>
  );
};
