import React from 'react';
import { Col, Skeleton } from 'antd';

import './index.css';

export default function LoadingProduct(props) {
	return (
		<>
			<Col key={props.index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
				<Skeleton.Avatar active size='large' shape='square' />
				<Skeleton active style={{ marginBottom: '50px' }}></Skeleton>
			</Col>
			<Col key={props.index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
				<Skeleton.Avatar active size='large' shape='square' />
				<Skeleton active style={{ marginBottom: '50px' }}></Skeleton>
			</Col>
			<Col key={props.index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
				<Skeleton.Avatar active size='large' shape='square' />
				<Skeleton active style={{ marginBottom: '50px' }}></Skeleton>
			</Col>
			<Col key={props.index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
				<Skeleton.Avatar active size='large' shape='square' />
				<Skeleton active style={{ marginBottom: '50px' }}></Skeleton>
			</Col>
			<Col key={props.index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
				<Skeleton.Avatar active size='large' shape='square' />
				<Skeleton active style={{ marginBottom: '50px' }}></Skeleton>
			</Col>
			<Col key={props.index} xs={{ span: 12 }} md={{ span: 6 }} lg={{ span: 4 }}>
				<Skeleton.Avatar active size='large' shape='square' />
				<Skeleton active style={{ marginBottom: '50px' }}></Skeleton>
			</Col>
		</>
	);
}
