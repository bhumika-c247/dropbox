import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
	let navigate = useNavigate();
	const [user, setUser] = useState();

	const onFinish = async (values) => {
		console.log("values-----------", values);

		try {
			const response = await axios.post(
				"http://localhost:3002/api/auth/login",
				values
			);
			console.log("res------------------------", response);
			if (response?.data) {
				setUser(response.data);
				localStorage.setItem("token", response.data.token);
				navigate("/upload");
			} else {
				alert();
			}
		} catch (error) {
			alert("Something went wrong");
		}
		// console.log("Received values of form: ", values);
	};

	return (
		<>
			<Form
				name='normal_login'
				className='login-form custom-form'
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<h5 className='login-head'>Login</h5>
				<Form.Item
					name='username'
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input
						size='large'
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						size='large'
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
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
