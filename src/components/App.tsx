import React from 'react';
import styled from 'styled-components'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	
} from "react-router-dom";
import 'antd/dist/antd.css';
import { ConfigProvider, Layout } from 'antd';
import Home from './Home';
import List from './List';
import 'moment/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';

const { Header, Content,  } = Layout;

const Logo = styled.div`
font-weight: bold;
font-size: x-large;
color: white;
float: left;
width: 120px;
height: 31px;
margin: 16px 24px 16px 0;
justify-content: center;
align-items: center;
display: flex;
font-family: 'Montserrat Alternates', sans-serif;
`;


function App() {
	return (
		<ConfigProvider locale={locale}>
			<Router>
				<Layout className="layout" style={{ height: "100%" }}>
					<Header>
						<Link to="/"><Logo>Listaria</Logo></Link>

					</Header>
					<Content>
						<Switch>
							<Route path="/:id" children={<List />} />
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</Content>
				</Layout>
			</Router>
		</ConfigProvider>
	);
}

export default App;
