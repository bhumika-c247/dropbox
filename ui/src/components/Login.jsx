import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import AppConfig from "../AppConfig";

export const Login = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const onFinish = async (values) => {
		try {
			const response = await axios.post(`${AppConfig.API_ENDPOINT}auth/login`, values);
			if (response?.data) {
				const { token, user } = response.data;
				setEmail(response.data.message);
				setPassword(response.data.message);
				navigate("/upload");
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));
				// setToken(token);
				// setUser(user)
				console.log("=-============>", response.data.token);
			}
		} catch (error) {
			console.log("==>", error.response.data.errors.email);
			console.log("==>", error.response.data.errors.password);
			setEmail(error.response.data.errors.email);
			setPassword(error.response.data.errors.password);
		}
		console.log("Received values of form: ", values);
	};

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/upload');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Form
        name='normal_login'
        className='login-form custom-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h5 className='login-head'>Login</h5>
        <Form.Item name='email' rules={[{ required: true, message: email }]}>
          <Input
            size='large'
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <p>{email}</p>
        <Form.Item
          name='password'
          rules={[{ required: true, message: password }]}
        >
          <Input
            size='large'
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <p>{password}</p>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <Link className="login-form-forgot" >
          Forgot password
        </Link> */}
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          {/* Or <Link >register now!</Link> */}
        </Form.Item>
      </Form>
    </>
  );
};
