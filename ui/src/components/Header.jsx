import React, { useEffect } from "react";
import logo from "../img/dropbox.png";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Fileload from "./Fileload";
import { useNavigate } from "react-router-dom";

const Header = () => {
	let navigate = useNavigate();
	const { Header, Content, Sider } = Layout;

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	useEffect(() => {
		let token = localStorage.get("token");
		if (!token) {
			navigate("/");
		}
	}, []);
	return (
		<>
			<Layout>
				<Header className='header'>
					<div className='logo d-flex justify-content-between align-items-center pt-2'>
						<img width='40' src={logo} alt='' />
						<Button onClick={localStorage.removeItem("token")}>Logout</Button>
					</div>
					<Menu />
				</Header>
				<Layout>
					<Sider width={200} style={{ background: colorBgContainer }}>
						<p className='side-link'>Upload Flies</p>
					</Sider>
					<Layout style={{ padding: "0 24px 24px" }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							{/* <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
						</Breadcrumb>
						<Content
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
								background: colorBgContainer,
							}}
						>
							<Fileload></Fileload>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
};

export default Header;
